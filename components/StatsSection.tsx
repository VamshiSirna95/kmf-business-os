'use client'
import { useEffect, useRef, useState } from 'react'

const STATS = [
  {
    id: 'sales',
    targetVal: 142,
    prefix: '₹',
    suffix: 'L',
    label: "Today's Sales · All 7 Stores",
    delta: '↑ 8.4% vs yesterday',
    deltaColor: '#30d158',
    numColor: '#fff',
    sparkData: [8, 10, 12, 11, 14, 13, 15, 14],
    sparkColor: '#30d158',
  },
  {
    id: 'bank',
    targetVal: 423,
    prefix: '₹',
    suffix: 'L',
    label: 'Bank Balance · Kotak Feb 2026',
    delta: 'Updated today',
    deltaColor: '#2997ff',
    numColor: '#2997ff',
    sparkData: [38, 40, 41, 42, 42, 42, 42, 42],
    sparkColor: '#2997ff',
  },
  {
    id: 'vendors',
    targetVal: 324,
    prefix: '₹',
    suffix: 'L',
    label: 'Vendor Payments Due This Week',
    delta: '3 critical overdue',
    deltaColor: '#ff453a',
    numColor: '#ff453a',
    sparkData: [18, 22, 28, 32, 32, 32, 32, 32],
    sparkColor: '#ff453a',
  },
  {
    id: 'attendance',
    targetVal: 84,
    prefix: '',
    suffix: '%',
    label: 'Staff Attendance Today · 106 staff',
    delta: '17 absent today',
    deltaColor: '#ffd93d',
    numColor: '#ec4899',
    sparkData: [88, 86, 85, 84, 84, 84, 84, 84],
    sparkColor: '#ec4899',
  },
  {
    id: 'stock',
    targetVal: 12,
    prefix: '',
    suffix: '',
    label: 'Stock Reorder Alerts · VASTRA',
    delta: 'Action needed now',
    deltaColor: '#ff453a',
    numColor: '#f59e0b',
    sparkData: [6, 8, 9, 10, 11, 12, 12, 12],
    sparkColor: '#f59e0b',
  },
  {
    id: 'approvals',
    targetVal: 7,
    prefix: '',
    suffix: '',
    label: 'Pending Owner Approvals',
    delta: '2 urgent today',
    deltaColor: '#ffd93d',
    numColor: '#f97316',
    sparkData: [3, 4, 5, 6, 7, 7, 7, 7],
    sparkColor: '#f97316',
  },
]

function StatCell({ stat }: { stat: (typeof STATS)[0] }) {
  const [displayed, setDisplayed] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const cellRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Counter animation with IntersectionObserver
  useEffect(() => {
    const el = cellRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          obs.disconnect()
          const duration = 1400
          const start = performance.now()
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - t, 3)
            setDisplayed(Math.round(stat.targetVal * eased))
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [hasAnimated, stat.targetVal])

  // Sparkline canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    const W = rect.width || canvas.offsetWidth
    const H = rect.height || canvas.offsetHeight
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.scale(dpr, dpr)

    const data = stat.sparkData
    const n = data.length
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1

    let t = 0
    let animId: number

    const draw = () => {
      t += 0.01
      ctx.clearRect(0, 0, W, H)

      // Calculate points
      const pts = data.map((v, i) => ({
        x: i * (W / (n - 1)),
        y: H - 2 - ((v - min) / range) * (H - 4) + Math.sin(t + i * 0.5) * 1,
      }))

      // Draw filled area
      ctx.beginPath()
      ctx.moveTo(pts[0].x, pts[0].y)
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1]
        const cur = pts[i]
        const cpx = (prev.x + cur.x) / 2
        ctx.bezierCurveTo(cpx, prev.y, cpx, cur.y, cur.x, cur.y)
      }
      ctx.lineTo(W, H)
      ctx.lineTo(0, H)
      ctx.closePath()
      const grad = ctx.createLinearGradient(0, 0, 0, H)
      grad.addColorStop(0, stat.sparkColor + '44')
      grad.addColorStop(1, stat.sparkColor + '00')
      ctx.fillStyle = grad
      ctx.fill()

      // Draw line
      ctx.beginPath()
      ctx.moveTo(pts[0].x, pts[0].y)
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1]
        const cur = pts[i]
        const cpx = (prev.x + cur.x) / 2
        ctx.bezierCurveTo(cpx, prev.y, cpx, cur.y, cur.x, cur.y)
      }
      ctx.strokeStyle = stat.sparkColor
      ctx.lineWidth = 1.5
      ctx.stroke()

      animId = requestAnimationFrame(draw)
    }
    animId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animId)
  }, [stat.sparkData, stat.sparkColor])

  return (
    <div
      ref={cellRef}
      style={{
        padding: '18px 20px',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Sparkline canvas behind content */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50%',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: stat.numColor,
            letterSpacing: -1,
            lineHeight: 1,
            marginBottom: 4,
          }}
        >
          {stat.prefix}
          {displayed}
          {stat.suffix}
        </div>
        <div
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.45)',
            marginBottom: 4,
            lineHeight: 1.3,
          }}
        >
          {stat.label}
        </div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 500,
            color: stat.deltaColor,
          }}
        >
          {stat.delta}
        </div>
      </div>
    </div>
  )
}

export interface StatItem {
  id: string
  targetVal: number
  prefix: string
  suffix: string
  label: string
  delta: string
  deltaColor: string
  numColor: string
  sparkData: number[]
  sparkColor: string
}

interface StatsSectionProps {
  eyebrow?: string
  title?: string
  stats?: StatItem[]
}

export default function StatsSection({
  eyebrow = 'Live Numbers',
  title = 'Business at a glance.',
  stats,
}: StatsSectionProps) {
  const data = stats || STATS
  return (
    <section
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: 'center', padding: '48px 24px 32px' }}>
        <div
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: 'rgba(255,255,255,0.32)',
            marginBottom: 8,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: -1.5,
            color: '#fff',
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
      </div>

      {/* Stats grid */}
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {data.map(stat => (
          <StatCell key={stat.id} stat={stat} />
        ))}
      </div>
    </section>
  )
}
