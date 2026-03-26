'use client'
import { useEffect, useRef, useState } from 'react'

interface Metric {
  val: string
  label: string
  color: string
}

interface DeptCardProps {
  id: string
  eyebrow: string
  title: string
  subtitle: string
  tags: string[]
  metrics: Metric[]
  ctaText: string
  accentColor: string
  patternType: 'wave' | 'grid' | 'blobs' | 'zigzag' | 'hexdots' | 'rings'
}

function drawPattern(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  t: number,
  patternType: string,
  color: string,
) {
  ctx.clearRect(0, 0, W, H)

  if (patternType === 'wave') {
    const grad = ctx.createLinearGradient(0, 0, W, H)
    grad.addColorStop(0, '#0a1829')
    grad.addColorStop(0.5, '#1a1040')
    grad.addColorStop(1, '#0d2040')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, W, H)
    for (let i = 0; i < 4; i++) {
      const amp = 20 + i * 8
      const freq = 0.012 + i * 0.004
      const phase = t + i * 1.2
      ctx.beginPath()
      ctx.moveTo(0, H)
      for (let x = 0; x <= W; x += 2) {
        const y =
          H * 0.3 +
          i * H * 0.12 +
          Math.sin(x * freq + phase) * amp +
          Math.sin(x * freq * 0.5 + phase * 0.7) * amp * 0.5
        ctx.lineTo(x, y)
      }
      ctx.lineTo(W, H)
      ctx.closePath()
      ctx.fillStyle = `rgba(0,0,0,${0.12 + i * 0.08})`
      ctx.fill()
    }
  } else if (patternType === 'grid') {
    const grad = ctx.createLinearGradient(0, 0, W, H)
    grad.addColorStop(0, '#061a0e')
    grad.addColorStop(1, '#0a2a16')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, W, H)
    ctx.strokeStyle = color
    ctx.lineWidth = 0.5
    ctx.globalAlpha = 0.25
    for (let x = 0; x <= W; x += 28) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, H)
      ctx.stroke()
    }
    for (let y = 0; y <= H; y += 28) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(W, y)
      ctx.stroke()
    }
    ctx.globalAlpha = 1
    for (let i = 0; i < 6; i++) {
      const dx = W * 0.1 + i * (W * 0.16)
      const dy = H * 0.5 + Math.sin(t + i) * 20
      const r = 3 + Math.sin(t * 2 + i) * 1.5
      ctx.beginPath()
      ctx.arc(dx, dy, r, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.globalAlpha = 0.6
      ctx.fill()
    }
    ctx.globalAlpha = 0.15
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let x = 0; x <= W; x += 2) {
      const y = H * 0.5 + Math.sin(x * 0.04 + t) * 25
      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
    ctx.globalAlpha = 1
  } else if (patternType === 'blobs') {
    const grad = ctx.createLinearGradient(0, 0, W, H)
    grad.addColorStop(0, '#1a0818')
    grad.addColorStop(1, '#0e0510')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, W, H)
    const blobs = [
      [W * 0.2, H * 0.4, 80],
      [W * 0.6, H * 0.3, 100],
      [W * 0.8, H * 0.6, 70],
      [W * 0.35, H * 0.65, 90],
    ]
    blobs.forEach(([bx, by, br], i) => {
      const x = bx + Math.sin(t + i * 1.3) * 20
      const y = by + Math.cos(t * 0.8 + i) * 15
      const rg = ctx.createRadialGradient(x, y, 0, x, y, br)
      const c = i % 2 === 0 ? '#ec489955' : '#a855f744'
      rg.addColorStop(0, c)
      rg.addColorStop(1, 'transparent')
      ctx.fillStyle = rg
      ctx.beginPath()
      ctx.arc(x, y, br, 0, Math.PI * 2)
      ctx.fill()
    })
  } else if (patternType === 'zigzag') {
    ctx.fillStyle = '#1a1008'
    ctx.fillRect(0, 0, W, H)
    const cols = [W * 0.2, W * 0.5, W * 0.8]
    cols.forEach(cx => {
      ctx.lineWidth = 18
      ctx.strokeStyle = color
      ctx.globalAlpha = 0.22
      ctx.lineJoin = 'miter'
      ctx.beginPath()
      let dir = 1
      for (let y = 0; y <= H; y += 30) {
        ctx.lineTo(cx + dir * 28, y)
        dir *= -1
      }
      ctx.stroke()
    })
    ctx.globalAlpha = 1
  } else if (patternType === 'hexdots') {
    const grad = ctx.createLinearGradient(0, 0, W, H)
    grad.addColorStop(0, '#030e12')
    grad.addColorStop(1, '#061520')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, W, H)
    const step = 32
    const rows = Math.ceil(H / step) + 1
    const cols = Math.ceil(W / (step * 0.866)) + 1
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * step * 0.866
        const y = row * step + (col % 2) * step * 0.5
        const dist = Math.hypot(x - W / 2, y - H / 2)
        const pulse = Math.sin(t * 2 - dist * 0.03) * 0.5 + 0.5
        const r = 2 + pulse * 2
        ctx.globalAlpha = 0.15 + pulse * 0.4
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    ctx.globalAlpha = 1
  } else if (patternType === 'rings') {
    const grad = ctx.createLinearGradient(0, 0, W, H)
    grad.addColorStop(0, '#120700')
    grad.addColorStop(1, '#1e0d02')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, W, H)
    const cx = W * 0.7
    const cy = H * 0.4
    for (let i = 0; i < 6; i++) {
      const r = 20 + i * 22 + Math.sin(t + i * 0.5) * 5
      ctx.strokeStyle = color
      ctx.lineWidth = 1
      ctx.globalAlpha = 0.08 + Math.sin(t * 1.5 - i * 0.4) * 0.04
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.stroke()
    }
    ctx.globalAlpha = 0.7
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(cx, cy, 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 0.12
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let x = 0; x <= W; x += 2) {
      const y = H - 20 + Math.sin(x * 0.04 + t) * 18
      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
    ctx.globalAlpha = 1
  }
}

export default function DeptCard({
  eyebrow,
  title,
  subtitle,
  tags,
  metrics,
  ctaText,
  accentColor,
  patternType,
}: DeptCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = (rect.width || canvas.offsetWidth) * dpr
    canvas.height = (rect.height || canvas.offsetHeight) * dpr
    ctx.scale(dpr, dpr)

    const W = rect.width || canvas.offsetWidth
    const H = rect.height || canvas.offsetHeight

    let t = 0
    let animId: number

    const animate = () => {
      t += 0.008
      ctx.save()
      drawPattern(ctx, W, H, t, patternType, accentColor)
      ctx.restore()
      animId = requestAnimationFrame(animate)
    }
    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [patternType, accentColor])

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        minHeight: 260,
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.4s cubic-bezier(.22,1,.36,1), opacity 0.7s cubic-bezier(.22,1,.36,1)',
        transform: hovered
          ? 'scale(1.015)'
          : visible
            ? 'scale(1)'
            : 'scale(0.97)',
        opacity: visible ? 1 : 0,
      }}
    >
      {/* Canvas pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: '42%',
          overflow: 'hidden',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          marginTop: 'auto',
          background: 'rgba(0,0,0,0.88)',
          backdropFilter: 'blur(10px)',
          padding: '14px 18px 16px',
        }}
      >
        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          {tags.map(tag => (
            <span
              key={tag}
              style={{
                fontSize: 9,
                fontWeight: 600,
                padding: '3px 9px',
                borderRadius: 20,
                background: accentColor + '2e',
                color: accentColor,
                letterSpacing: 0.5,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 19,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: -0.5,
            marginBottom: 3,
            lineHeight: 1.15,
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.38)',
            marginBottom: 12,
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </div>

        {/* Metrics */}
        <div style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
          {metrics.map(m => (
            <div key={m.label}>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: m.color,
                  lineHeight: 1,
                }}
              >
                {m.val}
              </div>
              <div
                style={{
                  fontSize: 9,
                  marginTop: 2,
                  color: 'rgba(255,255,255,0.32)',
                }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          style={{
            fontSize: 11,
            fontWeight: 600,
            padding: '7px 16px',
            borderRadius: 20,
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            background: accentColor + '1a',
            color: accentColor,
          }}
        >
          {ctaText}
        </button>
      </div>
    </div>
  )
}
