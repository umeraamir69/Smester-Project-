import React from 'react'
import Layout from '../../components/Layout'
import Plans from '../../components/Plans'
import Package from '../../models/Package'

const membership = (props) => {
  return (
    <Layout>
        <Plans data={props}/>
    </Layout>
  )
}

export default membership



export async function getServerSideProps(context) {
    
    const data = await Package.find()
    return {
      props: { packages: JSON.stringify(data) },
    };
  }