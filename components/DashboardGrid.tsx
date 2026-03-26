import DeptCard from './DeptCard'

export default function DashboardGrid() {
  return (
    <section style={{ background: '#000' }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', padding: '64px 24px 40px' }}>
        <div
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: 'rgba(255,255,255,0.32)',
            marginBottom: 10,
          }}
        >
          Business Command Centre
        </div>

        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: -1.5,
            lineHeight: 1.05,
            marginBottom: 12,
          }}
        >
          <div style={{ color: '#fff' }}>Six departments.</div>
          <div
            style={{
              background: 'linear-gradient(135deg, #2997ff, #5ac8ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            One platform.
          </div>
        </div>

        <div
          style={{
            fontSize: 14,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.35)',
            maxWidth: 560,
            margin: '0 auto',
          }}
        >
          Every part of your business connected in real time — accounts,
          warehouse, HR, purchase, stores and management.
        </div>
      </div>

      {/* Cards grid */}
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 20px 80px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10,
        }}
      >
        <DeptCard
          id="accounts"
          eyebrow="Accounts · KMFAccounts"
          title="Reconciliation"
          subtitle="SD · BRS · Vendor · Daily · Payables · GST"
          tags={['Accounts', 'KMFAccounts']}
          metrics={[
            { val: '5/7', label: 'Recon done', color: '#2997ff' },
            { val: '₹32L', label: 'Payables due', color: '#ffd93d' },
            { val: '12', label: 'Alerts', color: '#ff6b6b' },
          ]}
          ctaText="Open Accounts ›"
          accentColor="#2997ff"
          patternType="wave"
        />

        <DeptCard
          id="warehouse"
          eyebrow="Warehouse · VASTRA"
          title="Inventory"
          subtitle="Stock · Purchases · Styles · GRN"
          tags={['Warehouse', 'VASTRA']}
          metrics={[
            { val: '2,840', label: 'Active styles', color: '#30d158' },
            { val: '12', label: 'Reorder alerts', color: '#ff6b6b' },
            { val: '6', label: 'GRN pending', color: '#ffd93d' },
          ]}
          ctaText="Open VASTRA ›"
          accentColor="#30d158"
          patternType="grid"
        />

        <DeptCard
          id="hr"
          eyebrow="Human Resources"
          title="HR & Attendance"
          subtitle="Attendance · Salary · Leaves · 106 staff"
          tags={['HR', 'Payroll']}
          metrics={[
            { val: '84%', label: 'Present today', color: '#ec4899' },
            { val: '17', label: 'Absent', color: '#ffd93d' },
            { val: '3', label: 'Leave pending', color: '#ff6b6b' },
          ]}
          ctaText="Open HR ›"
          accentColor="#ec4899"
          patternType="blobs"
        />

        <DeptCard
          id="purchase"
          eyebrow="Purchase"
          title="Vendor Orders"
          subtitle="Purchase orders · Deliveries · GRN tracking"
          tags={['Purchase', 'Vendors']}
          metrics={[
            { val: '18', label: 'Open orders', color: '#f59e0b' },
            { val: '6', label: 'Due today', color: '#ffd93d' },
            { val: '4', label: 'Overdue GRN', color: '#ff6b6b' },
          ]}
          ctaText="Open Purchase ›"
          accentColor="#f59e0b"
          patternType="zigzag"
        />

        <DeptCard
          id="storeops"
          eyebrow="Store Operations"
          title="7 Stores"
          subtitle="Sales targets · Staff performance · Daily ops"
          tags={['Store Ops', '7 Stores']}
          metrics={[
            { val: '₹14.2L', label: "Today's sales", color: '#06b6d4' },
            { val: '5/7', label: 'On target', color: '#30d158' },
            { val: '2', label: 'Below target', color: '#ff6b6b' },
          ]}
          ctaText="Open Store Ops ›"
          accentColor="#06b6d4"
          patternType="hexdots"
        />

        <DeptCard
          id="management"
          eyebrow="Management"
          title="Owner Decisions"
          subtitle="Pending approvals · Reports · Business alerts"
          tags={['Management', 'Approvals']}
          metrics={[
            { val: '7', label: 'Pending', color: '#f97316' },
            { val: '2', label: 'Urgent today', color: '#ff6b6b' },
            { val: '14', label: 'Done this week', color: 'rgba(255,255,255,0.5)' },
          ]}
          ctaText="Open Management ›"
          accentColor="#f97316"
          patternType="rings"
        />
      </div>
    </section>
  )
}
