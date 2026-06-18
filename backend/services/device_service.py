class DeviceService:
    def __init__(self):
        # Mock historical devices database for users
        self._known_devices = {
            "usr_normal": ["dev_macbook_normal", "dev_iphone_normal"],
            "usr_compromised": ["dev_workstation_alice", "dev_iphone_alice"],
            "usr_sanctioned": ["dev_iran_user"]
        }

    def is_known_device(self, user_id: str, device_id: str) -> bool:
        """Returns True if the device_id has historically been used by this user."""
        known = self._known_devices.get(user_id, [])
        return device_id in known

    def get_known_devices(self, user_id: str) -> list:
        """Returns all registered known device IDs for a user."""
        return self._known_devices.get(user_id, [])
