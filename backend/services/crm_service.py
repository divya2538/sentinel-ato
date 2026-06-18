class CRMService:
    def __init__(self):
        # Mock CRM database
        self._db = {
            "usr_normal": {
                "user_id": "usr_normal",
                "name": "Bob Vance",
                "email": "bob@vancerefrigeration.com",
                "registered_date": "2024-01-15T08:00:00Z",
                "mfa_enabled": True,
                "mfa_method": "totp",
                "average_transaction_amount": 50.00,
                "risk_tier": "LOW"
            },
            "usr_compromised": {
                "user_id": "usr_compromised",
                "name": "Alice Green",
                "email": "alice@example.com",
                "registered_date": "2023-11-20T14:30:00Z",
                "mfa_enabled": True,
                "mfa_method": "sms",
                "average_transaction_amount": 120.00,
                "risk_tier": "LOW"
            },
            "usr_sanctioned": {
                "user_id": "usr_sanctioned",
                "name": "Rahim Khan",
                "email": "rahim@sanctionedmail.net",
                "registered_date": "2025-05-10T12:00:00Z",
                "mfa_enabled": True,
                "mfa_method": "sms",
                "average_transaction_amount": 250.00,
                "risk_tier": "HIGH"
            }
        }

    def get_user_profile(self, user_id: str) -> dict:
        """Fetch CRM profile for a given user ID."""
        return self._db.get(user_id, {
            "user_id": user_id,
            "name": "Unknown User",
            "email": "unknown@example.com",
            "registered_date": "2026-01-01T00:00:00Z",
            "mfa_enabled": False,
            "mfa_method": None,
            "average_transaction_amount": 0.0,
            "risk_tier": "MEDIUM"
        })
