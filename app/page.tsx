'use client'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import FeatureStrip from '@/components/FeatureStrip'
import DashboardGrid from '@/components/DashboardGrid'
import StatsSection from '@/components/StatsSection'
import DeptStatus from '@/components/DeptStatus'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main style={{ background: '#000' }}>
      <Navbar />
      <HeroSection />
      <FeatureStrip />
      <DashboardGrid />
      <StatsSection />
      <DeptStatus />
      <Footer />
    </main>
  )
}
