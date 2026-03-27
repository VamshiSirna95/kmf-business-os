'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const NAV_LINKS: { label: string; href: string }[] = [
  { label: 'Overview', href: '/' },
  { label: 'Accounts', href: '/accounts' },
  { label: 'Warehouse', href: '' },
  { label: 'HR', href: '' },
  { label: 'Purchase', href: '' },
  { label: 'Stores', href: '' },
  { label: 'Analytics', href: '' },
]

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [active, setActive] = useState('Overview')

  useEffect(() => {
    if (pathname.startsWith('/accounts')) setActive('Accounts')
    else setActive('Overview')
  }, [pathname])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 100, height: 44,
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      display: 'flex', alignItems: 'center',
      padding: '0 24px', gap: 16,
    }}>

      {/* Logo */}
      <div
        onClick={() => router.push('/')}
        style={{
          fontSize: 13, fontWeight: 600,
          color: 'rgba(255,255,255,0.88)',
          letterSpacing: -0.2, whiteSpace: 'nowrap',
          cursor: 'pointer',
        }}
      >
        KMF Business OS
      </div>

      {/* Nav links */}
      <div style={{
        display: 'flex', gap: 3, margin: '0 auto',
      }}>
        {NAV_LINKS.map(link => (
          <div
            key={link.label}
            onClick={() => {
              setActive(link.label)
              if (link.href) router.push(link.href)
            }}
            style={{
              fontSize: 11, padding: '5px 12px',
              borderRadius: 20, cursor: 'pointer',
              transition: 'all 0.2s',
              background: active === link.label
                ? 'rgba(255,255,255,0.1)'
                : 'transparent',
              color: active === link.label
                ? '#fff'
                : 'rgba(255,255,255,0.45)',
              fontWeight: active === link.label ? 500 : 400,
            }}
          >
            {link.label}
          </div>
        ))}
      </div>

      {/* Right side */}
      <div style={{ display: 'flex',
                    alignItems: 'center', gap: 8 }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: 5, fontSize: 11,
          color: 'rgba(255,255,255,0.32)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20, padding: '4px 10px',
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#30d158',
            animation: 'navPulse 2s infinite',
          }} />
          Live
        </div>
        <button style={{
          fontSize: 11, padding: '6px 14px',
          borderRadius: 20,
          background: 'rgba(255,255,255,0.92)',
          color: '#000', fontWeight: 600,
          border: 'none', cursor: 'pointer',
        }}>
          Vamshi S. ▾
        </button>
      </div>
    </nav>
  )
}
