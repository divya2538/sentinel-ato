import React, { useState } from 'react';
import { Edit2, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { saveAnalystNotes } from '../api';
const AnalystNotes = ({ accountNumber }) => {
  const [notes, setNotes] = useState('');
  const [signature, setSignature] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState('');
  const handleCommit = async (e) => {
    e.preventDefault();
    if (!notes.trim()) {
      setError('Please add analyst findings before signing.');
      return;
    }
    if (!signature.trim()) {
      setError('Signature (Name/ID) is required to commit findings.');
      return;
    }
    setError('');
    setIsSaving(true);
    try {
      const result = await saveAnalystNotes(accountNumber, notes, signature);
      if (result.status === 'success') {
        setReceipt(result);
      }
    } catch (err) {
      setError('Failed to log review. Please check network logs.');
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div>
      {receipt ? (
        <div className="notes-committed animate-fade-in">
          <div className="notes-status" style={{ marginBottom: '1rem' }}>
            <CheckCircle2 size={16} />
            <span>Findings Signed & Commited to Immutable Audit File</span>
          </div>
          <div className="evidence-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '0.5rem' }}>
            <div>
              <strong style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>FIRM SIGNATURE:</strong>
              <div style={{ fontSize: '0.9rem', fontStyle: 'italic', margin: '0.25rem 0' }}>{signature}</div>
            </div>
            <div>
              <strong style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>INVESTIGATION NOTES:</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{notes}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
              <span className="evidence-source">Receipt: <strong>{receipt.receipt}</strong></span>
              <span className="evidence-source">Timestamp: {new Date(receipt.timestamp).toLocaleTimeString()} UTC</span>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleCommit} className="animate-fade-in">
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label className="form-label">Investigation Findings</label>
            <textarea
              className="notes-textarea"
              placeholder="Detail your findings here... (e.g. verified with customer, confirmed transaction pattern match, recommended closure)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isSaving}
            />
          </div>
          
          <div className="analyst-signature-row">
            <div style={{ flex: 1 }}>
              <label className="form-label">Analyst Signature (Full Name / ID)</label>
              <input
                type="text"
                className="analyst-signature-input"
                placeholder="e.g. Jane Doe / AN-9921"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                disabled={isSaving}
              />
            </div>
            
            <button
              type="submit"
              className="btn-primary"
              style={{ width: 'auto', marginTop: '1.4rem', height: '38px', padding: '0 1.5rem' }}
              disabled={isSaving}
            >
              <Edit2 size={14} />
              {isSaving ? 'Signing...' : 'Sign & Log Report'}
            </button>
          </div>
          
          {error && (
            <div className="gap-item" style={{ backgroundColor: 'var(--color-error-bg)', borderColor: 'rgba(239, 68, 68, 0.2)', padding: '0.5rem 1rem', marginTop: '1rem' }}>
              <ShieldAlert size={14} style={{ color: 'var(--color-error)' }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>{error}</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
};
export default AnalystNotes;
