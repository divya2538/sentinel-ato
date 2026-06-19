import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Database, HelpCircle, Terminal } from 'lucide-react';

const VerificationView = ({ report, onBack, onGoToAudit }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  if (!report) return null;

  // Exact data from screenshot for Account Takeover report, dynamic fallback for others
  let rows = [];
  if (report.accountNumber.includes('9982736451')) {
    rows = [
      { source: 'KYC Database', action: 'Retrieve customer profile', timestamp: '10:31:12 UTC', status: 'Success', queryText: 'SELECT * FROM customer_kyc WHERE account_no = \'9982736451\'' },
      { source: 'Transaction Database', action: 'Retrieve last 90 days of transactions', timestamp: '10:31:17 UTC', status: 'Success', queryText: 'SELECT * FROM ledger_tx WHERE account_no = \'9982736451\' AND date >= NOW() - INTERVAL 90 DAY' },
      { source: 'Device Logs', action: 'Retrieve registered devices', timestamp: '10:31:22 UTC', status: 'Success', queryText: 'SELECT * FROM device_registry WHERE user_id = \'CUST-70891\' ORDER BY registered_at DESC' },
      { source: 'Login History', action: 'Retrieve last 90 days of logins', timestamp: '10:31:26 UTC', status: 'Success', queryText: 'SELECT * FROM authentication_attempts WHERE customer_id = \'CUST-70891\' ORDER BY timestamp DESC LIMIT 90' },
      { source: 'CRM Database', action: 'Retrieve customer notes', timestamp: '10:31:31 UTC', status: 'Failed', queryText: 'ERROR: Timeout connection to CRM server. Gateway responded with 504 Timeout.' },
      { source: 'Historical Case Library', action: 'Retrieve similar cases', timestamp: '10:31:34 UTC', status: 'Success', queryText: 'SELECT * FROM case_library WHERE alert_type = \'Account Takeover\' AND risk_score >= 80' },
      { source: 'Report Engine', action: 'Generate investigation report', timestamp: '10:31:35 UTC', status: 'Success', queryText: 'EXECUTE report_engine_compile_dossier' },
    ];
  } else {
    // Dynamic mapping based on report data
    rows = [
      { source: 'KYC Database', action: 'Retrieve customer profile', timestamp: '10:32:01 UTC', status: 'Success', queryText: `SELECT * FROM customer_kyc WHERE account_no = '${report.accountNumber}'` },
      { source: 'Transaction Database', action: 'Retrieve last 90 days of transactions', timestamp: '10:32:05 UTC', status: 'Success', queryText: `SELECT * FROM ledger_tx WHERE account_no = '${report.accountNumber}'` },
      { source: 'Device Logs', action: 'Retrieve registered devices', timestamp: '10:32:10 UTC', status: 'Success', queryText: `SELECT * FROM device_registry WHERE user_id = '${report.customerId}'` },
    ];

    if (report.dataGaps && report.dataGaps.length > 0) {
      rows.push({
        source: report.dataGaps[0].system,
        action: 'Retrieve system logs',
        timestamp: '10:32:14 UTC',
        status: 'Failed',
        queryText: `ERROR: ${report.dataGaps[0].reason}`
      });
    }

    rows.push({
      source: 'Report Engine',
      action: 'Generate investigation report',
      timestamp: '10:32:18 UTC',
      status: 'Success',
      queryText: 'EXECUTE report_engine_compile_dossier'
    });
  }

  const toggleRow = (index) => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Verification & Transparency
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            All data retrieval operations performed during this investigation.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="button" onClick={onBack} className="btn-secondary">
            <ArrowLeft size={16} />
            <span>Back to Report</span>
          </button>
          <button type="button" onClick={onGoToAudit} className="btn-primary">
            <span>Go to Audit Trail</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="table-container">
        <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Verification Queries</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Click row to view raw SQL/API statements</span>
        </div>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>#</th>
              <th>Source</th>
              <th>Action</th>
              <th>Timestamp (UTC)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <React.Fragment key={idx}>
                <tr 
                  onClick={() => toggleRow(idx)}
                  style={{ cursor: 'pointer', transition: 'var(--transition-smooth)' }}
                >
                  <td><strong>{idx + 1}</strong></td>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Database size={14} style={{ color: 'var(--color-accent)' }} />
                      {row.source}
                    </div>
                  </td>
                  <td>{row.action}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{row.timestamp}</td>
                  <td>
                    <span className={`status-badge ${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                    {row.status === 'Failed' && (
                      <HelpCircle size={13} style={{ marginLeft: '6px', verticalAlign: 'middle', color: 'var(--color-error)' }} title={row.queryText} />
                    )}
                  </td>
                </tr>
                {expandedRow === idx && (
                  <tr>
                    <td colSpan="5" style={{ backgroundColor: 'var(--bg-inset)', padding: '1.25rem', borderBottom: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 700 }}>
                        RAW QUERY / COMMAND STATEMENT
                      </div>
                      <pre className="query-code-block" style={{ marginTop: 0 }}>{row.queryText}</pre>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info Callout */}
      <div className="info-callout" style={{ marginTop: '1rem' }}>
        <ShieldCheck size={18} />
        <span>These queries show exactly what data was accessed. No other data was used.</span>
      </div>
    </div>
  );
};

export default VerificationView;
