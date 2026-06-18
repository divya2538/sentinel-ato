// Mock API service for the Agentic Investigation Suite (AIS)
// Sample datasets for mock reports based on alert types
const MOCK_REPORTS = {
  "Account Takeover": {
    accountNumber: "9982736451",
    customerId: "CUST-70891",
    alertType: "Account Takeover",
    executiveSummary: "AIS initiated evidence gathering for account 9982736451 following an external fraud engine flag for potential Account Takeover. The automated compilation retrieved device registry logs, transaction history, and network access points. A password reset was successfully verified via SMS 2FA on 2026-06-18 at 03:13 UTC, immediately followed by the registry of a new mobile device. Subsequently, a new high-value beneficiary was added and a transfer of ₹480,000 was initiated. All aggregated events occurred within a 9-minute window, deviating significantly from the account's historical usage pattern.",
    timeline: [
      { id: "1", time: "03:13 UTC", event: "Password reset completed", details: "Initiated via mobile web, verified using one-time passcode sent to registered phone number (+91 ******8910)." },
      { id: "2", time: "03:17 UTC", event: "New device registered", details: "Device: OnePlus 11 (Android 13). Location: Mumbai, India. IP: 103.241.12.88 (Residential ISP)." },
      { id: "3", time: "03:19 UTC", event: "New beneficiary added", details: "Name: Rajesh Kumar. Bank: State Bank of India. Account: ******4491. Limit set to ₹500,000." },
      { id: "4", time: "03:22 UTC", event: "₹480,000 transfer initiated", details: "Transaction ref: TXN88273199. Status: Pending Analyst Review. Mode: Immediate Payment Service (IMPS)." }
    ],
    evidence: [
      { name: "KYC Profile", source: "Central KYC Registry (CKYC)", status: "Verified", date: "2026-06-18 10:31:12 UTC", verificationToken: "CKYC-99827-019" },
      { name: "Transaction History", source: "Core Banking Ledger", status: "Verified", date: "2026-06-18 10:31:17 UTC", verificationToken: "LEDGER-TX-4401" },
      { name: "Device Registry Logs", source: "Mobile Authentication Gateway", status: "Verified", date: "2026-06-18 10:31:22 UTC", verificationToken: "MOB-AUTH-9921" },
      { name: "Login Session Logs", source: "IAM Access Logs", status: "Verified", date: "2026-06-18 10:31:25 UTC", verificationToken: "IAM-SESS-8012" },
      { name: "IP Geo-location Database", source: "MaxMind GeoIP Services", status: "Verified", date: "2026-06-18 10:31:27 UTC", verificationToken: "GEOIP-LKP-3004" }
    ],
    similarCases: [
      { caseId: "CASE-2026-4491", similarity: "94%", outcome: "Confirmed Fraud", notes: "Identical pattern: Password reset, followed by device registration and immediate limit utilization." },
      { caseId: "CASE-2026-1182", similarity: "91%", outcome: "Confirmed Fraud", notes: "Device registered in Mumbai, instant transfer to SBI beneficiary." },
      { caseId: "CASE-2025-9011", similarity: "88%", outcome: "Legitimate Activity", notes: "Customer verified travel to Mumbai and authorized new phone registration." }
    ],
    dataGaps: [
      { system: "CRM Database (Salesforce)", reason: "Timeout: System returned 504 Gateway Timeout during record retrieval.", status: "Warning" },
      { system: "External Credit Bureau", reason: "API Limit: Monthly query quota exceeded for credential verification.", status: "Warning" }
    ],
    queries: [
      { id: "Q-101", source: "KYC Database", action: "Retrieve customer profile, contact details, and status", timestamp: "10:31:12 UTC", queryText: "SELECT * FROM customer_kyc WHERE account_no = '9982736451'" },
      { id: "Q-102", source: "Transaction Database", action: "Retrieve last 90 days of transactions and pending orders", timestamp: "10:31:17 UTC", queryText: "SELECT * FROM ledger_tx WHERE account_no = '9982736451' AND date >= NOW() - INTERVAL 90 DAY" },
      { id: "Q-103", source: "Device Logs", action: "Retrieve registered devices and session histories", timestamp: "10:31:22 UTC", queryText: "SELECT * FROM device_registry WHERE user_id = 'CUST-70891' ORDER BY registered_at DESC" },
      { id: "Q-104", source: "GeoIP service", action: "Resolve IP 103.241.12.88 to city and ISP coordinates", timestamp: "10:31:27 UTC", queryText: "GET https://api.geoip.service/v2/city/103.241.12.88" }
    ],
    auditTrail: [
      { timestamp: "10:31:10 UTC", message: "AIS triggered for Account 9982736451 (Alert: Account Takeover)", level: "info" },
      { timestamp: "10:31:12 UTC", message: "KYC database accessed - CKYC profile retrieved successfully", level: "info" },
      { timestamp: "10:31:17 UTC", message: "Transaction database accessed - Compiled last 90 days of ledger entries", level: "info" },
      { timestamp: "10:31:22 UTC", message: "Device logs accessed - Found new device OnePlus 11 registered today", level: "info" },
      { timestamp: "10:31:25 UTC", message: "IAM logs accessed - Identified password reset via mobile web", level: "info" },
      { timestamp: "10:31:27 UTC", message: "GeoIP API queried for 103.241.12.88 (Resolved: Mumbai, MH)", level: "info" },
      { timestamp: "10:31:28 UTC", message: "Historical case library accessed - Vector similarity matching executed", level: "info" },
      { timestamp: "10:31:32 UTC", message: "Attempted Salesforce CRM retrieval - Connection failed (Timeout)", level: "warning" },
      { timestamp: "10:31:35 UTC", message: "Drafted audit-ready investigation report. Standby for human analyst review", level: "success" }
    ]
  },
  "Mule Account Activity": {
    accountNumber: "8827310029",
    customerId: "CUST-11928",
    alertType: "Mule Account Activity",
    executiveSummary: "AIS completed evidence compilation for account 8827310029, flagged for potential Mule Account Activity. The account has been dormant for 8 months with minimal balances. On 2026-06-18, a series of rapid, inbound Unified Payments Interface (UPI) transfers totaling ₹250,000 were received, followed within 30 minutes by multiple outbound cash withdrawals at different ATMs. The AI compiled transaction velocities, KYC source records, and active device profiles to structure this report for investigator analysis.",
    timeline: [
      { id: "1", time: "06:02 UTC", event: "UPI Inbound: ₹50,000 received", details: "From sender: Amit Shah (ICICI Bank). Ref UPI-8827-AA." },
      { id: "2", time: "06:05 UTC", event: "UPI Inbound: ₹100,000 received", details: "From sender: Sunita Devi (HDFC Bank). Ref UPI-8827-AB." },
      { id: "3", time: "06:12 UTC", event: "UPI Inbound: ₹100,000 received", details: "From sender: Vikas Gupta (Axis Bank). Ref UPI-8827-AC." },
      { id: "4", time: "06:30 UTC", event: "ATM Cash Withdrawal: ₹50,000", details: "ATM ID: SBI-MUM-402, Mumbai Metro Station. Status: Completed." },
      { id: "5", time: "06:34 UTC", event: "ATM Cash Withdrawal: ₹50,000", details: "ATM ID: PNB-MUM-110, Dadar Market. Status: Completed." }
    ],
    evidence: [
      { name: "KYC Profile", source: "Central KYC Registry (CKYC)", status: "Verified", date: "2026-06-18 10:32:01 UTC", verificationToken: "CKYC-88273-991" },
      { name: "UPI Network Logs", source: "National Payments Corp (NPCI)", status: "Verified", date: "2026-06-18 10:32:05 UTC", verificationToken: "NPCI-LOG-0012" },
      { name: "ATM Surveillance Records", source: "ATM Controller Logs", status: "Verified", date: "2026-06-18 10:32:10 UTC", verificationToken: "ATM-CTRL-3312" },
      { name: "Account Balances Ledger", source: "Core Banking Ledger", status: "Verified", date: "2026-06-18 10:32:12 UTC", verificationToken: "LEDGER-BAL-1120" }
    ],
    similarCases: [
      { caseId: "CASE-2025-8819", similarity: "95%", outcome: "Confirmed Fraud", notes: "Dormant account activated by low-value incoming UPI followed by immediate cash outs." },
      { caseId: "CASE-2026-0041", similarity: "89%", outcome: "Confirmed Fraud", notes: "Students' account compromised/sold to act as money mule for cybercrime proceeds." }
    ],
    dataGaps: [
      { system: "ATM Video Surveillance Feed", reason: "Connection Refused: Remote CCTV server did not respond within the timeframe.", status: "Warning" }
    ],
    queries: [
      { id: "Q-201", source: "KYC Database", action: "Retrieve account holder status and occupational income registry", timestamp: "10:32:01 UTC", queryText: "SELECT name, occupation, salary FROM customer_kyc WHERE account_no = '8827310029'" },
      { id: "Q-202", source: "NPCI Gateway", action: "Fetch UPI session route identifiers and device hashes", timestamp: "10:32:05 UTC", queryText: "GET /upi/transactions?account=8827310029&limit=5" },
      { id: "Q-203", source: "ATM Log Service", action: "Retrieve ATM cash dispense reports and card chip data", timestamp: "10:32:10 UTC", queryText: "SELECT * FROM atm_logs WHERE card_number = (SELECT card_no FROM account_cards WHERE account_no = '8827310029')" }
    ],
    auditTrail: [
      { timestamp: "10:32:00 UTC", message: "AIS triggered for Account 8827310029 (Alert: Mule Account Activity)", level: "info" },
      { timestamp: "10:32:01 UTC", message: "KYC database accessed - Profile listed as 'Student' with no recent tax filing", level: "info" },
      { timestamp: "10:32:05 UTC", message: "NPCI Gateway queried - UPI source locations located in northern state hubs", level: "info" },
      { timestamp: "10:32:10 UTC", message: "ATM Controller queried - Confirmed manual ATM pin verification on cash-out transactions", level: "info" },
      { timestamp: "10:32:12 UTC", message: "Dormancy logs compiled - Account was inactive for 244 days prior to today", level: "info" },
      { timestamp: "10:32:14 UTC", message: "ATM CCTV feed request sent - Host failed to respond (Logged Data Gap)", level: "warning" },
      { timestamp: "10:32:18 UTC", message: "Vector similarity checks complete. Report generated successfully", level: "success" }
    ]
  },
  "Suspicious Transfer": {
    accountNumber: "7766554433",
    customerId: "CUST-33441",
    alertType: "Suspicious Transfer",
    executiveSummary: "AIS compiled evidence for a high-value transfer flagged from account 7766554433. The user attempted a wire transfer of $25,000 to an offshore bank. Historical analysis shows the customer typically performs local domestic transactions. The AI retrieved the transaction instructions, Swift/IBAN verification codes, and current KYC documents. No direct rules were violated, but the transaction stands out as anomalous relative to the historical ledger profile.",
    timeline: [
      { id: "1", time: "08:15 UTC", event: "Outbound international wire requested", details: "Recipient: Alpha Trade Ltd. Bank: Barclays, London. Amount: $25,000 USD." },
      { id: "2", time: "08:16 UTC", event: "Compliance flag raised", details: "Transaction exceeds account's average monthly ledger volume by 750%." }
    ],
    evidence: [
      { name: "KYC Profile", source: "Central KYC Registry (CKYC)", status: "Verified", date: "2026-06-18 10:33:05 UTC", verificationToken: "CKYC-77665-001" },
      { name: "SWIFT Transfer Instructions", source: "International Payment Gateway", status: "Verified", date: "2026-06-18 10:33:09 UTC", verificationToken: "SWIFT-PAY-441" },
      { name: "Ledger Analytics History", source: "Data Warehouse", status: "Verified", date: "2026-06-18 10:33:14 UTC", verificationToken: "DWH-ANALY-889" }
    ],
    similarCases: [
      { caseId: "CASE-2026-0992", similarity: "76%", outcome: "Legitimate Activity", notes: "Invoice payments for new business entities. Closed after compliance verification of invoice." },
      { caseId: "CASE-2025-3001", similarity: "62%", outcome: "Confirmed Fraud", notes: "Business Email Compromise (BEC) redirecting vendor invoices to malicious bank accounts." }
    ],
    dataGaps: [
      { system: "Corporate Registry Check", reason: "Service Offline: Ministry of Corporate Affairs API is undergoing scheduled maintenance.", status: "Warning" }
    ],
    queries: [
      { id: "Q-301", source: "KYC Database", action: "Verify company registry info and authorized signers", timestamp: "10:33:05 UTC", queryText: "SELECT * FROM corporate_kyc WHERE account_no = '7766554433'" },
      { id: "Q-302", source: "SWIFT System Gateway", action: "Retrieve SWIFT message body MT103 details", timestamp: "10:33:09 UTC", queryText: "GET /swift/mt103/7766554433?ref=TXN991" }
    ],
    auditTrail: [
      { timestamp: "10:33:00 UTC", message: "AIS triggered for Account 7766554433 (Alert: Suspicious Transfer)", level: "info" },
      { timestamp: "10:33:05 UTC", message: "Corporate KYC database queried - Signature cards matches files", level: "info" },
      { timestamp: "10:33:09 UTC", message: "SWIFT MT103 payload compiled - Beneficiary name: Alpha Trade Ltd", level: "info" },
      { timestamp: "10:33:12 UTC", message: "Corporate Registry query initiated - API timed out (Scheduled Maintenance)", level: "warning" },
      { timestamp: "10:33:18 UTC", message: "Compiled reports ready for analyst signature", level: "success" }
    ]
  },
  "AML Review": {
    accountNumber: "5544332211",
    customerId: "CUST-99008",
    alertType: "AML Review",
    executiveSummary: "AIS compiled transaction and compliance data for account 5544332211, flagged for anti-money laundering (AML) structuring analysis. The AI retrieved the past 180 days of ledger logs, showing a series of cash deposits just below the regulatory reporting threshold of ₹50,000, deposited across three branches within a 48-hour timeframe. The report aggregates branch deposit receipts, Teller IDs, and cash counter logs to enable swift human assessment.",
    timeline: [
      { id: "1", time: "11:00 UTC (Day 1)", event: "Cash Deposit: ₹49,500", details: "Branch: Connaught Place, New Delhi. Teller: T-1049. Status: Completed." },
      { id: "2", time: "14:15 UTC (Day 1)", event: "Cash Deposit: ₹49,000", details: "Branch: Karol Bagh, New Delhi. Teller: T-3392. Status: Completed." },
      { id: "3", time: "09:30 UTC (Day 2)", event: "Cash Deposit: ₹49,500", details: "Branch: Saket, New Delhi. Teller: T-2281. Status: Completed." }
    ],
    evidence: [
      { name: "KYC Profile", source: "Central KYC Registry (CKYC)", status: "Verified", date: "2026-06-18 10:34:02 UTC", verificationToken: "CKYC-55443-118" },
      { name: "Ledger Cash Records", source: "Core Ledger Service", status: "Verified", date: "2026-06-18 10:34:06 UTC", verificationToken: "LEDGER-CSH-901" },
      { name: "Teller Log Audit", source: "Branch Terminal Gateway", status: "Verified", date: "2026-06-18 10:34:11 UTC", verificationToken: "TERM-GTW-7781" }
    ],
    similarCases: [
      { caseId: "CASE-2025-1109", similarity: "96%", outcome: "Confirmed Structuring", notes: "Customer deliberately structured deposits below ₹50K CTR threshold to evade documentation." },
      { caseId: "CASE-2026-0038", similarity: "81%", outcome: "Legitimate Activity", notes: "Micro-retail business owner depositing cash sales across branches daily." }
    ],
    dataGaps: [
      { system: "PAN Tax Verification DB", reason: "API Error: Internal Server Error (500) from tax authority portal.", status: "Warning" }
    ],
    queries: [
      { id: "Q-401", source: "KYC Database", action: "Fetch PAN card status and customer income bracket", timestamp: "10:34:02 UTC", queryText: "SELECT pan_no, annual_income FROM customer_kyc WHERE account_no = '5544332211'" },
      { id: "Q-402", source: "Branch Terminals", action: "Retrieve Teller logs and deposit slips metadata", timestamp: "10:34:11 UTC", queryText: "SELECT * FROM deposit_slips WHERE customer_id = 'CUST-99008' AND date >= '2026-06-16'" }
    ],
    auditTrail: [
      { timestamp: "10:34:00 UTC", message: "AIS triggered for Account 5544332211 (Alert: AML Review)", level: "info" },
      { timestamp: "10:34:02 UTC", message: "KYC profile loaded successfully", level: "info" },
      { timestamp: "10:34:06 UTC", message: "Ledger cash entries retrieved for the previous 30 days", level: "info" },
      { timestamp: "10:34:11 UTC", message: "Branch terminal logs checked - Identified Teller codes for transactions", level: "info" },
      { timestamp: "10:34:14 UTC", message: "Tax verification portal API call returned error 500 (Logged Data Gap)", level: "warning" },
      { timestamp: "10:34:18 UTC", message: "Report generated successfully. Analyst evaluation requested", level: "success" }
    ]
  },
  "Unauthorized Access": {
    accountNumber: "3322119988",
    customerId: "CUST-44109",
    alertType: "Unauthorized Access",
    executiveSummary: "AIS compiled investigation metrics for account 3322119988 following multiple consecutive login failures followed by a login from an unverified overseas IP location. The AI aggregated system access logs, web headers, and previous authentication mechanisms. No transactions have been executed yet. The account has been flagged for active analyst review to confirm if credentials have been compromised.",
    timeline: [
      { id: "1", time: "01:05 UTC", event: "Login Failure (3 consecutive times)", details: "Failed password attempts. Device: Firefox (Windows). IP: 182.74.88.90 (Delhi, India)." },
      { id: "2", time: "01:08 UTC", event: "Successful Login", details: "Device: Safari (iOS). IP: 92.112.44.18 (Frankfurt, Germany - VPN/Datacenter Network)." },
      { id: "3", time: "01:09 UTC", event: "Account Settings Modification", details: "Email notification alerts toggled to 'Disabled'." }
    ],
    evidence: [
      { name: "KYC Profile", source: "Central KYC Registry (CKYC)", status: "Verified", date: "2026-06-18 10:35:01 UTC", verificationToken: "CKYC-33221-881" },
      { name: "Access Gateway Logs", source: "IAM Access Ledger", status: "Verified", date: "2026-06-18 10:35:05 UTC", verificationToken: "IAM-ACC-0044" },
      { name: "VPN Detection DB", source: "IPQualityScore Services", status: "Verified", date: "2026-06-18 10:35:09 UTC", verificationToken: "IPQS-VPN-1120" }
    ],
    similarCases: [
      { caseId: "CASE-2026-0199", similarity: "97%", outcome: "Confirmed Fraud", notes: "Credential stuffing campaign accessing account from German hosting server." },
      { caseId: "CASE-2025-4081", similarity: "80%", outcome: "Legitimate Activity", notes: "User traveling for work using proxy server; verified manually via secondary email." }
    ],
    dataGaps: [
      { system: "Mobile SMS Gateway Records", reason: "Timeout: SMS aggregator api failed to return delivery status reports.", status: "Warning" }
    ],
    queries: [
      { id: "Q-501", source: "KYC Database", action: "Retrieve account phone number and security questions", timestamp: "10:35:01 UTC", queryText: "SELECT email, phone FROM customer_kyc WHERE account_no = '3322119988'" },
      { id: "Q-502", source: "Access Logs Database", action: "Fetch last 50 login attempts and IP addresses", timestamp: "10:35:05 UTC", queryText: "SELECT * FROM authentication_attempts WHERE customer_id = 'CUST-44109' ORDER BY event_time DESC LIMIT 50" }
    ],
    auditTrail: [
      { timestamp: "10:35:00 UTC", message: "AIS triggered for Account 3322119988 (Alert: Unauthorized Access)", level: "info" },
      { timestamp: "10:35:01 UTC", message: "KYC database accessed - Contact email identified as active", level: "info" },
      { timestamp: "10:35:05 UTC", message: "IAM Database accessed - Failed attempts logged in sequence", level: "info" },
      { timestamp: "10:35:09 UTC", message: "VPN Database queried - 92.112.44.18 detected as hosting/proxy endpoint", level: "info" },
      { timestamp: "10:35:12 UTC", message: "SMS gateway logs check failed - API Timeout (Logged Data Gap)", level: "warning" },
      { timestamp: "10:35:15 UTC", message: "Investigation dataset generated for investigator signing", level: "success" }
    ]
  }
};
/**
 * Simulates a request to compile an investigation report.
 * @param {string} accountNumber - The 10-digit account number.
 * @param {string} customerId - Optional customer ID.
 * @param {string} alertType - The alert type selected by the analyst.
 * @returns {Promise<object>} The generated investigation report.
 */
export const generateReport = (accountNumber, customerId, alertType) => {
  return new Promise((resolve, reject) => {
    // Basic verification
    if (!accountNumber || accountNumber.trim().length === 0) {
      return reject(new Error("Account Number is a required field."));
    }
    if (!alertType) {
      return reject(new Error("Alert Type must be selected."));
    }
    // Simulate network delay to emulate data aggregation from multiple systems
    setTimeout(() => {
      // Get template report or generate a fallback
      const baseReport = MOCK_REPORTS[alertType] || MOCK_REPORTS["Account Takeover"];
      
      const responseReport = {
        ...baseReport,
        accountNumber: accountNumber,
        customerId: customerId || `CUST-${Math.floor(10000 + Math.random() * 90000)}`,
        generatedAt: new Date().toISOString()
      };
      
      resolve(responseReport);
    }, 1800); // 1.8 seconds delay feels active and fits the premium aggregation animation
  });
};
/**
 * Simulate saving notes to the database.
 * @param {string} accountNumber - The account number.
 * @param {string} notes - The analyst notes content.
 * @param {string} analystName - Name or ID of the signing analyst.
 * @returns {Promise<object>} The confirmation payload.
 */
export const saveAnalystNotes = (accountNumber, notes, analystName) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: "success",
        accountNumber,
        timestamp: new Date().toISOString(),
        receipt: `SIG-${Math.floor(100000 + Math.random() * 900000)}`
      });
    }, 600);
  });
};
