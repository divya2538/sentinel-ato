class TransactionService:
    def __init__(self):
        # Maps user_id to transaction history stats
        self._user_stats = {
            "usr_normal": {
                "average_amount": 50.00,
                "max_historical_amount": 150.00
            },
            "usr_compromised": {
                "average_amount": 120.00,
                "max_historical_amount": 400.00
            },
            "usr_sanctioned": {
                "average_amount": 250.00,
                "max_historical_amount": 800.00
            }
        }

    def analyze_transaction(self, user_id: str, amount: float) -> dict:
        """Analyzes a transaction amount against the user's historical transactions."""
        stats = self._user_stats.get(user_id, {
            "average_amount": 50.00,
            "max_historical_amount": 100.00
        })
        
        avg = stats["average_amount"]
        max_val = stats["max_historical_amount"]
        
        deviation_ratio = amount / avg if avg > 0 else 1.0
        
        is_suspicious = False
        risk_score = 0
        
        if amount > max_val * 3:
            is_suspicious = True
            risk_score = 90
        elif amount > max_val:
            is_suspicious = True
            risk_score = 50
        elif deviation_ratio > 2.0:
            is_suspicious = True
            risk_score = 30
            
        return {
            "amount": amount,
            "average_amount": avg,
            "max_historical_amount": max_val,
            "deviation_ratio": round(deviation_ratio, 2),
            "is_suspicious": is_suspicious,
            "risk_score": risk_score
        }
