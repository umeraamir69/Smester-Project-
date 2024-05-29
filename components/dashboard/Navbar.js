
import Link from 'next/link'
import React, { useState } from 'react'
import { MdConnectWithoutContact } from "react-icons/md";
import { LuPackage } from "react-icons/lu";
import { BiSolidSlideshow } from "react-icons/bi";
import { IoLogoGameControllerA } from "react-icons/io";
import { SiIndiansuperleague } from "react-icons/si";
import { MdAttachMoney } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { useRouter } from 'next/router';
import { GrChannel } from "react-icons/gr";
import { IoExitOutline } from 'react-icons/io5'
import { useSession } from 'next-auth/react';
import { signOut } from "next-auth/react"
import { toast } from "react-toastify";


const Navbar = ({sidebar , setsidebar}) => {
    const [show3, setshow3] = useState(false);
    const [showin, setshowin] = useState(false);

    const { data: session, status } = useSession()

    const handleSignout = (e)=>{
        e.preventDefault();
        router.replace("/")
        signOut()
        return toast.success("Logout! Thankyou for using our Services.", {
          position: "top-right",
          type:"error",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
      })
      }

    const router = useRouter();
    


    const handleLink = () => {
        setsidebar(!sidebar);
    }

    return (
       
        <div className=' print:hidden lg:pb-20 pb-20'>
            {status === "authenticated" ?
                <>
                    <nav className="fixed top-0 lg:z-10 z-20 w-full  bg-black border-gray-700">
                        <div className="px-3 py-3 lg:px-5 lg:pl-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center justify-start">

                                    <button onClick={() => setsidebar(!sidebar)} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                        <span className="sr-only">Open sidebar</span>
                                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                        </svg>
                                    </button>

                                    <div className="flex ml-2 md:mr-24 items-center">
                                    <BiSolidSlideshow className='w-10 h-10  dark:text-slate-300' />

                                        <span className="self-center text-xl font-semibold sm:text-2xl ml-3 whitespace-nowrap dark:text-white">                                            <div className='flex'>
                                            <div className='text-red-500 '>ShowBiz</div>
                                            <div className='ml-1 dark:text-gray-50'>Project</div>
                                        </div> </span>
                                    </div>
                                </div>
                                {status === "authenticated" ? 
                                <div className="flex items-center">
                                    <div className="flex items-center ml-3">
                                        <div>
                                            <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" onClick={() => { setshowin(!showin) }}>
                                            {session.user.image ? 
                                                <img className="h-8 w-8 rounded-full" src={session.user.image} alt=""/> : <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                                <span className="font-medium text-gray-600 dark:text-gray-300">{session.user.name.substring(0,1)}</span>
                                            </div>}
                                            </button>
                                        </div>
                                        <div className={`${showin ? "fixed" : "hidden"} top-10 right-10  z-50  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`} >
                                            <div className="px-4 py-3" role="none">
                                                <p className="text-sm text-gray-900 dark:text-white" role="none">
                                                   
                                                </p>
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300 w-28" >
                                                   
                                                </p>
                                            </div>
                                            <ul className="py-1" role="none">
                                                <li>
                                                    <Link href="/dashboard" onClick={() => setshowin(!showin)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" >Dashboard</Link>
                                                </li>

                                                <li>
                                                    <div onClick={handleSignout} className="block cursor-pointer bg-red-700 px-4 py-2 text-sm hover:bg-red-900 text-red-200  " >Sign out</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div> : ""}
                            </div>
                        </div>
                    </nav>

                    <aside className={`fixed top-0   ${sidebar ? "left-64 md:left-0" : "hidden"}  lg:z-0 z-10 w-64 h-screen pt-20 transition-transform -translate-x-full  sm:translate-x-0 dark:bg-black "`}>
                        <div className="h-full px-3 pb-4 overflow-y-auto bg-black">
                            <ul className="space-y-2 font-medium">
                                <li>
                                    <Link href="/dashboard" onClick={handleLink} >
                                        <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                            <span className="ml-3">Dashboard</span>
                                        </div>
                                    </Link>
                                </li>                  
                                <li>
                                    <Link href="/dashboard/Channels" onClick={handleLink} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <GrChannel className="w-6 h-6" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Channels</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dashboard/Leagues" onClick={handleLink} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <SiIndiansuperleague className="w-6 h-6" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Leagues</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dashboard/Teams" onClick={handleLink} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <RiTeamFill className="w-6 h-6" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Teams</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dashboard/Games" onClick={handleLink} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <IoLogoGameControllerA className="w-6 h-6" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Game</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dashboard/Query" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={handleLink} >
                                        <MdConnectWithoutContact className="w-6 h-6" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">User Query</span>
                                    </Link>
                                </li>
                                <li>
                                    <div onClick={handleSignout} className="flex items-center p-2 text-red-100 bg-red-700 rounded-lg  cursor-pointer hover:bg-red-500 ">
                                        <IoExitOutline className="w-6 h-6" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </>

                :
                ""
            }
        </div >
    )
}

export default Navbar