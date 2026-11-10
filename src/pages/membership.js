import React from 'react'
import Layout from '../../components/Layout'
import Plans from '../../components/Plans'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const membership = (props) => {
  return (
    <Layout>
        <Plans data={props}/>
    </Layout>
  )
}

export default membership

async function loadStripePlans() {
  const products = await stripe.products.list({ active: true, limit: 20 })
  const prices = await stripe.prices.list({ active: true, limit: 50 })
  const priceByProduct = {}
  for (const price of prices.data) {
    const productId = typeof price.product === 'string' ? price.product : price.product?.id
    if (!productId || priceByProduct[productId]) continue
    priceByProduct[productId] = price
  }

  return products.data
    .map((product) => {
      const price = priceByProduct[product.id]
      if (!price) return null
      return {
        title: product.name,
        description: product.description || product.name,
        currency: (price.currency || 'usd').toUpperCase(),
        is_archived: '0',
        is_disabled: product.active ? '0' : '1',
        nested: {
          'billing-plans': [
            {
              first_price: ((price.unit_amount || 0) / 100).toFixed(2),
            },
          ],
        },
      }
    })
    .filter(Boolean)
}

export async function getServerSideProps() {
  try {
    if (process.env.URL && process.env.API) {
      const data = await fetch(
        `${process.env.URL}/api/products?_key=${process.env.API}&_format=json&_nested[]=billing-plans`,
        { method: 'GET' }
      )
      if (data.ok) {
        const res = await data.json()
        return {
          props: { packages: JSON.stringify(res) },
        }
      }
    }
  } catch (_) {
    // fall through to Stripe
  }

  try {
    const plans = await loadStripePlans()
    return {
      props: { packages: JSON.stringify(plans) },
    }
  } catch (error) {
    return {
      props: { packages: JSON.stringify([]) },
    }
  }
}
