import Image from "next/image";
import { Inter } from "next/font/google";
import CreateAccount from "../../components/Auth/CreateAccount";
import Login from "../../components/Auth/Login";
import Navbar from "../../components/Navbar";
import Plans from "../../components/Plans";

import ContactForm from "../../components/ContactForm";
import Timeline from "../../components/Timeline";
import Layout from "../../components/Layout";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";

export default function Home(props) {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Layout>
    <div className="flex justify-between ">
      <div></div>
      

      <div class="inline-flex rounded-lg shadow-sm">
        <button
          type="button"
          class="py-2 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 "
        >
          Upcoming
        </button>
        <button
          type="button"
          class="py-2 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 "
        >
          Past
        </button>
      </div>

      <form className="form relative">
        <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
          <svg
            width="17"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="search"
            className="w-5 h-5 text-gray-700"
          >
            <path
              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
              stroke="currentColor"
              strokeWidth="1.333"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
        <input
          className="input rounded-full px-12 py-1.5 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
          placeholder="Search..."
          required=""
          type="text"
        />
        <button
          type="reset"
          className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </form>
    </div>
    <Timeline />
  </Layout>
  )
}








