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
          <div key={index} className="similarity-item">
            <div className="similarity-item-left">
              <span className="similarity-id">{item.caseId}</span>
              <span className="similarity-notes">{item.notes}</span>
            </div>
            
            <div className="similarity-badge">
              <span className="similarity-metric">{item.similarity}</span>
              <span className="similarity-outcome" style={{
                color: item.outcome.includes("Fraud") ? 'var(--color-error)' : 'var(--color-success)'
              }}>
                {item.outcome}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SimilarCases;
