import React from 'react'
import Layout from '../../components/Layout'
import Plans from '../../components/Plans'


const membership = (props) => {
  return (
    <Layout>
        <Plans data={props}/>
    </Layout>
  )
}

export default membership



export async function getServerSideProps(context) {
    
    const data = await fetch(`${process.env.URL}/api/products?_key=${process.env.API}&_format=json&_nested[]=billing-plans` , {
      method : 'GET'
    })
    const res = await data.json()
    return {
      props: { packages: JSON.stringify(res) },
    };
  }