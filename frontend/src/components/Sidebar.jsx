import React, { useState, useEffect } from 'react';
import { ShieldCheck, Search, FileText, CheckSquare, Terminal, Info, ToggleLeft, ToggleRight, Clock, User } from 'lucide-react';

const Sidebar = ({ currentTab, setTab, isDemoMode, onToggleDemoMode, hasReport }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentUtcTime = time.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

  return (
    <aside className="sidebar">
      {/* Brand area */}
      <div className="sidebar-brand-area">
        <a href="#" className="sidebar-logo" onClick={(e) => { e.preventDefault(); setTab('new-investigation'); }}>
          <ShieldCheck size={26} />
          <span>AIS</span>
        </a>
        <div className="sidebar-subtitle">Agentic Investigation Suite</div>
      </div>

      {/* Main menu */}
      <nav className="sidebar-menu">
        <button
          type="button"
          className={`sidebar-menu-btn ${currentTab === 'new-investigation' || currentTab === 'loading' ? 'active' : ''}`}
          onClick={() => setTab('new-investigation')}
        >
          <Search size={18} />
          <span>New Investigation</span>
        </button>

        <button
          type="button"
          className={`sidebar-menu-btn ${currentTab === 'reports' ? 'active' : ''} ${!hasReport ? 'disabled-menu-btn' : ''}`}
          onClick={() => {
            if (hasReport) setTab('reports');
            else alert("Please initiate a new investigation and compile a report first.");
          }}
          style={{ opacity: hasReport ? 1 : 0.6, cursor: hasReport ? 'pointer' : 'not-allowed' }}
        >
          <FileText size={18} />
          <span>Reports</span>
        </button>

        <button
          type="button"
          className={`sidebar-menu-btn ${currentTab === 'verification' ? 'active' : ''}`}
          onClick={() => {
            if (hasReport) setTab('verification');
            else alert("Please initiate a new investigation to verify queries.");
          }}
          style={{ opacity: hasReport ? 1 : 0.6, cursor: hasReport ? 'pointer' : 'not-allowed' }}
        >
          <CheckSquare size={18} />
          <span>Verification</span>
        </button>

        <button
          type="button"
          className={`sidebar-menu-btn ${currentTab === 'audit-trail' ? 'active' : ''}`}
          onClick={() => {
            if (hasReport) setTab('audit-trail');
            else alert("Please initiate a new investigation to see audit logs.");
          }}
          style={{ opacity: hasReport ? 1 : 0.6, cursor: hasReport ? 'pointer' : 'not-allowed' }}
        >
          <Terminal size={18} />
          <span>Audit Trail</span>
        </button>

        <button
          type="button"
          className={`sidebar-menu-btn ${currentTab === 'about' ? 'active' : ''}`}
          onClick={() => setTab('about')}
        >
          <Info size={18} />
          <span>About AIS</span>
        </button>
      </nav>

      {/* Footer metadata area */}
      <div className="sidebar-footer-area">
        {/* Demo Mode Toggle */}
        <div className="sidebar-demo-toggle-area">
          <span style={{ color: 'var(--text-secondary)' }}>Demo Mode Sandbox</span>
          <button 
            type="button"
            onClick={() => onToggleDemoMode()}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            title={isDemoMode ? "Disable Demo Mode to use real backend API" : "Enable Demo Mode to use local simulated sandbox data"}
          >
            {isDemoMode ? (
              <ToggleRight size={26} style={{ color: 'var(--color-warning)' }} />
            ) : (
              <ToggleLeft size={26} style={{ color: 'var(--text-muted)' }} />
            )}
          </button>
        </div>

        {/* Live system metadata */}
        <div className="sidebar-meta-card">
          <div className="sidebar-meta-row">
            <User size={13} style={{ color: 'var(--color-accent)' }} />
            <span>ID: <strong>AN-9921</strong> (Senior)</span>
          </div>
          <div className="sidebar-meta-row">
            <Clock size={13} />
            <span>{currentUtcTime}</span>
          </div>
          <div className="sidebar-meta-row" style={{ fontStyle: 'italic', fontSize: '0.7rem' }}>
            <span>Status: {isDemoMode ? 'Sandbox Mode' : 'Production API'}</span>
          </div>
        </div>

        <div className="sidebar-copyright">
          <div>© 2024 AIS. All rights reserved.</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem', marginTop: '0.15rem' }}>Secure. Traceable. Transparent.</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
