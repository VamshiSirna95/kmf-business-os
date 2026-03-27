'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import DeptCard from '@/components/DeptCard'
import StatsSection from '@/components/StatsSection'
import type { StatItem } from '@/components/StatsSection'
import Footer from '@/components/Footer'

/* ───── Feature Strip (Accounts-specific) ───── */
const FEATURES = [
  {
    title: 'Reconciliation',
    sub: 'SD · BRS · Vendor · Daily',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="9" height="9" rx="2" fill="#2997ff" />
        <rect x="13" y="2" width="9" height="9" rx="2" fill="rgba(41,151,255,0.4)" />
        <rect x="2" y="13" width="9" height="9" rx="2" fill="rgba(41,151,255,0.4)" />
        <rect x="13" y="13" width="9" height="9" rx="2" fill="rgba(41,151,255,0.6)" />
      </svg>
    ),
  },
  {
    title: 'Payables',
    sub: 'Cash flow calendar',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#30d158" strokeWidth="1.5" />
        <path d="M9 12l2 2 4-4" stroke="#30d158" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'GST & TDS',
    sub: 'Compliance tracking',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#f59e0b" strokeWidth="1.5" />
        <path d="M3 10h18" stroke="#f59e0b" strokeWidth="1.5" />
        <path d="M7 15h4" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Bank Position',
    sub: 'Kotak + ICICI live',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#bf5af2" strokeWidth="1.5" />
        <path d="M12 6v6l4 2" stroke="#bf5af2" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Alerts',
    sub: '12 active alerts',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#ff453a" strokeWidth="1.5" />
        <path d="M12 8v4M12 16h.01" stroke="#ff453a" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

/* ───── Bank Position Cards ───── */
const BANK_CARDS = [
  {
    bg: 'linear-gradient(150deg,#0a1829,#112347)',
    border: 'rgba(41,151,255,0.15)',
    orb: '#2997ff',
    eyebrow: 'Kotak Bank · MGBT',
    value: '₹4,23,06,454',
    sub: 'Feb 2026 statement',
    color: '#2997ff',
  },
  {
    bg: 'linear-gradient(150deg,#140a04,#201008)',
    border: 'rgba(249,115,22,0.15)',
    orb: '#f97316',
    eyebrow: 'ICICI Bank · KMF',
    value: '₹1,84,32,100',
    sub: 'Feb 2026 statement',
    color: '#f97316',
  },
  {
    bg: 'linear-gradient(150deg,#061a10,#0c2a18)',
    border: 'rgba(48,209,88,0.15)',
    orb: '#30d158',
    eyebrow: 'Cash in Transit',
    value: '₹3,42,800',
    sub: '3 stores · oldest 2 days',
    color: '#30d158',
  },
  {
    bg: 'linear-gradient(150deg,#1f0808,#2a0e0e)',
    border: 'rgba(255,69,58,0.15)',
    orb: '#ff453a',
    eyebrow: 'Due Tomorrow',
    value: '₹18,72,800',
    sub: '5 payments scheduled',
    color: '#ff453a',
  },
]

/* ───── Stats ───── */
const ACCOUNT_STATS: StatItem[] = [
  {
    id: 'payables',
    targetVal: 684,
    prefix: '₹',
    suffix: 'L',
    label: 'Total Payables This Month',
    delta: '↑ 12% vs last month',
    deltaColor: '#ff453a',
    numColor: '#2997ff',
    sparkData: [18, 22, 28, 32, 38, 42, 45, 48],
    sparkColor: '#2997ff',
  },
  {
    id: 'overdue',
    targetVal: 45,
    prefix: '₹',
    suffix: 'L',
    label: 'Vendor Payments Overdue',
    delta: '3 vendors need attention',
    deltaColor: '#ff453a',
    numColor: '#ff453a',
    sparkData: [2, 3, 4, 4, 4, 4, 5, 4.5],
    sparkColor: '#ff453a',
  },
  {
    id: 'recurring',
    targetVal: 20,
    prefix: '',
    suffix: '',
    label: 'Recurring Payments Set Up',
    delta: 'Next due 28 Mar',
    deltaColor: '#30d158',
    numColor: '#30d158',
    sparkData: [18, 18, 19, 20, 20, 20, 20, 20],
    sparkColor: '#30d158',
  },
  {
    id: 'surplus',
    targetVal: 436,
    prefix: '₹',
    suffix: 'L',
    label: 'Projected Month Surplus',
    delta: '3 deficit days in April',
    deltaColor: '#30d158',
    numColor: '#bf5af2',
    sparkData: [38, 40, 41, 42, 43, 43, 43, 43.6],
    sparkColor: '#bf5af2',
  },
  {
    id: 'cheques',
    targetVal: 2,
    prefix: '',
    suffix: '',
    label: 'Cheques Pending Clearance',
    delta: '1 due tomorrow',
    deltaColor: '#ff9f0a',
    numColor: '#ff9f0a',
    sparkData: [0, 1, 2, 2, 2, 2, 2, 2],
    sparkColor: '#ff9f0a',
  },
  {
    id: 'vendor-calls',
    targetVal: 8,
    prefix: '',
    suffix: '',
    label: 'Vendor Calls This Week',
    delta: 'Ratan Creation called 4 times',
    deltaColor: '#ff453a',
    numColor: '#06b6d4',
    sparkData: [1, 2, 3, 4, 5, 6, 7, 8],
    sparkColor: '#06b6d4',
  },
]

export default function AccountsPage() {
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <main style={{ background: '#000' }}>
      <Navbar />

      {/* ═══ Hero ═══ */}
      <section
        style={{
          height: '100vh',
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: `radial-gradient(circle,
              rgba(41,151,255,0.09) 0%,
              rgba(41,151,255,0.04) 40%,
              transparent 70%)`,
            animation: 'glowPulse 5s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'all 1s cubic-bezier(.22,1,.36,1)',
            padding: '0 24px',
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: 0.5,
              marginBottom: 14,
            }}
          >
            Accounts · KMFAccounts
          </div>
          <div
            style={{
              fontSize: 'clamp(40px, 6vw, 66px)',
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1,
              marginBottom: 18,
            }}
          >
            <div style={{ color: '#fff' }}>Finance.</div>
            <div
              style={{
                background: 'linear-gradient(135deg, #2997ff 0%, #5ac8ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              In full control.
            </div>
          </div>
          <div
            style={{
              fontSize: 17,
              fontWeight: 300,
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.5,
              maxWidth: 520,
              margin: '0 auto 28px',
            }}
          >
            Reconciliation, payables, GST compliance and bank position — every
            financial metric in one place.
          </div>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 28 }}>
            <span style={{ fontSize: 14, color: '#2997ff', cursor: 'pointer' }}>
              Open KMFAccounts ›
            </span>
            <span style={{ fontSize: 14, cursor: 'pointer', color: 'rgba(255,255,255,0.3)' }}>
              View Reports ›
            </span>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.2)',
            fontSize: 20,
            animation: 'bounceDown 2s ease-in-out infinite',
          }}
        >
          ↓
        </div>
      </section>

      {/* ═══ Feature Strip ═══ */}
      <div
        style={{
          background: '#111',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              style={{
                padding: '20px 14px',
                textAlign: 'center',
                borderRight: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  margin: '0 auto',
                  marginBottom: 7,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {f.icon}
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 2 }}>
                {f.title}
              </div>
              <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.3)', lineHeight: 1.4 }}>
                {f.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ Section Header — Bank Position ═══ */}
      <section style={{ background: '#000' }}>
        <div style={{ textAlign: 'center', padding: '64px 24px 40px' }}>
          <div
            style={{
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: 1,
              color: 'rgba(255,255,255,0.32)',
              marginBottom: 10,
            }}
          >
            Financial Modules
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              marginBottom: 12,
            }}
          >
            <div style={{ color: '#fff' }}>Every number.</div>
            <div
              style={{
                background: 'linear-gradient(135deg, #2997ff, #5ac8ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Accounted for.
            </div>
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 300,
              color: 'rgba(255,255,255,0.35)',
              maxWidth: 560,
              margin: '0 auto',
            }}
          >
            Reconciliation, payables, compliance and cash — all in one place.
          </div>
        </div>

        {/* Bank Position Cards 2x2 */}
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 20px 60px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 10,
          }}
        >
          {BANK_CARDS.map(card => (
            <div
              key={card.eyebrow}
              style={{
                background: card.bg,
                border: `1px solid ${card.border}`,
                borderRadius: 20,
                padding: '24px 28px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s cubic-bezier(.22,1,.36,1)',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.01)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -40,
                  right: -40,
                  width: 160,
                  height: 160,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${card.orb}15, transparent 70%)`,
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: card.color,
                  letterSpacing: 0.5,
                  marginBottom: 8,
                }}
              >
                {card.eyebrow}
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: card.color,
                  letterSpacing: -1,
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {card.value}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{card.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Section Header — Modules ═══ */}
      <section style={{ background: '#000' }}>
        <div style={{ textAlign: 'center', padding: '40px 24px 40px' }}>
          <div
            style={{
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: 1,
              color: 'rgba(255,255,255,0.32)',
              marginBottom: 10,
            }}
          >
            Financial Modules
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              marginBottom: 12,
            }}
          >
            <div style={{ color: '#fff' }}>Six modules.</div>
            <div
              style={{
                background: 'linear-gradient(135deg, #2997ff, #5ac8ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              One view.
            </div>
          </div>
        </div>

        {/* 3x2 Module Cards */}
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 20px 80px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 10,
          }}
        >
          <DeptCard
            id="reconciliation"
            eyebrow="Reconciliation"
            title="S&D · BRS · Vendor · Daily"
            subtitle="Feb 2026 · 7 active stores"
            tags={['Accounts', 'Reconciliation']}
            metrics={[
              { val: '5/7', label: 'Recon done', color: '#2997ff' },
              { val: '₹32L', label: 'Payables due', color: '#ffd93d' },
              { val: '12', label: 'Alerts', color: '#ff6b6b' },
            ]}
            ctaText="Open Reconciliation ›"
            accentColor="#2997ff"
            patternType="wave"
            onClick={() => router.push('/accounts/reconciliation')}
          />
          <DeptCard
            id="payables"
            eyebrow="Payables"
            title="Cash Flow Calendar"
            subtitle="Payments · Vendors · Recurring"
            tags={['Payables', 'Cash Flow']}
            metrics={[
              { val: '₹18.7L', label: 'Due tomorrow', color: '#bf5af2' },
              { val: '4', label: 'Vendors selected', color: '#ffd93d' },
              { val: '3', label: 'Deficit days', color: '#ff6b6b' },
            ]}
            ctaText="Open Payables ›"
            accentColor="#bf5af2"
            patternType="hexdots"
            onClick={() => router.push('/accounts/payables')}
          />
          <DeptCard
            id="gst"
            eyebrow="GST & TDS"
            title="Compliance"
            subtitle="GSTR-1 · GSTR-3B · TDS returns"
            tags={['GST', 'Compliance']}
            metrics={[
              { val: '4', label: 'Filed', color: '#30d158' },
              { val: '2', label: 'Pending', color: '#ffd93d' },
              { val: '0', label: 'Overdue', color: '#ff6b6b' },
            ]}
            ctaText="Open GST & TDS ›"
            accentColor="#30d158"
            patternType="grid"
            onClick={() => router.push('/accounts/gst')}
          />
          <DeptCard
            id="cheques"
            eyebrow="Cheques"
            title="Issued Cheques"
            subtitle="Active · Pending · Cleared"
            tags={['Cheques', 'Payments']}
            metrics={[
              { val: '1', label: 'Due tomorrow', color: '#ff453a' },
              { val: '1', label: 'Pending', color: '#ffd93d' },
              { val: '3', label: 'Cleared', color: '#30d158' },
            ]}
            ctaText="View Cheques ›"
            accentColor="#06b6d4"
            patternType="blobs"
            onClick={() => router.push('/accounts/payables')}
          />
          <DeptCard
            id="transit"
            eyebrow="Cash Tracking"
            title="In Transit"
            subtitle="Collected · not yet deposited"
            tags={['Cash', 'Transit']}
            metrics={[
              { val: '₹3.4L', label: 'In transit', color: '#f59e0b' },
              { val: '3', label: 'Stores', color: '#ffd93d' },
              { val: '1', label: '2-day old', color: '#ff6b6b' },
            ]}
            ctaText="View Transit ›"
            accentColor="#f59e0b"
            patternType="zigzag"
          />
          <DeptCard
            id="tds"
            eyebrow="TDS"
            title="Tax Deducted"
            subtitle="194C · 194H · 194I · 194J"
            tags={['TDS', 'Tax']}
            metrics={[
              { val: '₹42K', label: 'This month', color: '#ff453a' },
              { val: '1', label: 'Deposit due', color: '#ffd93d' },
              { val: 'Q3', label: 'Filed', color: '#30d158' },
            ]}
            ctaText="Open TDS ›"
            accentColor="#ff453a"
            patternType="rings"
            onClick={() => router.push('/accounts/gst')}
          />
        </div>
      </section>

      {/* ═══ Stats ═══ */}
      <StatsSection
        eyebrow="Financial Metrics"
        title="Accounts at a glance."
        stats={ACCOUNT_STATS}
      />

      {/* ═══ Footer ═══ */}
      <Footer />
    </main>
  )
}
