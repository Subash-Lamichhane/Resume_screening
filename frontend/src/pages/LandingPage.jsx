import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import HeroSection from '../components/Landing/HeroSection'
// import MoreInfo from '../components/Landing/MoreInfo'
import Technology from '../components/Landing/Technology'
import Features from '../components/Landing/Features'

const LandingPage = () => {
  return (
    <div
    // style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}
    >
        <Navbar/>
        {/* <hr /> */}
        <HeroSection/>
        <Features/>
        <Technology/>
    </div>
  )
}

export default LandingPage