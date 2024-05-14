


// import React, { useContext, useState } from "react";
// import { GlobalContext } from "../context";
// import Link from "next/link";
// import { CiLogin } from "react-icons/ci";
// import { IoMenu } from "react-icons/io5";
// import { useSession } from 'next-auth/react';
// import { signOut } from "next-auth/react"
// import { toast } from "react-toastify";

// export default function Navbar() {
//   const { isSidebarOpen, toggleSidebar } = useContext(GlobalContext);
//   const { data: session, status } = useSession()
//   const [dropdown, setdropdown] = useState(false);

//   const handleSignout = (e)=>{
//     e.preventDefault();
//     signOut()
//     return toast.success("Logout! Thankyou for using our Services.", {
//       position: "top-right",
//       type:"error",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       theme: "dark",
//   })
//   }

//   return (
//     <header className="sticky top-0 z-50 flex w-full bg-[#222831] drop-shadow">
//       <div className={`flex flex-grow items-center gap-2 ${isSidebarOpen?"justify-end py-4":"justify-between py-4 "} px-4 shadow md:px-6 2xl:px-11`}>
//       <div className={`${isSidebarOpen? "hidden":""}`}>
//         <Link href={"/auth  "} className="text-[30px] text-white">
//           StreamBTW
//         </Link>
//       </div>
//         <div className="flex gap-x-5">

        

//     <Link href="/membership">
//             <button
//                 class="relative inline-block p-px font-semibold leading-6 cursor-pointer  text-white no-underline bg-gray-800 shadow-2xl cursor-pointer group rounded-xl shadow-zinc-900"><span
//                     class="absolute inset-0 overflow-hidden rounded-xl"><span
//                         class="absolute inset-0 rounded-xl bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">

//                     </span>
//                 </span>
//                 <div
//                     class="relative z-10 flex items-center px-6 py-3 space-x-2  text-sm rounded-xl bg-gray-950/50 ring-1 ring-white/10 ">
//                     <span>Become Premium</span>
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
//                         data-slot="icon" class="w-6 h-6">
//                         <path fill-rule="evenodd"
//                             d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
//                             clip-rule="evenodd"></path>
//                     </svg>
//                 </div>
//                 <span
//                     class="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-gray-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
//             </button>
//     </Link>


//         {status === "authenticated" ? 
//         <>
//         <div>
//         <button onClick={() =>setdropdown(!dropdown)} type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
//           <span class="absolute -inset-1.5"></span>
//           <span class="sr-only">Open user menu</span>
//           {session.user.image ? 
//           <img class="h-8 w-8 rounded-full" src={session.user.image} alt=""/> : <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
//           <span class="font-medium text-gray-600 dark:text-gray-300">{session.user.name.substring(0,1)}</span>
//       </div>}
//         </button>
//       </div>

//      {dropdown && <div class="absolute right-5 z-10 mt-10 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
      
//         <Link href="/auth/AccountDetails" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile
//         </Link>
//         <button onClick={handleSignout} class="block  cursor-pointer px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</button>
//       </div>}

//       </>
//           :
//           <Link href="/auth/Login" >
//           <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 flex  items-center"> <CiLogin className="w-5 h-5 mx-1" /> Login</button>

//           </Link>
//         }
//         <div className="flex items-center gap-2 sm:gap-4">
          
//           <IoMenu size={30} className="text-white" onClick={toggleSidebar}/>
//         </div>
//         </div>
        
//       </div>
//     </header>
//   );
// }



import React, { useContext } from "react";
import { GlobalContext } from "../context";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
export default function Navbar() {
  const { isSidebarOpen, toggleSidebar } = useContext(GlobalContext);

  return (
    <header className="sticky top-0 z-50 flex w-full bg-[#222831] drop-shadow">
      <div className={`flex flex-grow items-center gap-2 ${isSidebarOpen?"justify-end py-4":"justify-between py-4 "} px-4 shadow md:px-6 2xl:px-11`}>
      <div className={`${isSidebarOpen? "hidden":""}`}>
        <Link href={"/"} className="text-[30px] text-white">
          StreamBTW
        </Link>
      </div>
        <div className="flex gap-x-5">

        <button
          // Add your login/logout logic here
          className="inline-flex items-center justify-center bg-black px-6 py-1.5 rounded-xl text-lg text-white font-medium tracking-wide "
        >
          Membership
        </button>
       
        <button
          // Add your login/logout logic here
          className="inline-flex items-center justify-center bg-black px-6 py-1.5 rounded-xl text-lg text-white font-medium tracking-wide uppercase"
        >
          Login
        </button>

        <div className="flex items-center gap-2 sm:gap-4">
          <IoMenu size={30} className="text-white" onClick={toggleSidebar}/>
        </div>
        </div>
        
      </div>
    </header>
  );
}