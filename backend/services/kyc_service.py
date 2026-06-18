class KYCService:
    def __init__(self):
        # Mock KYC status database
        self._db = {
            "usr_normal": {
                "user_id": "usr_normal",
                "status": "VERIFIED",
                "last_updated_at": "2024-01-16T10:00:00Z",
                "risk_flag": False
            },
            "usr_compromised": {
                "user_id": "usr_compromised",
                "status": "VERIFIED",
                "last_updated_at": "2023-11-21T09:30:00Z",
                "risk_flag": False
            },
            "usr_sanctioned": {
                "user_id": "usr_sanctioned",
                "status": "FAILED",
                "last_updated_at": "2025-05-11T14:00:00Z",
                "risk_flag": True
            }
        }

    def get_kyc_status(self, user_id: str) -> dict:
        """Fetch KYC verification status details for the user."""
        return self._db.get(user_id, {
            "user_id": user_id,
            "status": "PENDING",
            "last_updated_at": "2026-01-01T00:00:00Z",
            "risk_flag": True
        })
