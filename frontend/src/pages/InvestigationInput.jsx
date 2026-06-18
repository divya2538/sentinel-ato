import React, { useState, useEffect } from 'react';
import { Search, ShieldAlert, Cpu, Sparkles, UserCheck, Eye, Database } from 'lucide-react';
import { fetchUsers } from '../api';

const InvestigationInput = ({ onSubmit, isSubmitting }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [alertType, setAlertType] = useState('Account Takeover');
  const [error, setError] = useState('');
  const [availableUsers, setAvailableUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchUsers()
      .then(users => {
        if (isMounted) {
          setAvailableUsers(users);
          setIsLoadingUsers(false);
        }
      })
      .catch(err => {
        console.error("Failed to load backend users:", err);
        if (isMounted) {
          setIsLoadingUsers(false);
        }
      });
    return () => { isMounted = false; };
  }, []);

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
                  setAccountNumber(val);
                  setCustomerId(val);
                  // Auto-set the best alertType based on the user
                  if (val === 'usr_compromised') {
                    setAlertType('Account Takeover');
                  } else if (val === 'usr_sanctioned') {
                    setAlertType('AML Review');
                  } else if (val === 'usr_normal') {
                    setAlertType('Unauthorized Access');
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
            <div className="gap-item" style={{ backgroundColor: 'var(--color-error-bg)', borderColor: 'rgba(239, 68, 68, 0.2)', marginBottom: '1.5rem' }}>
              <ShieldAlert size={16} style={{ color: 'var(--color-error)' }} />
              <span style={{ fontSize: '0.85rem' }}>{error}</span>
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
