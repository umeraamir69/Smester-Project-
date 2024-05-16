import React from 'react'
import HomeNavbar from '../../components/HomeNavbar'
import HomeImage from '../../components/HomeImage'
import HomeServices from '../../components/HomeServices'
import HomeBanner from '../../components/HomeBanner'
import HomeBottomSection from '../../components/HomeBottomSection'

const Home = () => {
  return (
    <div>
      <HomeNavbar/>
      <HomeImage/>
      <HomeServices/>
      <HomeBanner/>
      <HomeBottomSection/>
    </div>
  )
}

export default Home
