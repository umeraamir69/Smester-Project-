import Link from 'next/link'
import React from 'react'

const HomeNavbar = () => {
  return (
    <div className='bg-black'>
    <div className='flex justify-between md:px-10 px-4'>
        <div className='flex flex-col justify-center'>
            <Link  href="/">
            <div className='flex py-4'>
                <h1 className='bg-gradient-to-b from-yellow-500 to-red-800 text-transparent bg-clip-text text-xl md:text-3xl font-bold'>StreamBTW</h1>
            </div>
            </Link>
        </div>
        <div className='flex flex-col justify-center'>
            <div className='flex text-white gap-x-5'>
                <div className='bg-gray-800 hover:bg-gray-700 py-1 md:px-3 px-2 text-sm md:text-lg rounded-md'>
                    <Link href="/auth/Login">
                        <h1>Sign in</h1>
                    </Link>
                </div>
                <div className='bg-gray-800 hover:bg-gray-700 py-1 md:px-3 px-2 text-sm md:text-lg rounded-md'>
                    <Link href="/auth/createAccount">
                    <h1>Sign up</h1>
                    </Link>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default HomeNavbar


