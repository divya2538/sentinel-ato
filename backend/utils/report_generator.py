from datetime import datetime
import uuid

def generate_report(user_id: str, risk_score: float, risk_level: str, confidence_score: int, findings: dict, narrative: str) -> dict:
    """Aggregates all components into a formal ATO investigation report."""
    return {
        "report_id": f"rep_{uuid.uuid4().hex[:12]}",
        "generated_at": datetime.utcnow().isoformat() + "Z",
        "user_id": user_id,
        "summary": {
            "risk_score": risk_score,
            "risk_level": risk_level,
            "confidence_score": confidence_score,
            "verdict": "FLAGGED_FOR_REVIEW" if risk_score >= 50 else "APPROVED"
        },
        "findings": findings,
        "narrative": narrative
    }
