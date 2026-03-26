'use client'
import { useEffect, useState } from 'react'

export default function HeroSection() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section style={{
      height: '100vh', background: '#000',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Glow orb */}
      <div style={{
        position: 'absolute',
        width: 700, height: 700,
        borderRadius: '50%',
        background: `radial-gradient(circle,
          rgba(41,151,255,0.07) 0%,
          rgba(191,90,242,0.05) 35%,
          rgba(255,69,58,0.03) 60%,
          transparent 75%)`,
        animation: 'glowPulse 5s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1,
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateY(0)'
          : 'translateY(28px)',
        transition: 'all 1s cubic-bezier(.22,1,.36,1)',
        padding: '0 24px',
      }}>
        <div style={{
          fontSize: 12, fontWeight: 500,
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: 0.5, marginBottom: 14,
        }}>
          K.M. Fashions · Business Command Centre
          · FY 2025–26
        </div>

        <div style={{
          fontSize: 'clamp(40px, 6vw, 66px)',
          fontWeight: 700, letterSpacing: -3,
          lineHeight: 1, marginBottom: 18,
        }}>
          <div style={{ color: '#fff' }}>
            Every department.
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.4) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            One dashboard.
          </div>
        </div>

        <div style={{
          fontSize: 17, fontWeight: 300,
          color: 'rgba(255,255,255,0.45)',
          marginBottom: 28, lineHeight: 1.5,
          maxWidth: 520, margin: '0 auto 28px',
        }}>
          Accounts, warehouse, HR, purchase and
          store operations — your entire business,
          live in one place.
        </div>

        <div style={{
          display: 'flex', gap: 20,
          justifyContent: 'center',
          marginTop: 28,
        }}>
          <span style={{
            fontSize: 14, color: '#2997ff',
            cursor: 'pointer'
          }}>
            Open Dashboard ›
          </span>
          <span style={{
            fontSize: 14, cursor: 'pointer',
            color: 'rgba(255,255,255,0.3)',
          }}>
            View Analytics ›
          </span>
        </div>
      </div>

      {/* Scroll arrow */}
      <div style={{
        position: 'absolute', bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.2)',
        fontSize: 20,
        animation: 'bounceDown 2s ease-in-out infinite',
      }}>
        ↓
      </div>
    </section>
  )
}
