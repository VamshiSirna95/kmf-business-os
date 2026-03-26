import { NextRequest, NextResponse } from 'next/server'
import { saveSnapshot, logSync } from '@/lib/db'
import { DashboardPayload } from '@/lib/types'

const API_SECRET = process.env.API_SECRET || 'kmf2026secure'

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get('authorization')
    if (auth !== `Bearer ${API_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 },
      )
    }

    const payload = (await req.json()) as DashboardPayload

    if (!payload.company || !payload.sync_timestamp || !payload.stores) {
      return NextResponse.json(
        { error: 'Missing required fields: company, sync_timestamp, stores' },
        { status: 400 },
      )
    }

    saveSnapshot(payload.company, payload)
    logSync(payload.company, 'SUCCESS', payload.stores.length)

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    logSync('UNKNOWN', 'ERROR', 0, message)
    return NextResponse.json(
      { error: message },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'KMF Dashboard sync endpoint',
    timestamp: new Date().toISOString(),
  })
}
