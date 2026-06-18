import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Terminal } from 'lucide-react';
const AuditTrail = ({ logs }) => {
  const [isOpen, setIsOpen] = useState(false);
  if (!logs || logs.length === 0) {
    return <p className="text-muted">No system logs available.</p>;
  }
  return (
    <div className="audit-accordion">
      <button 
        type="button"
        className="audit-accordion-trigger" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Terminal size={14} style={{ color: 'var(--color-accent)' }} />
          Show Full Audit Trail
        </span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && (
        <div className="audit-logs-wrapper animate-slide-up">
          {logs.map((log, index) => (
            <div key={index} className={`audit-log-line ${log.level || 'info'}`}>
              <span className="audit-log-time">[{log.timestamp}]</span>
              <span className="audit-log-msg">{log.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default AuditTrail;
