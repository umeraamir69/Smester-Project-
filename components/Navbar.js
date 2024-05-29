import React, { useContext, useState } from "react";
import { GlobalContext } from "../context";
import Link from "next/link";
import { CiLogin } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
import { useSession } from 'next-auth/react';
import { signOut } from "next-auth/react"
import { toast } from "react-toastify";

export default function Navbar() {
  const { isSidebarOpen, toggleSidebar } = useContext(GlobalContext);
  const { data: session, status } = useSession()
  const [dropdown, setdropdown] = useState(false);

  const handleSignout = (e)=>{
    e.preventDefault();
    signOut()
    return toast.success("Logout! Thankyou for using our Services.", {
      position: "top-right",
      type:"success",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
  })
  }

  return (
    <header className="sticky top-0 z-40 flex w-full bg-black drop-shadow ">
      <div className={`flex flex-grow items-center gap-2 ${isSidebarOpen?"justify-end py-4":"justify-between py-4 "} px-4 shadow md:px-6 2xl:px-11`}>
      <div className={`${isSidebarOpen? "hidden":""}`}>
        <Link href={"/"} className="text-2xl sm:text-[30px] bg-gradient-to-tr font-bold font-serif italic from-[#FF5F00] to-red-700 text-transparent bg-clip-text">
          StreamBTW
        </Link>
      </div>
        <div className="flex gap-x-5">

        

        {status === "authenticated" ? 
        <>
        <div className="mt-1">
        <button onClick={() =>setdropdown(!dropdown)} type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">Open user menu</span>
          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300 capitalize">{session.user.name ? session.user.name.substring(0,1) : "User"}</span>
      </div>
        </button>
      </div>

     {dropdown && <div className="absolute right-5  mt-10 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
      
        <Link href="/auth/AccountDetails" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile
        </Link>
        <button onClick={handleSignout} className="block  cursor-pointer px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</button>
      </div>}

      </>
          :
          <Link href="/auth/Login" >
          <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 flex  items-center mt-1"> <CiLogin className="w-5 h-5 mx-1" /> Login</button>

          </Link>
        }
        <div className="flex items-center gap-2 sm:gap-4">
          
          <IoMenu size={30} className="text-white" onClick={toggleSidebar}/>
        </div>
        </div>
        
      </div>
    </header>
  );
}