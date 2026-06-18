import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
const EvidenceInventory = ({ items }) => {
  if (!items || items.length === 0) {
    return <p className="text-muted">No evidence files generated.</p>;
  }
  return (
    <div className="evidence-grid">
      {items.map((item, index) => (
        <div key={index} className="evidence-row">
          <div className="evidence-left">
            <div className="evidence-status-badge verified">
              <CheckCircle2 size={12} />
              <span>Verified</span>
            </div>
            <div>
              <div className="evidence-title">{item.name}</div>
              <div className="evidence-source">Source: {item.source}</div>
            </div>
          </div>
          
          <div className="evidence-right">
            <div className="evidence-token">
              <ShieldCheck size={10} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
              {item.verificationToken}
            </div>
            <div className="evidence-source" style={{ fontSize: '0.7rem' }}>
              {item.date}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default EvidenceInventory;
