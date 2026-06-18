import React from 'react';
const SectionCard = ({ title, icon, rightElement, children }) => {
  return (
    <div className="section-card animate-fade-in">
      <div className="section-card-header">
        <h3 className="section-card-title">
          {icon && <span className="section-card-icon-wrapper">{icon}</span>}
          {title}
        </h3>
        {rightElement && <div className="section-card-right">{rightElement}</div>}
      </div>
      <div className="section-card-body">
        {children}
      </div>
    </div>
  );
};
export default SectionCard;
