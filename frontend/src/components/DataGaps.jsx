import React from 'react';
import { AlertTriangle } from 'lucide-react';
const DataGaps = ({ gaps }) => {
  if (!gaps || gaps.length === 0) {
    return (
      <div className="evidence-status-badge verified" style={{ width: 'fit-content', padding: '0.4rem 0.8rem' }}>
        <span>No Data Gaps: All systems returned complete payloads.</span>
      </div>
    );
  }
  return (
    <div className="gaps-list">
      {gaps.map((gap, index) => (
        <div key={index} className="gap-item">
          <AlertTriangle size={16} className="gap-icon" />
          <div>
            <div className="gap-title">{gap.system}</div>
            <div className="gap-reason">{gap.reason}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default DataGaps;
