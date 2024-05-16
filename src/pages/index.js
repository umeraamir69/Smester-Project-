import React from 'react'
import HomeNavbar from '../../components/HomeNavbar'
import HomeImage from '../../components/HomeImage'
import HomeServices from '../../components/HomeServices'
import HomeBanner from '../../components/HomeBanner'
import HomeBottomSection from '../../components/HomeBottomSection'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'


const index = () => {
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



export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
      return {
          redirect: {
              destination: '/app',
              permanent: false,
          },
      };
  } 
      

}

