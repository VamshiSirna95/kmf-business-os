export default function Footer() {
  return (
    <footer
      style={{
        background: '#000',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '40px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Left — branding */}
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.88)',
              letterSpacing: -0.2,
              marginBottom: 4,
            }}
          >
            KMF Business OS
          </div>
          <div
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.25)',
            }}
          >
            K.M. Fashions · Business Command Centre
          </div>
        </div>

        {/* Center — links */}
        <div style={{ display: 'flex', gap: 24 }}>
          {['Overview', 'Accounts', 'Warehouse', 'HR', 'Analytics'].map(
            link => (
              <span
                key={link}
                style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e =>
                  (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')
                }
                onMouseLeave={e =>
                  (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')
                }
              >
                {link}
              </span>
            ),
          )}
        </div>

        {/* Right — copyright */}
        <div
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.2)',
            textAlign: 'right',
          }}
        >
          <div>FY 2025–26</div>
          <div style={{ marginTop: 2 }}>
            © {new Date().getFullYear()} K.M. Fashions. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
