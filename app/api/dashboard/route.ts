import { NextRequest, NextResponse } from 'next/server'
import { getLatestSnapshot } from '@/lib/db'

export async function GET(req: NextRequest) {
  const company = req.nextUrl.searchParams.get('company') || 'KMF'

  const snapshot = getLatestSnapshot(company)

  if (!snapshot) {
    return NextResponse.json({
      sync_timestamp: new Date().toISOString(),
      company,
      stores: [],
      vendor: {
        vendor_outstanding_total: 3240000,
        vendor_count_overdue: 8,
        next_payment_due_date: '',
        next_payment_amount: 0,
      },
      bank_balance: 42300000,
      total_sales_today: 1420000,
      recon_done_count: 5,
      recon_total_count: 7,
      alerts_count: 12,
      payables_due_total: 3240000,
      is_dummy: true,
    })
  }

  return NextResponse.json({
    ...snapshot,
    is_dummy: false,
  })
}
