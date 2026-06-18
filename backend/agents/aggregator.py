import os
import json
from agents.pattern_agent import PatternAgent
from agents.similarity_agent import SimilarityAgent
from agents.compliance_agent import ComplianceAgent
from agents.narrative_agent import NarrativeAgent
from utils.confidence import calculate_confidence, determine_risk_level
from utils.report_generator import generate_report

class ATOAggregator:
    def __init__(self):
        self.pattern_agent = PatternAgent()
        self.similarity_agent = SimilarityAgent()
        self.compliance_agent = ComplianceAgent()
        self.narrative_agent = NarrativeAgent()
        
        # Resolve logs path dynamically
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        self.logs_path = os.path.join(base_dir, "data", "audit_logs.json")

    def _load_audit_logs(self) -> list:
        if not os.path.exists(self.logs_path):
            return []
        try:
            with open(self.logs_path, "r") as f:
                content = f.read()
                if not content:
                    return []
                return json.loads(content)
        except Exception:
            return []

    def evaluate_session(self, user_id: str, audit_logs: list = None) -> dict:
        """Runs the entire ATO analysis pipeline and returns the final report."""
        if audit_logs is None:
            audit_logs = self._load_audit_logs()
            
        user_logs = [log for log in audit_logs if log.get("user_id") == user_id]
        
        # 1. Run Pattern Analysis
        pattern_findings = self.pattern_agent.analyze(user_id, audit_logs)
        
        # 2. Run Similarity Analysis using indicators flagged by Pattern Agent
        indicators = pattern_findings.get("indicators", [])
        similarity_findings = self.similarity_agent.analyze(indicators)
        
        # 3. Run Compliance Audit
        compliance_findings = self.compliance_agent.analyze(user_id, audit_logs)
        
        # 4. Synthesize Combined Risk Score
        pattern_risk = pattern_findings.get("risk_score", 0.0)
        similarity_risk = similarity_findings.get("risk_score", 0.0)
        compliance_risk = compliance_findings.get("risk_score", 0.0)
        
        # Use max score to avoid Diluting critical individual indicators (e.g. OFAC violation)
        aggregated_risk = max(pattern_risk, similarity_risk, compliance_risk)
        
        # 5. Compute Confidence Score
        checks = pattern_findings.get("checks_performed", [])
        if compliance_findings.get("policy_status") == "NON_COMPLIANT":
            checks.append("compliance_audit")
            
        confidence_score = calculate_confidence(len(user_logs), checks)
        risk_level = determine_risk_level(aggregated_risk)
        
        # 6. Generate Narrative Summary
        narrative = self.narrative_agent.generate_narrative(
            user_id, 
            aggregated_risk,
            pattern_findings, 
            similarity_findings, 
            compliance_findings
        )
        
        # 7. Package findings and compile the report
        findings = {
            "pattern_analysis": {
                "risk_score": pattern_findings.get("risk_score"),
                "indicators": pattern_findings.get("indicators"),
                "evidence": pattern_findings.get("evidence")
            },
            "similarity_analysis": {
                "risk_score": similarity_findings.get("risk_score"),
                "top_match": similarity_findings.get("top_match"),
                "matches": similarity_findings.get("matches")
            },
            "compliance_analysis": {
                "risk_score": compliance_findings.get("risk_score"),
                "violations": compliance_findings.get("violations"),
                "policy_status": compliance_findings.get("policy_status")
            }
        }
        
        report = generate_report(
            user_id=user_id,
            risk_score=aggregated_risk,
            risk_level=risk_level,
            confidence_score=confidence_score,
            findings=findings,
            narrative=narrative
        )
        
        return report
