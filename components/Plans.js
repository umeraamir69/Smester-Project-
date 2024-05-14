import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useSession } from 'next-auth/react';
const Plans = (props) => {
    const [data, setdata] = useState();
    const { data: session, status } = useSession()
    
    useEffect(() => {
        setdata(JSON.parse(props.data.packages))
    }, [props]);



  return (
    <main class="max-w-6xl mx-auto pt-10 pb-36 px-8">

  <div class="max-w-md mx-auto mb-6 text-center">
    <h1 class="text-4xl font-semibold mb-6 lg:text-5xl"><span class="text-indigo-600">Flexible</span> Plans</h1>
    <p class="text-xl text-gray-400 font-medium">Choose a plan that works best for you and your enjoyment.</p>
  </div>
  
  {data && data.length > 1 &&
    <div class="flex flex-col justify-between items-center lg:flex-row lg:items-start space-x-3">

        {data.map((data , i)=>(
                <div class="w-full flex-1 mt-8 p-8 order-2 bg-white  dark:bg-gray-900 dark:text-gray-400  shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-1 lg:rounded-r-none" key={i}>
                <div class="mb-7 pb-7 flex items-center border-b border-gray-300">
                <img src="https://res.cloudinary.com/williamsondesign/abstract-1.jpg"  alt="" class="rounded-3xl w-20 h-20" />
                <div class="ml-5">
                    <span class="block text-2xl font-semibold">{data.name}</span>
                    <span><span class="font-medium text-gray-400 text-xl align-top">$&thinsp;</span><span class="text-3xl font-bold">{data.ammount} </span></span><span class="text-gray-400 font-medium">/ user</span>
                </div>
                </div>
                <ul class="mb-7 font-medium text-gray-400">
                {data.description.split('.').map((data , i)=>(
                    <li class="flex text-lg mb-2" key={i}>
                    <img src="https://res.cloudinary.com/williamsondesign/check-grey.svg" />
                    <span class="ml-3">{data}</span>
                    </li>
                ))}
                </ul>
                {status  === "authenticated" ? <form method='post' action={`/api/stripe/checkout?priceId=${data.priceId}`}>
                
                <button type='submit' class="flex justify-center items-center bg-indigo-600 rounded-xl py-5 px-4 text-center text-white text-xl">
                Choose Plan
                <img src="https://res.cloudinary.com/williamsondesign/arrow-right.svg" class="ml-2" />
                </button>
                </form> :   <Link href="/auth/Login"><button  type='submit' class="flex justify-center items-center bg-indigo-600 rounded-xl py-5 px-4 text-center text-white text-xl">
                Login First
                <img src="https://res.cloudinary.com/williamsondesign/arrow-right.svg" class="ml-2" />
                </button></Link>}
            </div>
        ))}
  </div>}
</main>
  )
}

export default Plans


