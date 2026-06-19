import React from 'react';
import { Eye, ChevronLeft, FileText, Activity, Layers, Database, ShieldAlert, Edit3, Download, Info } from 'lucide-react';
import SectionCard from '../components/SectionCard';
import Timeline from '../components/Timeline';
import EvidenceInventory from '../components/EvidenceInventory';
import SimilarCases from '../components/SimilarCases';
import DataGaps from '../components/DataGaps';
import AnalystNotes from '../components/AnalystNotes';

const InvestigationReport = ({ report, onVerify, onBack }) => {
  if (!report) return null;

  // Map account numbers to exact mock report IDs to match screens
  const reportId = report.accountNumber.includes('9982736451') 
    ? 'INV-2024-00078' 
    : report.accountNumber.includes('8827310029') 
    ? 'INV-2024-00029' 
    : report.accountNumber.includes('7766554433') 
    ? 'INV-2024-00033' 
    : report.accountNumber.includes('5544332211') 
    ? 'INV-2024-00011' 
    : report.accountNumber.includes('3322119988') 
    ? 'INV-2024-00088' 
    : 'INV-2024-00001';

  const handleDownload = () => {
    // Premium mock report download
    const reportText = `AGENTIC INVESTIGATION REPORT\nReport ID: ${reportId}\nAccount Number: ${report.accountNumber}\nAlert Type: ${report.alertType}\nGenerated: ${report.generatedAt || new Date().toISOString()}\n\nExecutive Summary:\n${report.executiveSummary}\n\nSigned by Senior Investigator AN-9921`;
    const element = document.createElement("a");
    const file = new Blob([reportText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${reportId}_Report.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '3rem' }}>
      {/* Breadcrumb Navigation & Download */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div className="breadcrumb-area">
          <span>Investigation Reports</span> &gt; <strong style={{ color: 'var(--text-primary)' }}>{reportId}</strong>
        </div>
        <button type="button" onClick={handleDownload} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
          <Download size={14} />
          <span>Download Report</span>
        </button>
      </div>

      {/* Primary Headers */}
      <div className="report-header-section" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="report-title-area">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Investigation Report
            </h1>
            <span className="report-id-tag">{reportId}</span>
          </div>
          <div className="report-meta-grid" style={{ marginTop: '0.75rem' }}>
            <span>Account: <strong>{report.accountNumber}</strong></span>
            <span>Customer ID: <strong>{report.customerId}</strong></span>
            <span>Alert State: <strong style={{ color: 'var(--color-warning)' }}>Flagged</strong></span>
            <span>Generated: {new Date(report.generatedAt || new Date()).toLocaleString()}</span>
          </div>
        </div>
        
        <div className="header-info-badge">
          <Info size={15} style={{ color: 'var(--color-info)', flexShrink: 0 }} />
          <span>AI does not make decisions. Human analysts remain in control.</span>
        </div>
      </div>

      {/* Primary Report Grid */}
      <div className="report-grid">
        {/* Main Column */}
        <div className="report-main-column">
          {/* Executive Summary */}
          <SectionCard title="1. Executive Summary" icon={<FileText size={16} />}>
            <p style={{ lineHeight: '1.7', fontSize: '0.925rem', color: 'var(--text-primary)' }}>
              {report.executiveSummary}
            </p>
          </SectionCard>
          
          {/* Evidence Inventory */}
          <SectionCard title="3. Evidence Inventory" icon={<Database size={16} />}>
            <EvidenceInventory items={report.evidence} />
            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={onVerify} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                <Eye size={14} />
                <span>Verify Investigation Queries</span>
              </button>
            </div>
          </SectionCard>
        </div>

        {/* Sidebar Column */}
        <div className="report-sidebar-column">
          {/* Timeline Reconstruction */}
          <SectionCard title="2. Timeline Reconstruction" icon={<Activity size={16} />}>
            <Timeline events={report.timeline} />
          </SectionCard>
          
          {/* Similar Cases */}
          <SectionCard title="4. Historically Similar Cases" icon={<Layers size={16} />}>
            <SimilarCases cases={report.similarCases} alertType={report.alertType} />
          </SectionCard>
          
          {/* Data Gaps */}
          <SectionCard title="5. Data Gaps" icon={<ShieldAlert size={16} />}>
            <DataGaps gaps={report.dataGaps} />
          </SectionCard>
        </div>
      </div>

      {/* Analyst Review Section - Full Width */}
      <div style={{ marginTop: '2rem' }}>
        <SectionCard title="6. Analyst Notes" icon={<Edit3 size={16} />}>
          <AnalystNotes accountNumber={report.accountNumber} />
        </SectionCard>
      </div>
    </div>
  );
};

export default InvestigationReport;
