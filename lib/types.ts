export interface StoreData {
  store_code: string
  store_name: string
  sale_date: string
  cash_sales: number
  card_sales: number
  upi_sales: number
  total_sales: number
  cash_deposited: number
  recon_status: 'GREEN' | 'AMBER' | 'RED' | 'PENDING'
  variance_amount: number
  alerts: string[]
}

export interface VendorSummary {
  vendor_outstanding_total: number
  vendor_count_overdue: number
  next_payment_due_date: string
  next_payment_amount: number
}

export interface DashboardPayload {
  sync_timestamp: string
  company: 'KMF' | 'MGBT'
  stores: StoreData[]
  vendor: VendorSummary
  bank_balance: number
  total_sales_today: number
  recon_done_count: number
  recon_total_count: number
  alerts_count: number
  payables_due_total: number
}

export interface DashboardSnapshot {
  id?: number
  company: string
  sync_timestamp: string
  payload: string
  created_at?: string
}
