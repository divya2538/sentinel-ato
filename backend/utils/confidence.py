def calculate_confidence(num_events: int, checks_performed: list) -> int:
    """Calculates a confidence score (0-100) based on how much data/checks were run."""
    confidence = 60  # baseline
    
    # Increase confidence based on metadata verified
    if "ip_check" in checks_performed:
        confidence += 15
    if "device_check" in checks_performed:
        confidence += 15
    if "transaction_check" in checks_performed:
        confidence += 10
        
    # Penalty for short history
    if num_events == 0:
        confidence = 0
    elif num_events < 3:
        confidence -= 20
        
    return min(100, max(0, confidence))

def determine_risk_level(risk_score: float) -> str:
    """Classifies numerical risk score into descriptive risk categories."""
    if risk_score <= 15:
        return "NONE"
    elif risk_score <= 45:
        return "LOW"
    elif risk_score <= 75:
        return "MEDIUM"
    elif risk_score <= 88:
        return "HIGH"
    else:
        return "CRITICAL"
