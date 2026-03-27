'use client'
import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import StatsSection from '@/components/StatsSection'
import type { StatItem } from '@/components/StatsSection'
import Footer from '@/components/Footer'

/* ───── Feature strip items ───── */
const FEATURES = [
  {
    title: 'Cash Calendar',
    sub: 'Daily inflow vs outflow',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="#2997ff" strokeWidth="1.5" />
        <path d="M16 2v4M8 2v4M3 10h18" stroke="#2997ff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Due Tomorrow',
    sub: '₹18.7L · 5 payments',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#30d158" strokeWidth="1.5" />
        <path d="M12 6v6l4 2" stroke="#30d158" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Vendor Priority',
    sub: '4 selected · ₹11.6L',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L22 7V17L12 22L2 17V7L12 2Z" stroke="#bf5af2" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7 12l3 3 7-7" stroke="#bf5af2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Cheques',
    sub: '1 due tomorrow',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#f59e0b" strokeWidth="1.5" />
        <path d="M3 10h18" stroke="#f59e0b" strokeWidth="1.5" />
        <path d="M7 15h4" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Recurring',
    sub: '20 configured',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h16M4 18h10" stroke="#ff453a" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

/* ───── Summary Cards ───── */
const SUMMARY_CARDS = [
  {
    bg: 'linear-gradient(150deg,#0a1829,#112347)',
    border: 'rgba(41,151,255,0.15)',
    orb: '#2997ff',
    eyebrow: 'Opening Balance',
    value: '₹8,42,500',
    sub: '1 March 2026',
    color: '#2997ff',
  },
  {
    bg: 'linear-gradient(150deg,#061a10,#0c2a18)',
    border: 'rgba(48,209,88,0.15)',
    orb: '#30d158',
    eyebrow: 'Projected Inflow',
    value: '₹1.12Cr',
    sub: 'March sales estimate',
    color: '#30d158',
  },
  {
    bg: 'linear-gradient(150deg,#1f0808,#2a0e0e)',
    border: 'rgba(255,69,58,0.15)',
    orb: '#ff453a',
    eyebrow: 'Total Obligations',
    value: '₹68.4L',
    sub: '32 payments this month',
    color: '#ff453a',
  },
  {
    bg: 'linear-gradient(150deg,#15091f,#0c0514)',
    border: 'rgba(191,90,242,0.15)',
    orb: '#bf5af2',
    eyebrow: 'Projected Surplus',
    value: '₹43.6L',
    sub: 'End of March estimate',
    color: '#bf5af2',
  },
]

/* ───── Calendar Data ───── */
interface Obligation {
  type: string
  label: string
  amount: string
}

const PILL_COLORS: Record<string, { bg: string; color: string }> = {
  SALARY: { bg: 'rgba(236,72,153,0.2)', color: '#ec4899' },
  RENT: { bg: 'rgba(255,69,58,0.2)', color: '#ff453a' },
  UTILITY: { bg: 'rgba(245,158,11,0.2)', color: '#f59e0b' },
  CHIT: { bg: 'rgba(191,90,242,0.2)', color: '#bf5af2' },
  LOAN: { bg: 'rgba(255,100,100,0.2)', color: '#ff6b6b' },
  VENDOR: { bg: 'rgba(41,151,255,0.2)', color: '#2997ff' },
  CHEQUE: { bg: 'rgba(6,182,212,0.2)', color: '#06b6d4' },
  INSURANCE: { bg: 'rgba(255,69,58,0.2)', color: '#ff453a' },
  SERVICE: { bg: 'rgba(245,158,11,0.2)', color: '#f59e0b' },
}

const OBLIGATIONS: Record<number, Obligation[]> = {
  1: [
    { type: 'RENT', label: 'Rent all stores', amount: '₹6.8L' },
    { type: 'CHIT', label: 'Mahatru Chit', amount: '₹30K' },
    { type: 'INSURANCE', label: 'LIC', amount: '₹22K' },
  ],
  5: [{ type: 'LOAN', label: 'Loan EMI', amount: '₹1.25L' }],
  7: [{ type: 'SALARY', label: 'All Salaries', amount: '₹8.4L' }],
  10: [
    { type: 'UTILITY', label: 'HMWSSB Water', amount: '₹12K' },
    { type: 'CHIT', label: 'SBL Chit', amount: '₹92.8K' },
  ],
  15: [{ type: 'UTILITY', label: 'TSPDCL Electricity', amount: '₹1.85L' }],
  18: [{ type: 'INSURANCE', label: 'LIC Premium', amount: '₹45K' }],
  20: [{ type: 'SERVICE', label: 'Security Service', amount: '₹35K' }],
  25: [
    { type: 'VENDOR', label: 'Ratan Creation', amount: '₹4.5L' },
    { type: 'CHEQUE', label: 'Cheque #004820', amount: '₹2.1L' },
  ],
  28: [
    { type: 'SALARY', label: 'All Salaries', amount: '₹8.4L' },
    { type: 'CHEQUE', label: 'Cheque #004821', amount: '₹2.1L' },
    { type: 'RENT', label: 'Rent MGBODPL', amount: '₹95K' },
    { type: 'UTILITY', label: 'TSPDCL', amount: '₹1.85L' },
  ],
  30: [{ type: 'CHIT', label: 'Mahatru Chit', amount: '₹92.8K' }],
}

function getDailySales(dayOfWeek: number): number {
  if (dayOfWeek === 6) return 500000 // Saturday
  if (dayOfWeek === 0) return 450000 // Sunday
  return 350000 // Weekday
}

function parseAmount(s: string): number {
  const clean = s.replace(/[₹,]/g, '')
  if (clean.endsWith('Cr')) return parseFloat(clean) * 10000000
  if (clean.endsWith('L')) return parseFloat(clean) * 100000
  if (clean.endsWith('K')) return parseFloat(clean) * 1000
  return parseFloat(clean)
}

function formatShort(n: number): string {
  if (n >= 100000) return '₹' + (n / 100000).toFixed(1) + 'L'
  if (n >= 1000) return '₹' + (n / 1000).toFixed(0) + 'K'
  return '₹' + n.toFixed(0)
}

interface CalendarDay {
  day: number
  sales: number
  obligations: Obligation[]
  carry: number
  dayOfWeek: number
}

function buildCalendar(): CalendarDay[] {
  const days: CalendarDay[] = []
  let carry = 842500 // Opening balance
  // March 2026: March 1 is Sunday, offset=6 (Mon-Sun grid)
  for (let d = 1; d <= 31; d++) {
    // March 1, 2026 is Sunday => (d + 5) % 7: 0=Mon...6=Sun
    const dow = (d + 5) % 7 // 0=Mon, 1=Tue, ... 6=Sun
    const sales = getDailySales(dow >= 6 ? 0 : dow === 5 ? 6 : dow + 1)
    const obs = OBLIGATIONS[d] || []
    const totalObl = obs.reduce((s, o) => s + parseAmount(o.amount), 0)
    carry = carry + sales - totalObl
    days.push({ day: d, sales, obligations: obs, carry, dayOfWeek: dow })
  }
  return days
}

/* ───── Tomorrow & This Week payments ───── */
const TOMORROW_PAYMENTS = [
  { type: 'SALARY', label: 'All Salaries', amount: '₹8,40,000' },
  { type: 'CHEQUE', label: 'Cheque #004821', amount: '₹2,10,000' },
  { type: 'RENT', label: 'Rent MGBODPL', amount: '₹95,000' },
  { type: 'UTILITY', label: 'TSPDCL Electricity', amount: '₹1,85,000' },
  { type: 'INSURANCE', label: 'LIC Premium', amount: '₹42,800' },
]

const WEEK_PAYMENTS = [
  { type: 'SALARY', label: 'All Salaries (28th)', amount: '₹8,40,000' },
  { type: 'VENDOR', label: 'Ratan Creation (25th)', amount: '₹4,50,000' },
  { type: 'CHEQUE', label: 'Cheque #004820 (25th)', amount: '₹2,10,000' },
  { type: 'CHEQUE', label: 'Cheque #004821 (28th)', amount: '₹2,10,000' },
  { type: 'CHIT', label: 'Mahatru Chit (30th)', amount: '₹92,800' },
]

/* ───── Stats ───── */
const PAYABLE_STATS: StatItem[] = [
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

/* ═══════════════════════════════════════════ */

export default function PayablesPage() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const calendarDays = buildCalendar()
  const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const TODAY = 27

  // Build grid cells: offset 6 blank + 31 days
  const blanks = Array.from({ length: 6 }, (_, i) => ({ blank: true, key: `b${i}` }))

  function cellBg(d: CalendarDay) {
    if (d.day === TODAY) return 'rgba(41,151,255,0.08)'
    if (d.carry < 0) return 'rgba(255,69,58,0.08)'
    if (d.carry < 100000) return 'rgba(255,159,10,0.07)'
    if (d.carry > 500000) return 'rgba(48,209,88,0.07)'
    return 'rgba(255,255,255,0.03)'
  }

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
              rgba(191,90,242,0.08) 0%,
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
            Accounts · KMFAccounts · Payables
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
            <div style={{ color: '#fff' }}>Cash flow.</div>
            <div
              style={{
                background: 'linear-gradient(135deg, #bf5af2 0%, #5ac8ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Always clear.
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
            Every payment, every rupee, every due date — your complete payables
            picture in one view.
          </div>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 28 }}>
            <span style={{ fontSize: 14, color: '#2997ff', cursor: 'pointer' }}>
              View Calendar ›
            </span>
            <span style={{ fontSize: 14, cursor: 'pointer', color: 'rgba(255,255,255,0.3)' }}>
              Open KMFAccounts ›
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

      {/* ═══ Section Header ═══ */}
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
            Payables Overview
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
            <div style={{ color: '#fff' }}>Know what{"'"}s due.</div>
            <div
              style={{
                background: 'linear-gradient(135deg, #bf5af2, #5ac8ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Before it{"'"}s late.
            </div>
          </div>
        </div>

        {/* Summary Cards 2x2 */}
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
          {SUMMARY_CARDS.map(card => (
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

      {/* ═══ Cash Flow Calendar ═══ */}
      <section style={{ background: '#000', padding: '0 20px 60px' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            background: 'linear-gradient(150deg,#0a1829,#050d1a)',
            border: '1px solid rgba(41,151,255,0.12)',
            borderRadius: 20,
            padding: 28,
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: '#2997ff',
                  letterSpacing: 0.5,
                  marginBottom: 4,
                }}
              >
                Cash Flow Calendar
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: -1,
                }}
              >
                March 2026
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
                Daily sales vs obligations
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[
                  { label: 'Surplus', color: '#30d158' },
                  { label: 'Normal', color: 'rgba(255,255,255,0.3)' },
                  { label: 'Tight', color: '#ff9f0a' },
                  { label: 'Deficit', color: '#ff453a' },
                  { label: 'Today', color: '#2997ff' },
                ].map(l => (
                  <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 2,
                        background: l.color,
                        opacity: 0.6,
                      }}
                    />
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Day names */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 2,
              marginBottom: 2,
            }}
          >
            {DAY_NAMES.map(d => (
              <div
                key={d}
                style={{
                  textAlign: 'center',
                  fontSize: 9,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.3)',
                  padding: '6px 0',
                }}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 2,
            }}
          >
            {/* Blank cells for offset */}
            {blanks.map(b => (
              <div key={b.key} style={{ minHeight: 80 }} />
            ))}

            {/* Day cells */}
            {calendarDays.map(d => (
              <div
                key={d.day}
                style={{
                  background: cellBg(d),
                  borderRadius: 8,
                  padding: '6px 7px',
                  minHeight: 80,
                  border: d.day === TODAY ? '1px solid rgba(41,151,255,0.3)' : '1px solid transparent',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Day number + sales */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: d.day === TODAY ? '#2997ff' : '#fff',
                    }}
                  >
                    {d.day}
                  </span>
                  <span style={{ fontSize: 8, color: '#30d158', fontWeight: 500 }}>
                    +{formatShort(d.sales).replace('₹', '')}
                  </span>
                </div>

                {/* Obligation pills (max 2) */}
                {d.obligations.slice(0, 2).map((o, idx) => {
                  const pc = PILL_COLORS[o.type] || { bg: 'rgba(255,255,255,0.1)', color: '#fff' }
                  return (
                    <div
                      key={idx}
                      style={{
                        fontSize: 7.5,
                        fontWeight: 500,
                        background: pc.bg,
                        color: pc.color,
                        padding: '2px 5px',
                        borderRadius: 4,
                        marginBottom: 2,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {o.label} {o.amount}
                    </div>
                  )
                })}
                {d.obligations.length > 2 && (
                  <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)' }}>
                    +{d.obligations.length - 2} more
                  </div>
                )}

                {/* Carry forward */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 3,
                    right: 5,
                    fontSize: 7,
                    color: d.carry < 0 ? '#ff453a' : 'rgba(255,255,255,0.2)',
                    fontWeight: 500,
                  }}
                >
                  {formatShort(d.carry).replace('₹', 'C:')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Tomorrow + This Week Cards ═══ */}
      <section style={{ background: '#000', padding: '0 20px 80px' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
          }}
        >
          {/* Tomorrow */}
          <div
            style={{
              background: 'linear-gradient(150deg,#0a1829,#050d1a)',
              border: '1px solid rgba(41,151,255,0.12)',
              borderRadius: 20,
              padding: '24px 28px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -30,
                right: -30,
                width: 140,
                height: 140,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(41,151,255,0.1), transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: '#2997ff',
                letterSpacing: 0.5,
                marginBottom: 6,
              }}
            >
              Due Tomorrow · 28 Mar
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: '#fff',
                letterSpacing: -0.5,
                marginBottom: 16,
              }}
            >
              ₹18,72,800
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {TOMORROW_PAYMENTS.map((p, i) => {
                const pc = PILL_COLORS[p.type] || { bg: 'rgba(255,255,255,0.1)', color: '#fff' }
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 12px',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: 10,
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span
                        style={{
                          fontSize: 8,
                          fontWeight: 600,
                          padding: '2px 6px',
                          borderRadius: 4,
                          background: pc.bg,
                          color: pc.color,
                        }}
                      >
                        {p.type}
                      </span>
                      <span style={{ fontSize: 11, color: '#fff', fontWeight: 500 }}>
                        {p.label}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, color: '#fff', fontWeight: 600 }}>
                      {p.amount}
                    </span>
                  </div>
                )
              })}
            </div>
            <div style={{ marginTop: 16 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#2997ff',
                  cursor: 'pointer',
                }}
              >
                View Full Schedule ›
              </span>
            </div>
          </div>

          {/* This Week */}
          <div
            style={{
              background: 'linear-gradient(150deg,#15091f,#0c0514)',
              border: '1px solid rgba(191,90,242,0.12)',
              borderRadius: 20,
              padding: '24px 28px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -30,
                right: -30,
                width: 140,
                height: 140,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(191,90,242,0.1), transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: '#bf5af2',
                letterSpacing: 0.5,
                marginBottom: 6,
              }}
            >
              This Week · 24–31 Mar
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: '#fff',
                letterSpacing: -0.5,
                marginBottom: 16,
              }}
            >
              ₹43,15,600
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {WEEK_PAYMENTS.map((p, i) => {
                const pc = PILL_COLORS[p.type] || { bg: 'rgba(255,255,255,0.1)', color: '#fff' }
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 12px',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: 10,
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span
                        style={{
                          fontSize: 8,
                          fontWeight: 600,
                          padding: '2px 6px',
                          borderRadius: 4,
                          background: pc.bg,
                          color: pc.color,
                        }}
                      >
                        {p.type}
                      </span>
                      <span style={{ fontSize: 11, color: '#fff', fontWeight: 500 }}>
                        {p.label}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, color: '#fff', fontWeight: 600 }}>
                      {p.amount}
                    </span>
                  </div>
                )
              })}
            </div>
            <div style={{ marginTop: 16 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#bf5af2',
                  cursor: 'pointer',
                }}
              >
                Open Payables Module ›
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Stats ═══ */}
      <StatsSection
        eyebrow="Financial Metrics"
        title="Payables at a glance."
        stats={PAYABLE_STATS}
      />

      {/* ═══ Footer ═══ */}
      <Footer />
    </main>
  )
}
