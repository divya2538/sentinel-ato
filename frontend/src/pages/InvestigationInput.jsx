import React, { useState, useEffect } from 'react';
import { Search, ShieldAlert, Cpu, Sparkles, UserCheck, Eye, Database, Info, FileText } from 'lucide-react';
import { fetchUsers } from '../api';

const InvestigationInput = ({ onSubmit, isSubmitting, isDemoMode, onAutoEnableDemoMode }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [alertType, setAlertType] = useState('Account Takeover');
  const [error, setError] = useState('');
  const [availableUsers, setAvailableUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoadingUsers(true);
    fetchUsers()
      .then(users => {
        if (isMounted) {
          setAvailableUsers(users);
          setIsLoadingUsers(false);
          setError('');
        }
      })
      .catch(err => {
        console.error("Failed to load backend users:", err);
        if (isMounted) {
          setIsLoadingUsers(false);
          if (!isDemoMode) {
            setError('Backend server offline. Please start Flask or enable Demo Mode to proceed.');
          }
        }
      });
    return () => { isMounted = false; };
  }, [isDemoMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!accountNumber.trim()) {
      setError('An Account Number or User ID must be provided to initiate the query.');
      return;
    }
    setError('');
    onSubmit({ accountNumber, customerId, alertType });
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Header Row */}
      <div className="new-investigation-header-row">
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>New Investigation</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Provide the details below to generate an investigation report.
          </p>
        </div>
        <div className="header-info-badge">
          <Info size={15} style={{ color: 'var(--color-info)', flexShrink: 0 }} />
          <span>AI does not make decisions. AI only compiles evidence.</span>
        </div>
      </div>

      {isDemoMode && (
        <div className="compliance-banner" style={{ background: 'var(--color-warning-bg)', borderColor: 'rgba(217, 119, 6, 0.2)', color: 'var(--color-warning)' }}>
          <Sparkles size={16} />
          <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>
            <strong>Demo Sandbox Active:</strong> Using offline simulated dataset.
          </div>
        </div>
      )}

      {/* Main card */}
      <div className="new-investigation-card">
        <form onSubmit={handleSubmit}>
          {/* Database Autofill Selection */}
          <div className="form-group">
            <label className="form-label">Autofill Flagged Session (From Database)</label>
            <select
              className="form-input"
              style={{ paddingRight: '2rem' }}
              onChange={(e) => {
                const val = e.target.value;
                if (val) {
                  const cleanVal = val.split(' ')[0];
                  setAccountNumber(cleanVal);
                  setCustomerId(cleanVal === 'usr_compromised' ? 'CUST-70891' : cleanVal === 'usr_sanctioned' ? 'CUST-99008' : cleanVal === 'usr_normal' ? 'CUST-44109' : cleanVal);
                  
                  // Auto-set the best alertType based on selected account
                  if (val.includes('compromised') || val.includes('Takeover') || val.includes('9982736451')) {
                    setAlertType('Account Takeover');
                  } else if (val.includes('sanctioned') || val.includes('AML') || val.includes('5544332211')) {
                    setAlertType('AML Review');
                  } else if (val.includes('normal') || val.includes('Unauthorized') || val.includes('3322119988')) {
                    setAlertType('Unauthorized Access');
                  } else if (val.includes('Mule') || val.includes('8827310029')) {
                    setAlertType('Mule Account Activity');
                  } else if (val.includes('Transfer') || val.includes('7766554433')) {
                    setAlertType('Suspicious Transfer');
                  }
                }
              }}
              disabled={isSubmitting || isLoadingUsers}
            >
              <option value="">-- Choose active session to autofill --</option>
              {availableUsers.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Account Number</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Customer ID (Optional)</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter customer ID"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">Alert Type</label>
            <select
              className="form-input"
              value={alertType}
              onChange={(e) => setAlertType(e.target.value)}
              disabled={isSubmitting}
            >
              <option value="Account Takeover">Account Takeover</option>
              <option value="Mule Account Activity">Mule Account Activity</option>
              <option value="Suspicious Transfer">Suspicious Transfer</option>
              <option value="AML Review">AML Review</option>
              <option value="Unauthorized Access">Unauthorized Access</option>
            </select>
          </div>

          {error && (
            <div className="gap-item" style={{ backgroundColor: 'var(--color-error-bg)', borderColor: 'rgba(220, 38, 38, 0.15)', marginBottom: '1.5rem', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <ShieldAlert size={16} style={{ color: 'var(--color-error)' }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>{error}</span>
              </div>
              {!isDemoMode && (
                <button
                  type="button"
                  onClick={onAutoEnableDemoMode}
                  className="btn-secondary"
                  style={{
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.75rem',
                    color: 'var(--color-warning)',
                    borderColor: 'rgba(217, 119, 6, 0.3)',
                    backgroundColor: 'var(--color-warning-bg)',
                    marginTop: '0.25rem',
                    cursor: 'pointer'
                  }}
                >
                  Enable Demo Mode (Offline Sandbox)
                </button>
              )}
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
            <FileText size={18} />
            {isSubmitting ? 'Querying Systems...' : 'Generate Investigation Report'}
          </button>
        </form>
      </div>

      {/* Compliance Guidelines Banner (Core Principles) */}
      <div className="compliance-grid">
        <div className="compliance-card">
          <Cpu size={18} className="compliance-card-icon" style={{ color: 'var(--color-accent)' }} />
          <div>
            <h4 className="compliance-card-title">Passive Synthesis</h4>
            <p className="compliance-card-desc">AIS compiles logs and evidence. It does not classify risk or assign threat probabilities.</p>
          </div>
        </div>

        <div className="compliance-card">
          <UserCheck size={18} className="compliance-card-icon" style={{ color: 'var(--color-success)' }} />
          <div>
            <h4 className="compliance-card-title">Analyst Sovereignty</h4>
            <p className="compliance-card-desc">System actions are passive. Accounts are not locked and assets are not frozen by this AI.</p>
          </div>
        </div>

        <div className="compliance-card">
          <Eye size={18} className="compliance-card-icon" style={{ color: 'var(--color-info)' }} />
          <div>
            <h4 className="compliance-card-title">Full Traceability</h4>
            <p className="compliance-card-desc">Every statement matches database records. Analysts can audit the retrieval process in real-time.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigationInput;
