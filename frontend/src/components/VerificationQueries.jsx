import React from 'react';
import { Terminal, Database } from 'lucide-react';
const VerificationQueries = ({ queries }) => {
  if (!queries || queries.length === 0) {
    return <p className="text-muted">No database logs were recorded for this transaction.</p>;
  }
  return (
    <div className="queries-list">
      {queries.map((q, idx) => (
        <div key={q.id || idx} className="query-card animate-fade-in">
          <div className="query-card-header">
            <span className="query-source-tag">
              <Database size={12} style={{ color: 'var(--color-accent)', marginRight: '4px' }} />
              {q.source}
            </span>
            <span className="query-time">{q.timestamp}</span>
          </div>
          <div className="query-card-body">
            <div className="query-action">
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Operation:</span>{' '}
              <strong style={{ fontSize: '0.9rem' }}>{q.action}</strong>
            </div>
            {q.queryText && (
              <div style={{ marginTop: '0.5rem' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>RAW QUERY STATEMENT:</div>
                <pre className="query-code-block">{q.queryText}</pre>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default VerificationQueries;
