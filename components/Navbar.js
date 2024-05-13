


import React, { useContext } from "react";
import { GlobalContext } from "../context";
import Link from "next/link";

export default function Navbar() {
  const { isSidebarOpen, toggleSidebar } = useContext(GlobalContext);

  return (
    <header className="sticky top-0 z-50 flex w-full bg-black drop-shadow">
      <div className={`flex flex-grow items-center gap-2 ${isSidebarOpen?"justify-end py-4":"justify-between py-4 "} px-4 shadow md:px-6 2xl:px-11`}>
      <div className={`${isSidebarOpen? "hidden":""}`}>
        <Link href={"/"} className="text-[30px] text-white">
          StreamBTW
        </Link>
      </div>
        <div className="flex gap-x-5">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className="inline-flex items-center justify-center bg-black px-6 py-2 text-lg text-white font-medium tracking-wide uppercase"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          </button>
        </div>
        <button
          // Add your login/logout logic here
          className="inline-flex items-center justify-center bg-black px-6 py-2 text-lg text-white font-medium tracking-wide uppercase"
        >
          Login
        </button>
        </div>
        
      </div>
    </header>
  );
}
