from services.kyc_service import KYCService
from services.ip_service import IPService

class ComplianceAgent:
    def __init__(self):
        self.kyc_service = KYCService()
        self.ip_service = IPService()
        # Mock List of sanctioned country ISO codes (OFAC check)
        self.sanctioned_countries = ["IR", "KP", "SY", "CU", "SD"]

    def analyze(self, user_id: str, audit_logs: list) -> dict:
        """Audits logs for regulatory compliance and security posture violations."""
        user_logs = [log for log in audit_logs if log.get("user_id") == user_id]
        violations = []
        
        # Fetch KYC Status
        kyc_data = self.kyc_service.get_kyc_status(user_id)
        is_kyc_verified = kyc_data.get("status") == "VERIFIED"
        
        # Track if MFA was verified during login
        mfa_verified_session = False
        login_events = [log for log in user_logs if log.get("event_type") == "login_success"]
        if login_events:
            # Check latest login
            latest_login = max(login_events, key=lambda x: x.get("timestamp", ""))
            mfa_verified_session = latest_login.get("details", {}).get("mfa_verified", False)

        for log in user_logs:
            event_type = log.get("event_type")
            ip_address = log.get("ip_address")
            
            # 1. OFAC Sanctions Country Check
            if ip_address:
                ip_info = self.ip_service.get_ip_info(ip_address)
                country = ip_info.get("country")
                if country in self.sanctioned_countries:
                    violations.append({
                        "policy_name": "OFAC_SANCTION_POLICY",
                        "violation_type": "SANCTIONED_COUNTRY_ACCESS",
                        "description": f"Account access attempt from sanctioned country: {country}.",
                        "severity": "CRITICAL",
                        "risk_score_impact": 95
                    })

            # 2. Unverified Transactions Check
            if event_type == "transaction_initiated":
                if not is_kyc_verified:
                    violations.append({
                        "policy_name": "FINANCIAL_COMPLIANCE",
                        "violation_type": "UNVERIFIED_KYC_TRANSACTION",
                        "description": "Financial transaction initiated on an account without active/verified KYC.",
                        "severity": "HIGH",
                        "risk_score_impact": 70
                    })

            # 3. Security Settings modification compliance
            if event_type == "pii_updated":
                if not mfa_verified_session:
                    violations.append({
                        "policy_name": "ACCOUNT_SECURITY_POLICY",
                        "violation_type": "PII_CHANGE_WITHOUT_MFA",
                        "description": "Sensitive profile details (email/phone/password) modified without verified MFA authentication.",
                        "severity": "HIGH",
                        "risk_score_impact": 80
                    })
            
            if event_type == "mfa_disabled":
                if not mfa_verified_session:
                    violations.append({
                        "policy_name": "ACCOUNT_SECURITY_POLICY",
                        "violation_type": "MFA_DISABLE_WITHOUT_MFA",
                        "description": "Multi-factor authentication disabled without verification step-up.",
                        "severity": "CRITICAL",
                        "risk_score_impact": 90
                    })

        # Deduplicate violations based on type
        unique_violations = []
        seen = set()
        for v in violations:
            if v["violation_type"] not in seen:
                seen.add(v["violation_type"])
                unique_violations.append(v)

        # Calculate compliance risk score
        risk_score = 0.0
        if unique_violations:
            risk_score = max(v["risk_score_impact"] for v in unique_violations)

        return {
            "risk_score": risk_score,
            "violations": unique_violations,
            "policy_status": "NON_COMPLIANT" if unique_violations else "COMPLIANT"
        }
