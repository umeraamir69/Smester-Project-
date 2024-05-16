import React from 'react'
import Navbar from '../../../components/dashboard/Navbar'


import { getSessionAndRedirect } from '../../../middlewear/adminCheck'

const index = (props) => {
  return (
    <div>
      <Navbar/>
      <p>lorem</p>
      

    </div>
  )
}

export default index




export async function getServerSideProps(context) {
    return await getSessionAndRedirect(context);
}