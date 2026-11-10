import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import {  useSession } from 'next-auth/react';
const Plans = (props) => {
    const [data, setdata] = useState();
    const { data: session, status } = useSession()
    


    useEffect(() => {
      if (props.data.packages) {
          const parsedData = JSON.parse(props.data.packages);
          const filteredData = filterPackages(parsedData);
          setdata(filteredData);
      }
  }, [props]);

  const filterPackages = (data) => {
      const filteredPackages = Object.values(data).filter(item => {
          return item.is_archived === '0' && item.is_disabled === '0';
      });
      return filteredPackages;
  }



  return (
    <main className=" mx-auto pt-10  px-8">

  <div className="max-w-md mx-auto mb-6 text-center">
    <h1 className="text-4xl font-semibold mb-6 lg:text-5xl"><span className="text-indigo-600">Flexible</span> Plans</h1>
    <p className="text-xl text-gray-400 font-medium">Choose a plan that works best for you and your enjoyment.</p>
  </div>
  <div className='flex flex-wrap'>
  
  {data && data.length > 0 &&
    <div className="flex flex-col justify-between items-center lg:flex-row lg:items-start space-x-3 ">

        {data.map((data , i)=>(
                <div className="w-full flex-1 mt-8 p-8 order-2 bg-white  dark:bg-gray-900 dark:text-gray-400  shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-1 lg:rounded-r-none" key={i}>
                    <img src="https://res.cloudinary.com/williamsondesign/abstract-1.jpg"  alt="" className="rounded-3xl mb-3 w-20 h-20" />
                <div className="mb-7 pb-7 flex items-center border-b border-gray-300">
              
                <div className="ml-5">
                    <span className="block text-2xl font-semibold mb-2">{data.title}</span>
                    <span><span className="text-3xl font-bold">{data.nested['billing-plans'][0].first_price} </span><span className="font-medium text-gray-400 text-xl align-top">{data.currency}</span></span><span className="text-gray-400 font-medium">/ user</span>
                </div>
                </div>
                <ul className="mb-7 font-medium text-gray-400">
               
                    <li className="flex text-lg mb-2" key={i}>
                    <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
                    <span className="ml-3">{data.description}</span>
                    </li>

                </ul>
                {status  === "unauthenticated" &&  <Link href="/auth/Login"><button  type='submit' className="flex justify-center items-center bg-indigo-600 rounded-xl py-5 px-4 text-center text-white text-xl">
                Login First
                <img src="https://res.cloudinary.com/williamsondesign/arrow-right.svg" className="ml-2" />
                </button></Link>}
            </div>
        ))}
  </div>}
  </div>
</main>
  )
}

export default Plans


