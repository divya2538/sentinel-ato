import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import InvestigationInput from './pages/InvestigationInput';
import InvestigationReport from './pages/InvestigationReport';
import TransparencyView from './pages/TransparencyView';
import { generateReport } from './api';
import { ShieldAlert, Info, ShieldCheck } from 'lucide-react';
const App = () => {
  const [currentView, setCurrentView] = useState('input'); // 'input', 'loading', 'report'
  const [report, setReport] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transparencyOpen, setTransparencyOpen] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
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
    if (currentView === 'loading') {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev < loadingSteps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [currentView]);
  const handleStartInvestigation = async ({ accountNumber, customerId, alertType }) => {
    setIsSubmitting(true);
    setCurrentView('loading');
    try {
      const data = await generateReport(accountNumber, customerId, alertType);
      setReport(data);
      setCurrentView('report');
    } catch (err) {
      alert(err.message || "An error occurred during evidence gathering.");
      setCurrentView('input');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleBackToHome = () => {
    setReport(null);
    setCurrentView('input');
    setTransparencyOpen(false);
  };
  return (
    <div className="app-container">
      <Navbar onBackHome={handleBackToHome} />
      <main>
        {currentView === 'input' && (
          <InvestigationInput 
            onSubmit={handleStartInvestigation} 
            isSubmitting={isSubmitting} 
          />
        )}
        {currentView === 'loading' && (
          <div className="container" style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <div className="loading-container section-card animate-fade-in" style={{ maxWidth: '450px', width: '100%' }}>
              <div className="spinner"></div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Aggregating Dossier Data</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Connecting to Core Banking ledgers and verification points...
              </p>
              
              <div className="loading-steps">
                {loadingSteps.map((step, idx) => (
                  <div 
                    key={idx} 
                    className="loading-step-item"
                    style={{ 
                      opacity: idx === loadingStep ? 1 : idx < loadingStep ? 0.5 : 0.15,
                      color: idx === loadingStep ? 'var(--color-accent)' : idx < loadingStep ? 'var(--color-success)' : 'var(--text-muted)',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <span>{idx < loadingStep ? '✓' : idx === loadingStep ? '⚡' : '•'}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {currentView === 'report' && (
          <InvestigationReport 
            report={report} 
            onVerify={() => setTransparencyOpen(true)}
            onBack={handleBackToHome}
          />
        )}
      </main>
      {/* Global Regulatory Footer */}
      <footer className="disclaimer-banner">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            <ShieldAlert size={14} style={{ color: 'var(--color-accent)' }} />
            Regulatory Compliance Notice & System Declarations
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            The Agentic Investigation Suite (AIS) is designed exclusively as a passive evidence aggregation engine. 
            It executes queries to generate an audit-ready timeline and evidence inventory from existing systems for flagged accounts.
          </p>
          <div className="disclaimer-grid">
            <div className="disclaimer-item">
              <ShieldCheck size={14} /> AI does not make decisions
            </div>
            <div className="disclaimer-item">
              <ShieldCheck size={14} /> AI does not predict fraud
            </div>
            <div className="disclaimer-item">
              <ShieldCheck size={14} /> AI does not freeze accounts
            </div>
            <div className="disclaimer-item">
              <ShieldCheck size={14} /> Human analysts remain in control
            </div>
          </div>
        </div>
      </footer>
      {/* Transparency Overlay View */}
      <TransparencyView 
        report={report} 
        isOpen={transparencyOpen} 
        onClose={() => setTransparencyOpen(false)} 
      />
    </div>
  );
};
export default App;
