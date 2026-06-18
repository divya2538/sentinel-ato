from flask import Flask, jsonify, request
from flask_cors import CORS
from agents.aggregator import ATOAggregator
import os
import json
from datetime import datetime

app = Flask(__name__)
# Enable CORS for all routes (to support the frontend running on a different port, e.g. Vite)
CORS(app)

aggregator = ATOAggregator()

# Resolve logs path dynamically
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
LOGS_PATH = os.path.join(BASE_DIR, "data", "audit_logs.json")

def load_audit_logs() -> list:
    if not os.path.exists(LOGS_PATH):
        return []
    try:
        with open(LOGS_PATH, "r") as f:
            content = f.read()
            if not content:
                return []
            return json.loads(content)
    except Exception:
        return []

@app.route("/api/users", methods=["GET"])
def get_users():
    """Returns a list of all user IDs in the audit logs."""
    logs = load_audit_logs()
    users = list(set(log.get("user_id") for log in logs if log.get("user_id")))
    return jsonify(users)

@app.route("/api/analyze/<user_id>", methods=["GET"])
def analyze_user(user_id):
    """Analyzes a specific user's activity and returns the compiled security report."""
    try:
        report = aggregator.evaluate_session(user_id)
        return jsonify(report)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/logs/<user_id>", methods=["GET"])
def get_user_logs(user_id):
    """Retrieves all raw audit logs for a specific user."""
    logs = load_audit_logs()
    user_logs = [log for log in logs if log.get("user_id") == user_id]
    # Sort logs chronologically
    user_logs = sorted(user_logs, key=lambda x: x.get("timestamp", ""))
    return jsonify(user_logs)

@app.route("/api/notes/<user_id>", methods=["POST"])
def save_notes(user_id):
    """Saves analyst notes for a specific user."""
    data = request.json or {}
    notes = data.get("notes", "")
    analyst_name = data.get("analystName", "System Analyst")
    
    notes_path = os.path.join(BASE_DIR, "data", "analyst_notes.json")
    notes_data = {}
    if os.path.exists(notes_path):
        try:
            with open(notes_path, "r") as f:
                notes_data = json.load(f)
        except Exception:
            pass
            
    notes_data[user_id] = {
        "notes": notes,
        "analyst_name": analyst_name,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }
    
    try:
        with open(notes_path, "w") as f:
            json.dump(notes_data, f, indent=2)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
        
    # Generate a simple hash-based receipt
    receipt_id = f"SIG-{abs(hash(notes)) % 1000000:06d}"
    return jsonify({
        "status": "success",
        "user_id": user_id,
        "timestamp": notes_data[user_id]["timestamp"],
        "receipt": receipt_id
    })

if __name__ == "__main__":
    # Run server locally on port 5000
    app.run(host="127.0.0.1", port=5000, debug=True)
