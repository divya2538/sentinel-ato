import React from 'react';
import { ShieldCheck, UserCheck, Clock, FileText } from 'lucide-react';
const Navbar = ({ onBackHome }) => {
  const currentUtcTime = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <a href="#" className="navbar-brand" onClick={(e) => { e.preventDefault(); onBackHome(); }}>
          <ShieldCheck size={24} />
          <span>AIS</span> / Agentic Investigation Suite
        </a>
        
        <div className="navbar-meta">
          <div className="navbar-meta-item">
            <UserCheck size={14} className="compliance-card-icon" />
            <span>ID: <strong>AN-9921</strong> (Senior Investigator)</span>
          </div>
          <div className="navbar-meta-item">
            <Clock size={14} />
            <span>{currentUtcTime}</span>
          </div>
          <div className="navbar-meta-item">
            <FileText size={14} />
            <span>Draft Mode</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
