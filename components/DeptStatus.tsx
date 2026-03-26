'use client'
import { useEffect, useRef, useState } from 'react'

const DEPARTMENTS = [
  { name: 'Accounts', status: 'Synced', color: '#2997ff', time: '2 min ago' },
  { name: 'Warehouse · VASTRA', status: 'Synced', color: '#30d158', time: '1 min ago' },
  { name: 'HR & Attendance', status: 'Synced', color: '#ec4899', time: '5 min ago' },
  { name: 'Purchase', status: '3 Alerts', color: '#f59e0b', time: '8 min ago' },
  { name: 'Store Operations', status: 'Synced', color: '#06b6d4', time: 'Live' },
  { name: 'Management', status: '2 Pending', color: '#f97316', time: 'Now' },
]

export default function DeptStatus() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [leftVisible, setLeftVisible] = useState(false)
  const [rightVisible, setRightVisible] = useState(false)

  useEffect(() => {
    const el = leftRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLeftVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const el = rightRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRightVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section style={{ background: '#000', padding: '70px 24px' }}>
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          alignItems: 'center',
        }}
      >
        {/* Left side */}
        <div
          ref={leftRef}
          style={{
            opacity: leftVisible ? 1 : 0,
            transform: leftVisible ? 'translateX(0)' : 'translateX(-24px)',
            transition: 'all 0.9s cubic-bezier(.22,1,.36,1)',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.32)',
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginBottom: 10,
            }}
          >
            Department Status
          </div>

          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: -1.5,
              lineHeight: 1.1,
              marginBottom: 12,
            }}
          >
            <div style={{ color: '#fff' }}>Connected.</div>
            <div
              style={{
                background: 'linear-gradient(135deg, #2997ff, #5ac8ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Live.
            </div>
            <div style={{ color: '#fff' }}>Always.</div>
          </div>

          <div
            style={{
              fontSize: 13,
              fontWeight: 300,
              color: 'rgba(255,255,255,0.35)',
              lineHeight: 1.6,
              marginBottom: 18,
            }}
          >
            Every department syncs to this dashboard in real time.
            Accounts, warehouse, HR, purchase, stores and management
            — all connected, all live, all the time.
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#30d158',
                animation: 'navPulse 2s infinite',
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: '#30d158',
              }}
            >
              All systems operational
            </span>
          </div>
        </div>

        {/* Right side — Department status list */}
        <div
          ref={rightRef}
          style={{
            opacity: rightVisible ? 1 : 0,
            transform: rightVisible ? 'translateX(0)' : 'translateX(24px)',
            transition: 'all 0.9s cubic-bezier(.22,1,.36,1) 0.15s',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {DEPARTMENTS.map((dept, i) => (
            <div
              key={dept.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')
              }
              onMouseLeave={e =>
                (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')
              }
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: dept.color,
                    boxShadow: `0 0 8px ${dept.color}55`,
                  }}
                />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#fff',
                  }}
                >
                  {dept.name}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '3px 9px',
                    borderRadius: 20,
                    background: dept.color + '1a',
                    color: dept.color,
                  }}
                >
                  {dept.status}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    color: 'rgba(255,255,255,0.25)',
                    minWidth: 55,
                    textAlign: 'right',
                  }}
                >
                  {dept.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
