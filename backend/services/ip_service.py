class IPService:
    def __init__(self):
        # Mock Geo-IP and VPN registry database
        self._ip_db = {
            "192.0.2.10": {
                "ip": "192.0.2.10",
                "country": "US",
                "city": "New York",
                "is_vpn_or_proxy": False,
                "risk_score": 5
            },
            "203.0.113.50": {
                "ip": "203.0.113.50",
                "country": "RU",
                "city": "Moscow",
                "is_vpn_or_proxy": True,
                "risk_score": 85
            },
            "185.120.140.1": {
                "ip": "185.120.140.1",
                "country": "IR",
                "city": "Tehran",
                "is_vpn_or_proxy": False,
                "risk_score": 90
            }
        }

    def get_ip_info(self, ip_address: str) -> dict:
        """Looks up geolocation and proxy details for a given IP."""
        return self._ip_db.get(ip_address, {
            "ip": ip_address,
            "country": "US",
            "city": "Chicago",
            "is_vpn_or_proxy": False,
            "risk_score": 10
        })
