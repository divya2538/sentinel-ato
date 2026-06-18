from datetime import datetime

def parse_timestamp(timestamp_str: str) -> datetime:
    """Parses standard ISO 8601 string to a datetime object."""
    try:
        # Standard formats
        for fmt in ("%Y-%m-%dT%H:%M:%SZ", "%Y-%m-%dT%H:%M:%S+00:00"):
            try:
                return datetime.strptime(timestamp_str, fmt)
            except ValueError:
                continue
        # Fallback to isoformat parsing if supported
        return datetime.fromisoformat(timestamp_str.replace("Z", "+00:00"))
    except Exception:
        return datetime.utcnow()

def time_difference_hours(ts1: str, ts2: str) -> float:
    """Calculates time difference in hours between two ISO timestamps."""
    d1 = parse_timestamp(ts1)
    d2 = parse_timestamp(ts2)
    diff = abs((d1 - d2).total_seconds())
    return diff / 3600.0

def is_stale(timestamp_str: str, current_time_str: str, threshold_days: int = 7) -> bool:
    """Checks if a timestamp is older than a specified number of days relative to a base date."""
    d1 = parse_timestamp(timestamp_str)
    d2 = parse_timestamp(current_time_str)
    diff = (d2 - d1).days
    return diff > threshold_days
