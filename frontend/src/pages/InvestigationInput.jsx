import React, { useState, useEffect } from 'react';
import { Search, ShieldAlert, Cpu, Sparkles, UserCheck, Eye, Database } from 'lucide-react';
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
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
      <div className="input-page-container">
        {isDemoMode && (
          <div className="compliance-banner" style={{ background: 'var(--color-warning-bg)', borderColor: 'var(--color-warning)', color: 'var(--text-primary)', marginBottom: '1.5rem', marginTop: '-0.5rem' }}>
            <Sparkles size={16} style={{ color: 'var(--color-warning)' }} />
            <div style={{ fontSize: '0.8rem' }}>
              <strong>Demo Sandbox Mode:</strong> Using simulated, offline compliance dossier data.
            </div>
          </div>
        )}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
            Initiate Automated Compilation
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Enter a flagged account number to construct an audit-ready dossier.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Select Flagged Session (From Database)</label>
            <select
              className="form-input"
              style={{ appearance: 'none', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat' }}
              onChange={(e) => {
                const val = e.target.value;
                if (val) {
                  const cleanVal = val.split(' ')[0];
                  setAccountNumber(cleanVal);
                  setCustomerId(cleanVal === 'usr_compromised' ? 'CUST-70891' : cleanVal === 'usr_sanctioned' ? 'CUST-99008' : cleanVal === 'usr_normal' ? 'CUST-44109' : cleanVal);
                  // Auto-set the best alertType based on the user
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
            <label className="form-label">Account Number / User ID</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. usr_compromised or 9982736451"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Customer ID <span style={{ color: 'var(--text-muted)' }}>(Optional)</span></label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. CUST-70891"
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
              style={{ appearance: 'none', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat' }}
            >
              <option value="Account Takeover">Account Takeover</option>
              <option value="Mule Account Activity">Mule Account Activity</option>
              <option value="Suspicious Transfer">Suspicious Transfer</option>
              <option value="AML Review">AML Review</option>
              <option value="Unauthorized Access">Unauthorized Access</option>
            </select>
          </div>
          {error && (
            <div className="gap-item" style={{ backgroundColor: 'var(--color-error-bg)', borderColor: 'rgba(239, 68, 68, 0.2)', marginBottom: '1.5rem', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <ShieldAlert size={16} style={{ color: 'var(--color-error)' }} />
                <span style={{ fontSize: '0.85rem' }}>{error}</span>
              </div>
              {!isDemoMode && (
                <button
                  type="button"
                  onClick={onAutoEnableDemoMode}
                  className="btn-secondary"
                  style={{
                    padding: '0.3rem 0.6rem',
                    fontSize: '0.75rem',
                    color: 'var(--color-warning)',
                    borderColor: 'rgba(245, 158, 11, 0.3)',
                    backgroundColor: 'rgba(245, 158, 11, 0.05)',
                    marginTop: '0.25rem',
                    cursor: 'pointer'
                  }}
                >
                  Enable Demo Mode (Offline Sandbox)
                </button>
              )}
            </div>
          )}
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            <Search size={18} />
            {isSubmitting ? 'Querying Systems...' : 'Generate Investigation Report'}
          </button>
        </form>
      </div>
      {/* Compliance Guidelines Banner (Core Principles) */}
      <div className="container" style={{ maxWidth: '800px', marginTop: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
            System Operating Scope & Principles
          </h3>
        </div>
        <div className="compliance-grid">
          <div className="compliance-card">
            <Cpu size={18} className="compliance-card-icon" style={{ color: 'var(--color-accent)' }} />
            <div>
              <h4 className="compliance-card-title">Passive Synthesis</h4>
              <p className="compliance-card-desc">AIS compiles logs and evidence. It does not classify risk or assign threat probabilities.</p>
            </div>
          </div>
          <div className="compliance-card">
            <UserCheck size={18} className="compliance-card-icon" />
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
    </div>
  );
};
export default InvestigationInput;
