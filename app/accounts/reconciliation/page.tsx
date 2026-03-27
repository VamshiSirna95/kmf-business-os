'use client'
import { useEffect, useRef, useState } from 'react'
import Navbar from '@/components/Navbar'
import DeptCard from '@/components/DeptCard'
import StatsSection from '@/components/StatsSection'
import type { StatItem } from '@/components/StatsSection'
import Footer from '@/components/Footer'

/* ───── Feature Strip ───── */
const FEATURES = [
  {
    title: 'S&D Recon',
    sub: 'Sales & distribution · 7 stores',
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
    title: 'BRS',
    sub: 'Bank reconciliation · Kotak',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L22 7V17L12 22L2 17V7L12 2Z" stroke="#30d158" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7 12l3 3 7-8" stroke="#30d158" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Vendor Recon',
    sub: '4 vendors tracked',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="#bf5af2" strokeWidth="1.5" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#bf5af2" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Daily Recon',
    sub: '9 days overdue',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="#ff9f0a" strokeWidth="1.5" />
        <path d="M3 9h18" stroke="#ff9f0a" strokeWidth="1.5" />
        <path d="M8 2v3M16 2v3" stroke="#ff9f0a" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Month Lock',
    sub: '3 months locked',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="11" width="18" height="11" rx="2" stroke="#30d158" strokeWidth="1.5" />
        <path d="M7 11V7a5 5 0 0110 0v4" stroke="#30d158" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

/* ───── Status Cards ───── */
const STATUS_CARDS = [
  {
    bg: 'linear-gradient(150deg,#0a1829,#112347)',
    border: 'rgba(41,151,255,0.15)',
    orb: '#2997ff',
    tag: 'This Month · Mar 2026',
    value: '5 / 7',
    sub: '2 stores still pending',
    color: '#2997ff',
  },
  {
    bg: 'linear-gradient(150deg,#1f0808,#2a0e0e)',
    border: 'rgba(255,69,58,0.15)',
    orb: '#ff453a',
    tag: 'Total Variance',
    value: '₹8,000',
    sub: 'Boduppal · within threshold',
    color: '#ff453a',
  },
  {
    bg: 'linear-gradient(150deg,#061a10,#0c2a18)',
    border: 'rgba(48,209,88,0.15)',
    orb: '#30d158',
    tag: 'Completed & Locked',
    value: '3',
    sub: 'Nov 25 · Dec 25 · Jan 26',
    color: '#30d158',
  },
  {
    bg: 'linear-gradient(150deg,#1a0818,#280d24)',
    border: 'rgba(191,90,242,0.15)',
    orb: '#bf5af2',
    tag: 'Daily Recon Overdue',
    value: '9 days',
    sub: 'Last run: 23 Mar 2026',
    color: '#bf5af2',
  },
]

/* ───── Month History Data ───── */
type DotColor = 'dg' | 'da' | 'dr' | 'dgr'
const DOT_STYLES: Record<DotColor, { bg: string; color: string }> = {
  dg: { bg: 'rgba(48,209,88,0.2)', color: '#30d158' },
  da: { bg: 'rgba(255,159,10,0.2)', color: '#ff9f0a' },
  dr: { bg: 'rgba(255,69,58,0.2)', color: '#ff453a' },
  dgr: { bg: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.2)' },
}

interface MonthData {
  month: string
  stores: { code: string; dot: DotColor }[]
  status: 'locked' | 'open'
  date: string
}

const MONTHS: MonthData[] = [
  {
    month: 'Mar 2026',
    stores: [
      { code: 'AM', dot: 'da' },
      { code: 'AT', dot: 'dr' },
      { code: 'BD', dot: 'da' },
      { code: 'KT', dot: 'dg' },
      { code: 'SP', dot: 'dg' },
      { code: 'AS', dot: 'dg' },
      { code: 'RS', dot: 'dr' },
    ],
    status: 'open',
    date: 'Running now',
  },
  {
    month: 'Feb 2026',
    stores: [
      { code: 'AM', dot: 'dg' },
      { code: 'AT', dot: 'dg' },
      { code: 'BD', dot: 'da' },
      { code: 'KT', dot: 'dg' },
      { code: 'SP', dot: 'dg' },
      { code: 'AS', dot: 'dg' },
      { code: 'RS', dot: 'dg' },
    ],
    status: 'locked',
    date: 'Closed 15 Mar',
  },
  {
    month: 'Jan 2026',
    stores: [
      { code: 'AM', dot: 'dg' },
      { code: 'AT', dot: 'dg' },
      { code: 'BD', dot: 'dg' },
      { code: 'KT', dot: 'dg' },
      { code: 'SP', dot: 'dg' },
      { code: 'AS', dot: 'dg' },
      { code: 'RS', dot: 'dg' },
    ],
    status: 'locked',
    date: 'Closed 12 Feb',
  },
  {
    month: 'Dec 2025',
    stores: [
      { code: 'AM', dot: 'dg' },
      { code: 'AT', dot: 'dg' },
      { code: 'BD', dot: 'dg' },
      { code: 'KT', dot: 'dg' },
      { code: 'SP', dot: 'da' },
      { code: 'AS', dot: 'dg' },
      { code: 'JH', dot: 'dgr' },
    ],
    status: 'locked',
    date: 'Closed 14 Jan',
  },
  {
    month: 'Nov 2025',
    stores: [
      { code: 'AM', dot: 'dg' },
      { code: 'AT', dot: 'dg' },
      { code: 'BD', dot: 'da' },
      { code: 'KT', dot: 'dg' },
      { code: 'SP', dot: 'dg' },
      { code: 'AS', dot: 'dg' },
      { code: 'JH', dot: 'dg' },
    ],
    status: 'locked',
    date: 'Closed 10 Dec',
  },
]

/* ───── Stats ───── */
const RECON_STATS: StatItem[] = [
  {
    id: 'phonepe',
    targetVal: 85,
    prefix: '',
    suffix: '%',
    label: 'PhonePe Match Rate · Feb 2026',
    delta: '↑ 71% improvement vs Jan',
    deltaColor: '#30d158',
    numColor: '#2997ff',
    sparkData: [14, 25, 38, 52, 60, 72, 80, 85],
    sparkColor: '#2997ff',
  },
  {
    id: 'variance',
    targetVal: 8,
    prefix: '₹',
    suffix: 'K',
    label: 'Total Cash Variance · Mar 2026',
    delta: 'Within acceptable threshold',
    deltaColor: '#30d158',
    numColor: '#ff9f0a',
    sparkData: [45, 38, 32, 28, 22, 18, 12, 8],
    sparkColor: '#ff9f0a',
  },
  {
    id: 'locked',
    targetVal: 3,
    prefix: '',
    suffix: '',
    label: 'Months Locked This FY',
    delta: 'Nov 25 · Dec 25 · Jan 26',
    deltaColor: '#30d158',
    numColor: '#30d158',
    sparkData: [0, 0, 1, 1, 2, 2, 3, 3],
    sparkColor: '#30d158',
  },
  {
    id: 'brs',
    targetVal: 67,
    prefix: '',
    suffix: '',
    label: 'BRS Entries Matched · Feb 2026',
    delta: '9 pre-existing unmatched',
    deltaColor: '#ff9f0a',
    numColor: '#2997ff',
    sparkData: [42, 48, 52, 56, 60, 63, 65, 67],
    sparkColor: '#2997ff',
  },
  {
    id: 'ratan',
    targetVal: 56,
    prefix: '',
    suffix: '',
    label: 'Ratan Creation Lines Matched',
    delta: '11 not matched · 10 disputed',
    deltaColor: '#ff9f0a',
    numColor: '#bf5af2',
    sparkData: [20, 28, 34, 40, 45, 50, 54, 56],
    sparkColor: '#bf5af2',
  },
  {
    id: 'daily-overdue',
    targetVal: 9,
    prefix: '',
    suffix: '',
    label: 'Daily Recon Days Overdue',
    delta: 'Last run was 23 Mar 2026',
    deltaColor: '#ff453a',
    numColor: '#ff453a',
    sparkData: [1, 2, 3, 4, 5, 6, 7, 9],
    sparkColor: '#ff453a',
  },
]

/* ═══════════════════════════════════════════ */

export default function ReconciliationPage() {
  const [heroVisible, setHeroVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const historyRef = useRef<HTMLDivElement>(null)
  const [sectionVisible, setSectionVisible] = useState(false)
  const [historyVisible, setHistoryVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSectionVisible(true); obs.disconnect() } },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const el = historyRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHistoryVisible(true); obs.disconnect() } },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <main style={{ background: '#000' }}>
      <Navbar />

      {/* ═══ SECTION 2 — Hero ═══ */}
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
              rgba(41,151,255,0.07) 0%,
              rgba(48,209,88,0.04) 40%,
              transparent 70%)`,
            animation: 'glowPulse 5s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'all 1s cubic-bezier(.22,1,.36,1)',
            padding: '0 24px',
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.45)', letterSpacing: 0.5, marginBottom: 14 }}>
            Accounts · KMFAccounts · Reconciliation
          </div>
          <div style={{ fontSize: 'clamp(40px, 6vw, 66px)', fontWeight: 700, letterSpacing: -3, lineHeight: 1, marginBottom: 18 }}>
            <div style={{ color: '#fff' }}>Every rupee.</div>
            <div style={{
              background: 'linear-gradient(135deg, #2997ff 0%, #5ac8ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Accounted for.
            </div>
          </div>
          <div style={{ fontSize: 17, fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, maxWidth: 520, margin: '0 auto 28px' }}>
            Store-wise reconciliation status, month history, variance tracking and sign-off management — all in one view.
          </div>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 28 }}>
            <span style={{ fontSize: 14, color: '#2997ff', cursor: 'pointer' }}>View History ›</span>
            <span style={{ fontSize: 14, cursor: 'pointer', color: 'rgba(255,255,255,0.3)' }}>Run Reconciliation ›</span>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.2)', fontSize: 20, animation: 'bounceDown 2s ease-in-out infinite' }}>↓</div>
      </section>

      {/* ═══ SECTION 3 — Feature Strip ═══ */}
      <div style={{ background: '#111', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              style={{
                padding: '20px 14px', textAlign: 'center',
                borderRight: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                cursor: 'pointer', transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ width: 28, height: 28, margin: '0 auto', marginBottom: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {f.icon}
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{f.title}</div>
              <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.3)', lineHeight: 1.4 }}>{f.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ SECTION 4 — Section Header ═══ */}
      <section style={{ background: '#000' }}>
        <div
          ref={sectionRef}
          style={{
            textAlign: 'center', padding: '64px 24px 40px',
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(.22,1,.36,1)',
          }}
        >
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(255,255,255,0.32)', marginBottom: 10 }}>
            Reconciliation Status
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.05, marginBottom: 12 }}>
            <div style={{ color: '#fff' }}>Seven stores.</div>
            <div style={{ background: 'linear-gradient(135deg, #2997ff, #5ac8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Every month.
            </div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.35)', maxWidth: 560, margin: '0 auto' }}>
            Real-time reconciliation health across all stores and all modules.
          </div>
        </div>

        {/* ═══ SECTION 5 — 4 Status Cards ═══ */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 60px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {STATUS_CARDS.map(card => (
            <div
              key={card.tag}
              style={{
                background: card.bg,
                border: `1px solid ${card.border}`,
                borderRadius: 16,
                minHeight: 130,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '18px 20px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s cubic-bezier(.22,1,.36,1)',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <div style={{
                position: 'absolute', top: -30, right: -30, width: 150, height: 150,
                borderRadius: '50%', background: card.orb, filter: 'blur(40px)', opacity: 0.2,
                pointerEvents: 'none',
              }} />
              <div style={{ fontSize: 10, fontWeight: 600, color: card.color, letterSpacing: 0.5, marginBottom: 8 }}>{card.tag}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: card.color, letterSpacing: -1, lineHeight: 1, marginBottom: 6 }}>{card.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{card.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 6 — Reconciliation History ═══ */}
      <section style={{ background: '#000', padding: '0 20px 60px' }}>
        <div
          ref={historyRef}
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            background: 'linear-gradient(150deg,#0a1829,#050d1a)',
            border: '1px solid rgba(41,151,255,0.12)',
            borderRadius: 20,
            padding: 28,
            opacity: historyVisible ? 1 : 0,
            transform: historyVisible ? 'scale(1)' : 'scale(0.97)',
            transition: 'all 0.7s cubic-bezier(.22,1,.36,1)',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#2997ff', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>
                Month-wise Status
              </div>
              <div style={{ fontSize: 26, fontWeight: 700, color: '#fff', letterSpacing: -0.5, marginBottom: 4 }}>
                Reconciliation History
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
                Each square = one store · Green = clean · Amber = variance · Red = unreconciled
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '5px 12px', borderRadius: 20, background: 'rgba(48,209,88,0.12)', color: '#30d158' }}>3 Locked</span>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '5px 12px', borderRadius: 20, background: 'rgba(255,159,10,0.12)', color: '#ff9f0a' }}>1 In Progress</span>
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 16, margin: '16px 0' }}>
            {[
              { label: 'Clean', bg: 'rgba(48,209,88,0.3)', color: '#30d158' },
              { label: 'Variance', bg: 'rgba(255,159,10,0.3)', color: '#ff9f0a' },
              { label: 'Unreconciled', bg: 'rgba(255,69,58,0.3)', color: '#ff453a' },
              { label: 'Inactive', bg: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' },
            ].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: l.bg }} />
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{l.label}</span>
              </div>
            ))}
          </div>

          {/* Month cells */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            {MONTHS.map(m => (
              <div
                key={m.month}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 10,
                  padding: 14,
                  border: '1px solid rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>
                  {m.month}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginBottom: 10 }}>
                  {m.stores.map(s => {
                    const ds = DOT_STYLES[s.dot]
                    return (
                      <div
                        key={s.code}
                        style={{
                          width: 22, height: 22, borderRadius: 4,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 7, fontWeight: 700,
                          background: ds.bg, color: ds.color,
                        }}
                      >
                        {s.code}
                      </div>
                    )
                  })}
                </div>
                <span style={{
                  fontSize: 9, fontWeight: 700, padding: '3px 9px', borderRadius: 10,
                  display: 'inline-flex',
                  background: m.status === 'locked' ? 'rgba(48,209,88,0.12)' : 'rgba(255,159,10,0.12)',
                  color: m.status === 'locked' ? '#30d158' : '#ff9f0a',
                }}>
                  {m.status === 'locked' ? 'Locked' : 'In Progress'}
                </span>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', marginTop: 5 }}>{m.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7 — Module Status Header ═══ */}
      <section style={{ background: '#000' }}>
        <div style={{ textAlign: 'center', padding: '40px 24px 40px' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(255,255,255,0.32)', marginBottom: 10 }}>
            Module Status
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.05, marginBottom: 12 }}>
            <div style={{ color: '#fff' }}>Four modules.</div>
            <div style={{ background: 'linear-gradient(135deg, #2997ff, #5ac8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              All tracked.
            </div>
          </div>
        </div>

        {/* ═══ SECTION 8 — 4 Module Cards (2x2) ═══ */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 80px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          <DeptCard
            id="sd-recon"
            eyebrow="Sales & Distribution"
            title="S&D Recon"
            subtitle="Feb 2026 · 7 active stores"
            tags={['S&D Recon', 'Feb 2026']}
            metrics={[
              { val: '85%', label: 'PhonePe matched', color: '#2997ff' },
              { val: '17%', label: 'Cash variance', color: '#ffd93d' },
              { val: '12', label: 'Unmatched', color: '#ff6b6b' },
            ]}
            ctaText="Open S&D Recon ›"
            accentColor="#2997ff"
            patternType="wave"
          />
          <DeptCard
            id="brs"
            eyebrow="Bank Reconciliation"
            title="BRS"
            subtitle="Kotak A/C 3550161634"
            tags={['BRS', 'Kotak']}
            metrics={[
              { val: '67', label: 'Matched', color: '#30d158' },
              { val: '9', label: 'Total runs', color: '#ffd93d' },
              { val: '9', label: 'Unmatched', color: '#ff6b6b' },
            ]}
            ctaText="Open BRS ›"
            accentColor="#30d158"
            patternType="grid"
          />
          <DeptCard
            id="vendor-recon"
            eyebrow="Vendor Reconciliation"
            title="Vendor Recon"
            subtitle="4 vendors configured"
            tags={['Vendor', 'Recon']}
            metrics={[
              { val: '56', label: 'Ratan matched', color: '#bf5af2' },
              { val: '8', label: 'Shivali matched', color: '#ffd93d' },
              { val: '2', label: 'Pending', color: '#ff6b6b' },
            ]}
            ctaText="Open Vendor Recon ›"
            accentColor="#bf5af2"
            patternType="blobs"
          />
          <DeptCard
            id="daily-recon"
            eyebrow="Daily Reconciliation"
            title="Daily Recon"
            subtitle="Last run: 23 Mar 2026"
            tags={['Daily', 'Recon']}
            metrics={[
              { val: '9', label: 'Days overdue', color: '#ff453a' },
              { val: '7', label: 'Stores tracked', color: '#ffd93d' },
              { val: '0', label: 'Alerts', color: '#30d158' },
            ]}
            ctaText="Open Daily Recon ›"
            accentColor="#ff453a"
            patternType="rings"
          />
        </div>
      </section>

      {/* ═══ SECTION 9 — Stats ═══ */}
      <StatsSection
        eyebrow="Reconciliation Metrics"
        title="Recon at a glance."
        stats={RECON_STATS}
      />

      {/* ═══ SECTION 10 — Footer ═══ */}
      <Footer />
    </main>
  )
}
