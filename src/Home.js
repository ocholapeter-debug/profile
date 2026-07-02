import React from 'react'
import AboutUS from './AboutUS'
import Services from './Services'
import Carousel from './Carousel'  


function Home() {
  return (
    <div>
      <Carousel/>
      <AboutUS/>
      <Services/>
    </div>
  )
}

export default Home
