import React from 'react';
const Timeline = ({ events }) => {
  if (!events || events.length === 0) {
    return <p className="text-muted">No timeline reconstruction data available.</p>;
  }
  return (
    <div className="timeline-list">
      {events.map((item) => (
        <div key={item.id} className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-header">
            <span className="timeline-time">{item.time}</span>
            <span className="timeline-title">{item.event}</span>
          </div>
          {item.details && <p className="timeline-details">{item.details}</p>}
        </div>
      ))}
    </div>
  );
};
export default Timeline;
