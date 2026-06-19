import React from 'react';
import { Cpu, UserCheck, Eye, ShieldAlert, Sparkles, Server, Lock, CheckCircle2 } from 'lucide-react';

const AboutView = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Header */}
      <div className="about-header">
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          About Agentic Investigation Suite (AIS)
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          An advanced, audit-ready evidence aggregation platform designed for corporate compliance and financial ledger analytics.
        </p>
      </div>

      {/* Primary Scope Cards */}
      <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="section-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--color-accent)' }}>
            <Cpu size={22} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Passive Synthesis</h3>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            AIS functions strictly as a data retrieval and compilation engine. The platform automatically aggregates security logs, transactional histories, device registries, and network metadata from connected core databases. AI agents compile and structure this evidence but do not make automatic risk judgements or decisions.
          </p>
        </div>

        <div className="section-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--color-success)' }}>
            <UserCheck size={22} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Analyst Sovereignty</h3>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            All operations executed by the system are strictly passive and read-only. The system does not freeze accounts, restrict transaction flows, lock customer credentials, or modify core ledger databases. The human investigator remains entirely in control and bears sole responsibility for final compliance actions.
          </p>
        </div>

        <div className="section-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--color-info)' }}>
            <Eye size={22} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Full Traceability</h3>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Every narrative statement, timeline event, and matching case record in compiled reports maps directly back to a logged source query statement. Analysts can verify the origin of each piece of evidence, view raw query logs, and examine the cryptographic integrity of retrieval trails.
          </p>
        </div>
      </div>

      {/* Compliance Notice Block */}
      <div className="section-card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          <ShieldAlert size={18} style={{ color: 'var(--color-warning)' }} />
          <span>System Declarations & Limitations</span>
        </div>
        <div className="compliance-grid" style={{ marginTop: 0, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 500 }}>
            <CheckCircle2 size={16} style={{ color: 'var(--color-success)' }} />
            <span>AI does not make decisions</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 500 }}>
            <CheckCircle2 size={16} style={{ color: 'var(--color-success)' }} />
            <span>AI does not predict fraud</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 500 }}>
            <CheckCircle2 size={16} style={{ color: 'var(--color-success)' }} />
            <span>AI does not freeze assets</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 500 }}>
            <CheckCircle2 size={16} style={{ color: 'var(--color-success)' }} />
            <span>Human analysts remain in charge</span>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="section-card">
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          Platform Specifications
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Server size={14} /> Connected Engines
            </span>
            <strong style={{ color: 'var(--text-primary)' }}>Central KYC DB, Core Ledger DB, Auth IAM DB</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Lock size={14} /> Security Standards
            </span>
            <strong style={{ color: 'var(--text-primary)' }}>AES-256 Storage, TLS 1.3 Transmission</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={14} /> Agent Protocol Version
            </span>
            <strong style={{ color: 'var(--text-primary)' }}>v2.4.1 (Verifiable Aggregation)</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
