class NarrativeAgent:
    def __init__(self):
        pass

    def generate_narrative(self, user_id: str, risk_score: float, pattern_findings: dict, similarity_findings: dict, compliance_findings: dict) -> str:
        """Generates a detailed, human-readable markdown report summarizing the ATO analysis."""
        
        # 1. Title and Verdict Header
        if risk_score >= 80:
            header = f"# 🚨 CRITICAL ALERT: Suspicious Account Takeover (ATO) Detected for User `{user_id}`\n\n"
            verdict = "**VERDICT: HIGH RESOLUTION ATO ALERT — IMMEDIATE INTERVENTION RECOMMENDED**\n\n"
        elif risk_score >= 50:
            header = f"# ⚠️ WARNING: Elevated Risk Patterns Detected for User `{user_id}`\n\n"
            verdict = "**VERDICT: POTENTIAL COMPROMISE — REQUEST ANALYST AUDIT**\n\n"
        else:
            header = f"# ✅ PASS: Standard Security Profile for User `{user_id}`\n\n"
            verdict = "**VERDICT: NORMAL USER BEHAVIOR — NO ACTION REQUIRED**\n\n"

        # 2. Executive Summary
        exec_summary = "### 📋 Executive Summary\n"
        if risk_score >= 50:
            exec_summary += (
                f"Sentinel's behavioral engine detected a sequence of events characteristic of an Account Takeover (ATO). "
                f"The analysis calculated a pattern risk score of **{risk_score}/100** based on the matched indicator list: "
                f"`{', '.join(pattern_findings.get('indicators', []))}`.\n\n"
            )
        else:
            exec_summary += "Activity matches standard transactional and access profiles. No credential abuse or configuration hijacking detected.\n\n"

        # 3. Chronological Evidence Timeline
        timeline = "### 🔍 Investigation Timeline & Evidence\n"
        evidence_list = pattern_findings.get("evidence", [])
        if evidence_list:
            for ev in evidence_list:
                timeline += f"- {ev}\n"
            timeline += "\n"
        else:
            timeline += "_No suspicious behavioral evidence detected in current logs._\n\n"

        # 4. Historical Threat Similarity
        similarity = "### 📂 Threat Library Matching\n"
        top_match = similarity_findings.get("top_match")
        if top_match and top_match.get("similarity_score", 0.0) > 0.3:
            similarity += (
                f"The current attack profile matches historical ATO pattern **{top_match.get('pattern_name')}** "
                f"(ID: `{top_match.get('case_id')}`) with a **{int(top_match.get('similarity_score') * 100)}% Jaccard Similarity**.\n"
                f"**Pattern Description**: {top_match.get('description')}\n\n"
            )
        else:
            similarity += "_No close matches found in the historical threat library._\n\n"

        # 5. Regulatory Compliance and Violations
        compliance = "### ⚖️ Policy & Compliance Audit\n"
        violations = compliance_findings.get("violations", [])
        if violations:
            compliance += f"**Compliance Verdict**: Non-Compliant. Detected {len(violations)} policy breach(es):\n"
            for v in violations:
                compliance += f"- **{v.get('policy_name')}** (`{v.get('violation_type')}`): {v.get('description')} (Severity: **{v.get('severity')}**)\n"
            compliance += "\n"
        else:
            compliance += "_All events adhere to security, OFAC sanctions, and KYC transaction policies._\n\n"

        # 6. Actionable Security Recommendations
        recommendations = "### 🛠️ Recommended Action Playbook\n"
        if risk_score >= 80:
            recommendations += (
                "1. **Account Lock**: Trigger temporary account freeze to restrict outgoing transfers and settings updates.\n"
                "2. **Session Revocation**: Invalidate all active OAuth and session tokens across device profiles.\n"
                "3. **Out-of-Band MFA reset**: Contact the customer via registered billing phone number/secondary email to initiate credential verification.\n"
                "4. **Re-KYC Verification**: Request verification documents upload at next login attempt.\n"
            )
        elif risk_score >= 50:
            recommendations += (
                "1. **MFA Enforcement**: Force standard MFA re-verification on next transaction.\n"
                "2. **Log Monitoring**: Flag account for close telemetry observation for the next 48 hours.\n"
                "3. **Contact Verification**: Send standard system security alert warning of unrecognized device login.\n"
            )
        else:
            recommendations += "1. **No actions needed**: Continue regular profile baseline tracking.\n"

        # Combine report
        return f"{header}{verdict}{exec_summary}{timeline}{similarity}{compliance}{recommendations}"
