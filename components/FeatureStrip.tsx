const FEATURES = [
  {
    title: 'Accounts',
    sub: 'Recon, payables & GST',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="9" height="9" rx="2" fill="#2997ff"/>
        <rect x="13" y="2" width="9" height="9" rx="2" fill="rgba(41,151,255,0.4)"/>
        <rect x="2" y="13" width="9" height="9" rx="2" fill="rgba(41,151,255,0.4)"/>
        <rect x="13" y="13" width="9" height="9" rx="2" fill="rgba(41,151,255,0.6)"/>
      </svg>
    ),
  },
  {
    title: 'Warehouse',
    sub: 'VASTRA stock & inventory',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="20" height="14" rx="2" stroke="#30d158" strokeWidth="1.5"/>
        <path d="M8 7V5a2 2 0 014 0v2" stroke="#30d158" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 13h6M12 11v4" stroke="#30d158" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'HR',
    sub: 'Attendance & salary',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="#ec4899" strokeWidth="1.5"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Purchase',
    sub: 'Orders & deliveries',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M3 6h18" stroke="#f59e0b" strokeWidth="1.5"/>
        <path d="M16 10a4 4 0 01-8 0" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Store Ops',
    sub: 'Sales targets & staff',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#06b6d4" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 22V12h6v10" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Approvals',
    sub: 'Pending decisions',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L22 7V17L12 22L2 17V7L12 2Z" stroke="#f97316" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M7 12l3 3 7-7" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function FeatureStrip() {
  return (
    <div style={{
      background: '#111',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
      }}>
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            style={{
              padding: '20px 14px', textAlign: 'center',
              borderRight: i < 5
                ? '1px solid rgba(255,255,255,0.06)'
                : 'none',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e =>
              (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')
            }
            onMouseLeave={e =>
              (e.currentTarget.style.background = 'transparent')
            }
          >
            <div style={{
              width: 28, height: 28,
              margin: '0 auto', marginBottom: 7,
              display: 'flex', alignItems: 'center',
              justifyContent: 'center',
            }}>
              {f.icon}
            </div>
            <div style={{
              fontSize: 12, fontWeight: 600,
              color: '#fff', marginBottom: 2,
            }}>
              {f.title}
            </div>
            <div style={{
              fontSize: 9.5,
              color: 'rgba(255,255,255,0.3)',
              lineHeight: 1.4,
            }}>
              {f.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
