import React from 'react'
import HomeNavbar from '../../components/HomeNavbar'
import HomeImage from '../../components/HomeImage'
import HomeServices from '../../components/HomeServices'
import HomeBanner from '../../components/HomeBanner'
import HomeBottomSection from '../../components/HomeBottomSection'
// import { getServerSession } from 'next-auth'
// import { authOptions } from './api/auth/[...nextauth]'
// import connectToDatabase from '../../middlewear/connectDb'


const index = (props) => {
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

export default index


