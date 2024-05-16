import React from 'react';
import { FaBuysellads } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
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

const HomeServices = () => {
  return (
    <div className='px-4 sm:px-10  bg-[#1A1B1C]'>
      <section id="features" className="container mx-auto px-4 space-y-6 py-8 md:py-12 lg:py-20">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl bg-gradient-to-b from-[#FF5F00] to-[#FEB941] text-transparent bg-clip-text">Features</h2>
          <p className="sm:max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 text-white">
            The product can personalize user experiences by understanding individual preferences and tailoring recommendations or content based on user behavior and historical data.
          </p>
        </div>

        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 pt-10">
          {features.map((feature, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg  bg-black select-none p-2">
              <div className="flex  flex-col justify-between rounded-md p-6 text-white">
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
    </div>
  );
};

export default HomeServices;
