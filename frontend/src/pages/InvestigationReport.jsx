import React from 'react';
import { Eye, ChevronLeft, FileText, Activity, Layers, Database, ShieldAlert, Edit3 } from 'lucide-react';
import SectionCard from '../components/SectionCard';
import Timeline from '../components/Timeline';
import EvidenceInventory from '../components/EvidenceInventory';
import SimilarCases from '../components/SimilarCases';
import DataGaps from '../components/DataGaps';
import AnalystNotes from '../components/AnalystNotes';
const InvestigationReport = ({ report, onVerify, onBack }) => {
  if (!report) return null;
  return (
    <div className="animate-fade-in container" style={{ paddingBottom: '3rem' }}>
      {/* Report Navigation & Primary Headers */}
      <div className="report-header-section">
        <div className="report-title-area">
          <button 
            onClick={onBack} 
            className="btn-secondary" 
            style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', border: 'none', background: 'transparent', marginLeft: '-0.6rem', marginBottom: '0.5rem' }}
          >
            <ChevronLeft size={14} /> Back to Search
          </button>
          <h2>Report: {report.alertType}</h2>
          <div className="report-meta-grid">
            <span>Account: <strong>{report.accountNumber}</strong></span>
            <span>Customer ID: <strong>{report.customerId}</strong></span>
            <span>Alert State: <strong style={{ color: 'var(--color-warning)' }}>Flagged</strong></span>
          </div>
        </div>
        <div className="report-actions">
          <button onClick={onVerify} className="btn-primary" style={{ width: 'auto' }}>
            <Eye size={16} />
            Verify Investigation
          </button>
        </div>
      </div>
      {/* Primary Report Grid */}
      <div className="report-grid">
        {/* Main Column */}
        <div className="report-main-column">
          {/* Executive Summary */}
          <SectionCard title="Executive Summary" icon={<FileText size={16} />}>
            <p style={{ lineHeight: '1.7', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
              {report.executiveSummary}
            </p>
          </SectionCard>
          {/* Timeline Reconstruction */}
          <SectionCard title="Timeline Reconstruction" icon={<Activity size={16} />}>
            <Timeline events={report.timeline} />
          </SectionCard>
          {/* Evidence Inventory */}
          <SectionCard title="Evidence Inventory" icon={<Database size={16} />}>
            <EvidenceInventory items={report.evidence} />
          </SectionCard>
        </div>
        {/* Sidebar Column */}
        <div className="report-sidebar-column">
          {/* Similar Cases */}
          <SectionCard title="Historically Similar Cases" icon={<Layers size={16} />}>
            <SimilarCases cases={report.similarCases} alertType={report.alertType} />
          </SectionCard>
          {/* Data Gaps */}
          <SectionCard title="Data Gaps" icon={<ShieldAlert size={16} />}>
            <DataGaps gaps={report.dataGaps} />
          </SectionCard>
          {/* Analyst Review Section */}
          <SectionCard title="Analyst Review & Sign-Off" icon={<Edit3 size={16} />}>
            <AnalystNotes accountNumber={report.accountNumber} />
          </SectionCard>
        </div>
      </div>
    </div>
  );
};
export default InvestigationReport;
