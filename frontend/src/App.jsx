import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import InvestigationInput from './pages/InvestigationInput';
import InvestigationReport from './pages/InvestigationReport';
import VerificationView from './pages/VerificationView';
import AuditTrailView from './pages/AuditTrailView';
import AboutView from './pages/AboutView';
import { generateReport } from './api';
import { FileText, Eye, Terminal } from 'lucide-react';

const App = () => {
  const [isDemoMode, setIsDemoMode] = useState(() => {
    return localStorage.getItem('ais_demo_mode') === 'true';
  });
  const [currentTab, setCurrentTab] = useState('new-investigation'); // 'new-investigation', 'loading', 'reports', 'verification', 'audit-trail', 'about'
  const [report, setReport] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const handleToggleDemoMode = (value) => {
    const newValue = typeof value === 'boolean' ? value : !isDemoMode;
    setIsDemoMode(newValue);
    localStorage.setItem('ais_demo_mode', String(newValue));
  };

  // Loading animation sequence messages
  const loadingSteps = [
    "Establishing secure gateway connection...",
    "Querying Central KYC database...",
    "Retrieving transaction history ledger...",
    "Fetching mobile device registry & access logs...",
    "Scanning historical case library for structural similarity...",
    "Generating report & verification signatures..."
  ];

  useEffect(() => {
    let interval;
    if (currentTab === 'loading') {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev < loadingSteps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 400);
    }
    return () => clearInterval(interval);
  }, [currentTab]);

  const handleStartInvestigation = async ({ accountNumber, customerId, alertType }) => {
    setIsSubmitting(true);
    setCurrentTab('loading');
    try {
      const data = await generateReport(accountNumber, customerId, alertType);
      setReport(data);
      setCurrentTab('reports');
    } catch (err) {
      alert(err.message || "An error occurred during evidence gathering.");
      setCurrentTab('new-investigation');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToHome = () => {
    setReport(null);
    setCurrentTab('new-investigation');
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentTab={currentTab} 
        setTab={setCurrentTab} 
        isDemoMode={isDemoMode} 
        onToggleDemoMode={handleToggleDemoMode} 
        hasReport={!!report}
      />

      {/* Main Content Area */}
      <main className="main-content">
        <div className="content-inner animate-fade-in">
          {/* Tab switching logic */}
          {currentTab === 'new-investigation' && (
            <InvestigationInput 
              onSubmit={handleStartInvestigation} 
              isSubmitting={isSubmitting} 
              isDemoMode={isDemoMode}
              onAutoEnableDemoMode={() => handleToggleDemoMode(true)}
            />
          )}

          {currentTab === 'loading' && (
            <div className="loading-container animate-fade-in">
              <div className="spinner"></div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Aggregating Dossier Data
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Connecting to Core Banking ledgers and verification points...
              </p>
              
              <div className="loading-steps">
                {loadingSteps.map((step, idx) => (
                  <div 
                    key={idx} 
                    className="loading-step-item"
                    style={{ 
                      opacity: idx === loadingStep ? 1 : idx < loadingStep ? 0.6 : 0.2,
                      color: idx === loadingStep ? 'var(--color-accent)' : idx < loadingStep ? 'var(--color-success)' : 'var(--text-muted)',
                      transition: 'var(--transition-smooth)',
                      fontWeight: idx === loadingStep ? 600 : 400
                    }}
                  >
                    <span>{idx < loadingStep ? '✓' : idx === loadingStep ? '⚡' : '•'}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentTab === 'reports' && (
            report ? (
              <InvestigationReport 
                report={report} 
                onVerify={() => setCurrentTab('verification')}
                onBack={handleBackToHome}
              />
            ) : (
              <div className="empty-state animate-fade-in">
                <FileText size={48} />
                <h3>No Active Investigation Report</h3>
                <p>Please initiate a query and run a compile sequence first to view reports.</p>
                <button type="button" className="btn-primary" onClick={() => setCurrentTab('new-investigation')}>
                  Start New Investigation
                </button>
              </div>
            )
          )}

          {currentTab === 'verification' && (
            report ? (
              <VerificationView 
                report={report} 
                onBack={() => setCurrentTab('reports')} 
                onGoToAudit={() => setCurrentTab('audit-trail')}
              />
            ) : (
              <div className="empty-state animate-fade-in">
                <Eye size={48} />
                <h3>No Verification Data</h3>
                <p>Run a query to view real-time database query verification tokens.</p>
                <button type="button" className="btn-primary" onClick={() => setCurrentTab('new-investigation')}>
                  Start New Investigation
                </button>
              </div>
            )
          )}

          {currentTab === 'audit-trail' && (
            report ? (
              <AuditTrailView 
                report={report} 
                onBack={() => setCurrentTab('verification')} 
              />
            ) : (
              <div className="empty-state animate-fade-in">
                <Terminal size={48} />
                <h3>No Audit Trail Records</h3>
                <p>System operational logs are compiled chronologically during active runs.</p>
                <button type="button" className="btn-primary" onClick={() => setCurrentTab('new-investigation')}>
                  Start New Investigation
                </button>
              </div>
            )
          )}

          {currentTab === 'about' && (
            <AboutView />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
