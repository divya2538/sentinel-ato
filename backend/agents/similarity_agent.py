import os
import json

class SimilarityAgent:
    def __init__(self):
        # Resolve data path dynamically
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        self.cases_path = os.path.join(base_dir, "data", "confirmed_cases.json")

    def _load_cases(self) -> list:
        if not os.path.exists(self.cases_path):
            return []
        try:
            with open(self.cases_path, "r") as f:
                content = f.read()
                if not content:
                    return []
                return json.loads(content)
        except Exception:
            return []

    def analyze(self, current_indicators: list) -> dict:
        """Calculates Jaccard Similarity between current indicators and past ATO cases."""
        cases = self._load_cases()
        if not cases or not current_indicators:
            return {
                "risk_score": 0.0,
                "top_match": None,
                "matches": []
            }

        set_current = set(current_indicators)
        matches = []
        highest_score = 0.0
        top_match = None

        for case in cases:
            set_case = set(case.get("risk_indicators", []))
            union = set_current.union(set_case)
            intersection = set_current.intersection(set_case)
            
            jaccard = len(intersection) / len(union) if union else 0.0
            
            match_entry = {
                "case_id": case.get("case_id"),
                "pattern_name": case.get("pattern_name"),
                "similarity_score": round(jaccard, 2),
                "historical_risk": case.get("risk_score", 0)
            }
            matches.append(match_entry)
            
            if jaccard > highest_score:
                highest_score = jaccard
                top_match = {
                    "case_id": case.get("case_id"),
                    "pattern_name": case.get("pattern_name"),
                    "description": case.get("description"),
                    "similarity_score": round(jaccard, 2)
                }

        # Calculate risk score based on the highest match similarity times the past risk weight
        risk_score = 0.0
        if top_match:
            historical_risk = next(c.get("risk_score", 0) for c in cases if c.get("case_id") == top_match["case_id"])
            risk_score = round(highest_score * historical_risk, 1)

        return {
            "risk_score": risk_score,
            "top_match": top_match,
            "matches": sorted(matches, key=lambda x: x["similarity_score"], reverse=True)
        }
