import React from 'react'
import Navbar from '../../../components/dashboard/Navbar'

import { useState } from 'react'
import { getSessionAndRedirect } from '../../../middlewear/adminCheck'

const index = (props) => {
  const [sidebar, setsidebar] = useState(false);

  return (
    <div>
     <Navbar sidebar={sidebar} setsidebar={setsidebar}/>
      
      </div>
  )
}

export default index




export async function getServerSideProps(context) {
    return await getSessionAndRedirect(context);
}