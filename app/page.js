import React from 'react'
import Home from './components/NewArrivals'
import HeroSection from './components/HeroSectio'
import NewArrivals from './components/NewArrivals'
import LookBookPage from './components/LookPageBook'
import Footer from './components/Footer'
import FeaturePage from './components/FeaturePage'
export default function page() {
  return (
    <div>
     
      <HeroSection />
      <NewArrivals />
      <FeaturePage />
      <LookBookPage />
      <Footer />
    </div>
  )
}
