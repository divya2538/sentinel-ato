import React from 'react';
import { Layers } from 'lucide-react';
const SimilarCases = ({ cases, alertType }) => {
  if (!cases || cases.length === 0) {
    return <p className="text-muted">No historical case matching records found.</p>;
  }
  // Calculate highest similarity
  const highestSim = cases[0]?.similarity || "0%";
  const confirmedCount = cases.filter(c => c.outcome === "Confirmed Fraud").length;
  return (
    <div className="similarity-container">
      <div className="compliance-banner" style={{ borderStyle: 'solid', background: 'rgba(59,130,246,0.04)', borderColor: 'var(--border-color)', margin: '0 0 1rem 0' }}>
        <Layers size={18} style={{ color: 'var(--color-accent)' }} />
        <div style={{ fontSize: '0.8rem' }}>
          <strong>Structural Match:</strong> Up to {highestSim} similarity matching with previous {alertType?.toLowerCase()} investigations.
        </div>
      </div>
      
      <div className="similarity-list">
        {cases.map((item, index) => (
          <div key={index} className="similarity-item" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'stretch', padding: '0.85rem 1rem' }}>
            {/* Row 1: Case ID/Acc No -------- Similarity */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="similarity-id" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{item.caseId}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-accent)', fontSize: '0.85rem' }}>{item.similarity} Match</span>
            </div>
            
            {/* Row 2: Past Outcome */}
            <div style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Past Outcome:</span>
              <strong style={{ 
                color: item.outcome.includes("Fraud") ? 'var(--color-error)' : 'var(--color-success)',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                {item.outcome}
              </strong>
            </div>

            {/* Row 3: Notes / Description */}
            <div className="similarity-notes" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.4rem', marginTop: '0.2rem' }}>
              {item.notes}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SimilarCases;
