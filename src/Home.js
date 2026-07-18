import React from 'react'
import AboutUS from './AboutUS'
import Services from './Services'
import Carousel from './Carousel'  
import Footer from './Footer'


function Home() {
  return (
    <div>
      <Carousel/>
      <AboutUS/>
      <Services/>
      <Footer/>
    </div>
  )
}

export default Home
