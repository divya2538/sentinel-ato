from services.crm_service import CRMService
from services.device_service import DeviceService
from services.ip_service import IPService
from services.transaction_service import TransactionService
from utils.stale_checker import time_difference_hours

class PatternAgent:
    def __init__(self):
        self.crm_service = CRMService()
        self.device_service = DeviceService()
        self.ip_service = IPService()
        self.transaction_service = TransactionService()

    def analyze(self, user_id: str, audit_logs: list) -> dict:
        """Analyzes audit logs to detect anomalous behaviors and indicators."""
        user_logs = [log for log in audit_logs if log.get("user_id") == user_id]
        # Sort logs chronologically
        user_logs = sorted(user_logs, key=lambda x: x.get("timestamp", ""))

        indicators = []
        evidence = []
        checks_performed = ["pattern_check"]

        if not user_logs:
            return {
                "risk_score": 0.0,
                "indicators": [],
                "evidence": ["No logs found for this user."],
                "checks_performed": checks_performed
            }

        # 1. Brute Force Check
        failed_count = 0
        brute_force_detected = False
        for log in user_logs:
            event_type = log.get("event_type")
            if event_type == "login_failed":
                failed_count += 1
            elif event_type == "login_success":
                if failed_count >= 2:
                    brute_force_detected = True
                    indicators.append("failed_logins_spike")
                    evidence.append(f"Brute force signature: {failed_count} failed logins immediately preceding a success.")
                # Reset counter on success
                failed_count = 0

        # 2. Device & IP Checks
        has_new_device = False
        has_suspicious_ip = False
        checked_device = False
        checked_ip = False
        
        for log in user_logs:
            device_id = log.get("device_id")
            ip_address = log.get("ip_address")
            
            if device_id:
                checked_device = True
                if not self.device_service.is_known_device(user_id, device_id):
                    has_new_device = True
            
            if ip_address:
                checked_ip = True
                ip_info = self.ip_service.get_ip_info(ip_address)
                if ip_info.get("is_vpn_or_proxy") or ip_info.get("risk_score", 0) >= 50:
                    has_suspicious_ip = True
                    
        if checked_device:
            checks_performed.append("device_check")
            if has_new_device:
                indicators.append("new_device")
                evidence.append("Login initiated from an unrecognized device.")
                
        if checked_ip:
            checks_performed.append("ip_check")
            if has_suspicious_ip:
                indicators.append("vpn_or_high_risk_ip")
                evidence.append("Session traffic routed through a VPN, proxy, or flagged host.")

        # 3. Impossible Travel Check
        for i in range(len(user_logs) - 1):
            log_a = user_logs[i]
            log_b = user_logs[i+1]
            
            ip_a = log_a.get("ip_address")
            ip_b = log_b.get("ip_address")
            
            if ip_a and ip_b and ip_a != ip_b:
                info_a = self.ip_service.get_ip_info(ip_a)
                info_b = self.ip_service.get_ip_info(ip_b)
                
                country_a = info_a.get("country")
                country_b = info_b.get("country")
                
                if country_a and country_b and country_a != country_b:
                    hours_diff = time_difference_hours(log_a.get("timestamp"), log_b.get("timestamp"))
                    # If distance travel represents an impossible velocity (e.g. crossing borders under 4 hours)
                    if hours_diff < 4.0:
                        indicators.append("impossible_travel")
                        evidence.append(
                            f"Impossible Travel: Account accessed from {country_a} ({info_a.get('city')}) and "
                            f"{country_b} ({info_b.get('city')}) within {round(hours_diff, 2)} hours."
                        )
                        break

        # 4. Critical Setting Changes (PII / MFA)
        for log in user_logs:
            event_type = log.get("event_type")
            if event_type == "pii_updated":
                details = log.get("details", {})
                field = details.get("field_changed", "profile details")
                indicators.append("pii_changed")
                evidence.append(f"Sensitive user data changed: '{field}' updated.")
            elif event_type == "mfa_disabled":
                indicators.append("mfa_disabled")
                evidence.append("Multi-factor authentication (MFA) was disabled.")
            elif event_type == "mfa_added":
                indicators.append("mfa_added")
                evidence.append("A new multi-factor authentication device was registered.")

        # 5. Financial Velocity & Deviancy Checks
        checked_txn = False
        for log in user_logs:
            if log.get("event_type") == "transaction_initiated":
                checked_txn = True
                details = log.get("details", {})
                amount = details.get("amount", 0.0)
                
                txn_analysis = self.transaction_service.analyze_transaction(user_id, amount)
                if txn_analysis.get("is_suspicious"):
                    indicators.append("large_transaction_deviation")
                    evidence.append(
                        f"Financial anomaly: Transaction of ${amount} exceeds average transaction limit "
                        f"(${txn_analysis.get('average_amount')}) by a factor of {txn_analysis.get('deviation_ratio')}x."
                    )
                    
        if checked_txn:
            checks_performed.append("transaction_check")

        # 6. Risk Scoring Formula
        # Accumulate weights for matched indicators
        weights = {
            "failed_logins_spike": 25,
            "new_device": 20,
            "vpn_or_high_risk_ip": 15,
            "impossible_travel": 35,
            "pii_changed": 30,
            "mfa_disabled": 30,
            "mfa_added": 15,
            "large_transaction_deviation": 30
        }
        
        score = 0.0
        for ind in set(indicators):
            score += weights.get(ind, 10)
            
        # Cap risk score at 100
        risk_score = min(100.0, score)

        return {
            "risk_score": risk_score,
            "indicators": list(set(indicators)),
            "evidence": evidence,
            "checks_performed": checks_performed
        }
