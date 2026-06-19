import React from 'react';
import { ShieldCheck, UserCheck, Clock, FileText, ToggleLeft, ToggleRight } from 'lucide-react';
const Navbar = ({ onBackHome, isDemoMode, onToggleDemoMode }) => {
  const currentUtcTime = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <a href="#" className="navbar-brand" onClick={(e) => { e.preventDefault(); onBackHome(); }}>
          <ShieldCheck size={24} />
          <span>AIS</span> / Agentic Investigation Suite
        </a>
        
        <div className="navbar-meta">
          {/* Demo Mode Toggle */}
          <button 
            type="button"
            className="navbar-meta-item"
            onClick={() => onToggleDemoMode()}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: isDemoMode ? 'var(--color-warning-bg)' : 'transparent',
              border: isDemoMode ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid transparent',
              transition: 'var(--transition-smooth)'
            }}
            title={isDemoMode ? "Disable Demo Mode to use real backend API" : "Enable Demo Mode to use local simulated sandbox data"}
          >
            {isDemoMode ? (
              <span style={{ color: 'var(--color-warning)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span className="animate-pulse-slow">●</span> Demo Mode Active
              </span>
            ) : (
              <span style={{ color: 'var(--text-secondary)' }}>
                Demo Mode Offline
              </span>
            )}
            {isDemoMode ? (
              <ToggleRight size={20} style={{ color: 'var(--color-warning)' }} />
            ) : (
              <ToggleLeft size={20} style={{ color: 'var(--text-muted)' }} />
            )}
          </button>

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
            <span>{isDemoMode ? 'Sandbox Mode' : 'Draft Mode'}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
