import React from 'react'
import styles from './../src/styles/HomeBanner.module.css'
const features = [
    {
      icon:"./images/shield.png" ,
      title: "Secure",
      description: "App dir, Routing, Layouts, Loading UI and API routes.",
    },
    {
      icon:"./images/ads.png",
      title: "React 18",
      description: "Server and Client Components. Use hook. the art of ",
    },
    {
      icon:"./images/membership.png",
      title: "Database",
      description: "ORM using Prisma and deployed on PlanetScale.",
    },
    {
      icon:"./images/tv.png",
      title: "Components",
      description: "UI components built using Radix UI and styled with Tailwind CSS.",
    },
    {
      icon:"./images/performance.png",
      title: "Authentication",
      description: "Authentication using NextAuth.js and middlewares.",
    },
    {
      icon:"./images/shield.png",
      title: "Subscriptions",
      description: "Free and paid subscriptions using Stripe.",
    },
  ];
  
const HomeBanner = () => {
  return (
    <div className='mx-auto font-serif '>
      <div className=''>

<section
    className={`hidden md:block  bg-cover  bg-fixed  bg-no-repeat ${styles.background} py-20`}>
        <h1 className='text-center text-5xl font-bold text-white'>What they Expect</h1>

<div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 pt-28 px-10 sm:px-0">
          {features.map((feature, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg  bg-black select-none p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6 text-white">
                {/* <feature.icon className='' size={40} /> */}
                <img src={feature.icon} alt=""  className='w-12 h-12'/>
                <div className="space-y-2">
                  <h3 className="font-bold text-xl text-red-600">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>


        
    
</section>
<div className='sm:hidden'>
<div className="mx-auto sm:grid  justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 pt-16 sm:pt-28 bg-[#1A1B1C] px-8 py-4">
<h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl bg-gradient-to-b from-[#FF5F00] to-[#FEB941] text-transparent bg-clip-text text-center pb-10">What they Expect</h2>
          {features.map((feature, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg  bg-black select-none p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6 text-white">
                {/* <feature.icon className='' size={40} /> */}
                <img src={feature.icon} alt=""  className='w-12 h-12'/>
                <div className="space-y-2">
                  <h3 className="font-bold text-xl text-red-600">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>

</div>
    </div>
  )
}

export default HomeBanner
