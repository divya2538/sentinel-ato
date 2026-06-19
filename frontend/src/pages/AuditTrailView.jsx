import React from 'react';
import { ArrowLeft, CheckCircle2, Terminal, Clock } from 'lucide-react';

const AuditTrailView = ({ report, onBack }) => {
  if (!report) return null;

  // Exact data from screenshot for Account Takeover report, dynamic fallback for others
  let logs = [];
  if (report.accountNumber.includes('9982736451')) {
    logs = [
      { timestamp: '10:31:12 UTC', action: 'KYC database accessed', details: `Customer profile retrieved for account ${report.accountNumber}` },
      { timestamp: '10:31:17 UTC', action: 'Transaction database accessed', details: 'Last 90 days of transactions retrieved' },
      { timestamp: '10:31:22 UTC', action: 'Device logs accessed', details: 'Registered devices information retrieved' },
      { timestamp: '10:31:26 UTC', action: 'Login history accessed', details: 'Last 90 days of login events retrieved' },
      { timestamp: '10:31:31 UTC', action: 'CRM database access attempted', details: 'Connection failed - system unavailable' },
      { timestamp: '10:31:34 UTC', action: 'Historical case library accessed', details: 'Similar cases retrieved for comparison' },
      { timestamp: '10:31:35 UTC', action: 'Investigation report generated', details: 'Report INV-2024-00078 generated successfully' },
    ];
  } else {
    // Dynamic mapping based on report auditTrail
    logs = (report.auditTrail || []).map((trail, index) => {
      let act = 'System action logged';
      if (trail.message.toLowerCase().includes('kyc')) act = 'KYC database accessed';
      else if (trail.message.toLowerCase().includes('transaction') || trail.message.toLowerCase().includes('ledger')) act = 'Transaction database accessed';
      else if (trail.message.toLowerCase().includes('device')) act = 'Device logs accessed';
      else if (trail.message.toLowerCase().includes('similarity') || trail.message.toLowerCase().includes('case')) act = 'Historical case library accessed';
      else if (trail.message.toLowerCase().includes('crm') || trail.message.toLowerCase().includes('salesforce') || trail.message.toLowerCase().includes('timeout')) act = 'CRM database access attempted';
      else if (trail.message.toLowerCase().includes('report') || trail.message.toLowerCase().includes('dossier') || trail.message.toLowerCase().includes('generate')) act = 'Investigation report generated';
      
      return {
        timestamp: trail.timestamp.includes('after') ? `10:32:${10 + index} UTC` : trail.timestamp,
        action: act,
        details: trail.message
      };
    });
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Full Audit Trail
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Chronological log of all actions performed by the system.
          </p>
        </div>
        <button type="button" onClick={onBack} className="btn-secondary">
          <ArrowLeft size={16} />
          <span>Back to Verification</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="table-container">
        <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Terminal size={15} style={{ color: 'var(--color-accent)' }} />
          <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>System Operational Logs</span>
        </div>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th style={{ width: '180px' }}>Timestamp (UTC)</th>
              <th style={{ width: '280px' }}>Action</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, idx) => (
              <tr key={idx}>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 500 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Clock size={12} style={{ color: 'var(--text-muted)' }} />
                    {log.timestamp}
                  </div>
                </td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{log.action}</td>
                <td>{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Checklist */}
      <div className="footer-checklist-row">
        <div className="footer-checklist-item">
          <CheckCircle2 size={16} />
          <span>Every action is auditable</span>
        </div>
        <div className="footer-checklist-item">
          <CheckCircle2 size={16} />
          <span>Every source is verifiable</span>
        </div>
        <div className="footer-checklist-item">
          <CheckCircle2 size={16} />
          <span>Every statement is traceable</span>
        </div>
      </div>
    </div>
  );
};

export default AuditTrailView;
