import sys
import os
import json

# Ensure console supports UTF-8 for emoji printing
if sys.platform.startswith('win'):
    sys.stdout.reconfigure(encoding='utf-8')

# Ensure backend directory is in path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from agents.aggregator import ATOAggregator

def test_user_evaluation(user_id):
    print("=" * 60)
    print(f"EVALUATING USER: {user_id}")
    print("=" * 60)
    
    aggregator = ATOAggregator()
    try:
        report = aggregator.evaluate_session(user_id)
        
        print(f"Report ID: {report['report_id']}")
        print(f"Timestamp: {report['generated_at']}")
        print(f"Risk Score: {report['summary']['risk_score']}/100")
        print(f"Risk Level: {report['summary']['risk_level']}")
        print(f"Confidence Score: {report['summary']['confidence_score']}%")
        print(f"Verdict: {report['summary']['verdict']}")
        print("\nMatched Indicators:")
        print(report['findings']['pattern_analysis']['indicators'])
        print("\nCompliance Violations:")
        for violation in report['findings']['compliance_analysis']['violations']:
            print(f"- {violation['policy_name']} ({violation['violation_type']}): {violation['description']} (Severity: {violation['severity']})")
            
        print("\nNarrative Summary Preview:")
        print(report['narrative'])
        
        # Save output report to file for inspection
        output_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), f"test_report_{user_id}.json")
        with open(output_file, "w") as f:
            json.dump(report, f, indent=2)
        print(f"\nReport saved to: {output_file}")
    except Exception as e:
        print(f"Error evaluating user {user_id}: {e}")
        import traceback
        traceback.print_exc()
    print("\n" + "#" * 60 + "\n")

if __name__ == "__main__":
    test_user_evaluation("usr_normal")
    test_user_evaluation("usr_compromised")
    test_user_evaluation("usr_sanctioned")
