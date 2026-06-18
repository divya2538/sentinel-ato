import React, { useEffect } from 'react';
import { X, ShieldCheck, Eye, Terminal } from 'lucide-react';
import VerificationQueries from '../components/VerificationQueries';
import AuditTrail from '../components/AuditTrail';
const TransparencyView = ({ report, onClose, isOpen }) => {
  // Prevent body scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  if (!isOpen || !report) return null;
  return (
    <div className="transparency-backdrop animate-fade-in" onClick={onClose}>
      <div 
        className="transparency-drawer animate-slide-up" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-area">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Eye size={20} style={{ color: 'var(--color-accent)' }} />
              Transparency & Verification
            </h3>
            <p>Verification logs for account {report.accountNumber}</p>
          </div>
          <button onClick={onClose} className="btn-close" aria-label="Close panel">
            <X size={20} />
          </button>
        </div>
        {/* Drawer Content */}
        <div className="drawer-content">
          {/* Core Principles Header */}
          <div className="compliance-banner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem', background: 'var(--color-info-bg)', borderColor: 'var(--color-info)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
              <ShieldCheck size={16} />
              <span>Verifiable Compilation Protocol</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              AIS automatically audits all database operations. The statements in this report match the query payloads below.
            </p>
          </div>
          {/* Section: Verification Queries */}
          <div>
            <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Data Retrieval Queries
            </h4>
            <VerificationQueries queries={report.queries} />
          </div>
          {/* Section: Full System Audit Trail */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '1rem' }}>
            <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              System Audit
            </h4>
            <AuditTrail logs={report.auditTrail} />
          </div>
        </div>
        {/* Drawer Footer - Reinforce Product Principles */}
        <div className="disclaimer-banner">
          <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>AIS Compliance Statements:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <div>✓ Every data retrieval operation is cryptographically logged.</div>
            <div>✓ Source queries and responses are stored in immutable logs.</div>
            <div>✓ AI is used exclusively for compilation; decisions are executed by the human analyst.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TransparencyView;
