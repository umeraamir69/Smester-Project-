import React, { useEffect, useState } from "react";
import User from "../../../models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { HiOutlineRefresh } from "react-icons/hi";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import Navbar from "../../../components/dashboard/Navbar";
import { toast } from "react-toastify";

const Balance = (props) => {
  const [data, setdata] = useState();
  const [sidebar, setsidebar] = useState(false);

  useEffect(() => {
    if (props.blnc !== null) setdata(JSON.parse(props.blnc));
  }, [props]);

  const handleRefresh = async () => {
    try {
      const request = await fetch("/api/stripe/transactions", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      const resuelt = await request.json();
      if (resuelt.status) {
        setdata(resuelt.data);

        toast.info("Refreshed", {
          position: "top-right",
          type: "success",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      } else {
        toast.info("An Error Occurred", {
          position: "top-right",
          type: "error",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.info("An Error Occurred", {
        position: "top-right",
        type: "error",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <div className="bg-[#191C24] min-h-screen ">
      <Navbar sidebar={sidebar} setsidebar={setsidebar} />
      <section
        className={`sm:p-5  ${sidebar == false ? "ml-0" : "lg:ml-48"}`}
      >
        <h1
          className={`text-3xl font-bold  pb-5 text-red-600 ${
            sidebar == false ? "pl-5" : "pl-20"
          } `}
        >
          Balance
        </h1>
        <div className="mx-auto max-w-screen-xl px-4">
          <div
            className={`bg-[#1E1E2C]  shadow-md sm:rounded-lg overflow-hidden mx-auto pb-5   ${
              sidebar == false ? "" : "lg:ml-16"
            }`}
          >
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2"></div>
              <div className="w-full md:w-auto flex flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0 ">
                <div className="flex gap-x-2 bg-blue-600 px-3 py-0.5 rounded-lg"> 
                  <h1 className="text-white text-lg">Refresh</h1>
                  <HiOutlineRefresh
                  className="w-5 h-5 text-white cursor-pointer mt-1"
                  onClick={handleRefresh}
                />
                </div>
                
              </div>
            </div>

            {data && (
              <div className="overflow-x-auto flex justify-center flex-wrap gap-x-4 gap-y-4">
                <div className="relative flex  flex-col justify-center overflow-hidden bg-black rounded-xl">
                  <div className="group relative cursor-pointer overflow-hidden  px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                    <span className="absolute top-10  h-20 w-20 rounded-full bg-sky-500 transition-all duration-300 "></span>
                    <div className="relative  mx-auto max-w-md">
                      <span className="grid h-20 w-20 place-items-center rounded-full  transition-all duration-300 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-10 w-10 text-white transition-all"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                          />
                        </svg>
                      </span>
                      <h2 className="text-white  font-bold text-xl py-2 ">
                        Avalible
                      </h2>
                      <div className="flex flex-col">
                        <div className="-m-1.5 overflow-x-auto">
                          <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden">
                              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                  <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                      Amount
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                      {data.available[0].amount}
                                    </td>
                                  </tr>

                                  <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                      Currency
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                      {data.available[0].currency}
                                    </td>
                                  </tr>

                                  <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                      source_types
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                      {data.available[0].source_types.card}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative flex  flex-col justify-center overflow-hidden bg-black rounded-xl">
                  <div className="group relative cursor-pointer overflow-hidden  px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                    <span className="absolute top-10 h-20 w-20 rounded-full bg-sky-500 transition-all duration-300 "></span>
                    <div className="relative  mx-auto max-w-md">
                      <span className="grid h-20 w-20 place-items-center rounded-full  transition-all duration-300 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-10 w-10 text-white transition-all"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                          />
                        </svg>
                      </span>
                      <h2 className="text-white  font-bold text-xl py-2 ">
                        Connect Reserved
                      </h2>
                      <div className="flex flex-col">
                        <div className="-m-1.5 overflow-x-auto">
                          <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden">
                              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                  <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                      Amount
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                      {data.connect_reserved[0].amount}
                                    </td>
                                  </tr>

                                  <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                      Currency
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                      {data.connect_reserved[0].currency}
                                    </td>
                                  </tr>

                                  <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                      source_types
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                      {data.available[0].source_types.card}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative flex  flex-col justify-center overflow-hidden bg-black rounded-xl ">
                  <div className="group relative cursor-pointer overflow-hidden  px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                    <span className="absolute top-10  w-20 rounded-full bg-sky-500 transition-all duration-300 group-hover:scale-[10]"></span>
                    <div className="relative  mx-auto max-w-md lg:-mt-10">
                      <span className="grid h-20 w-20 place-items-center rounded-full bg-sky-500 transition-all duration-300 group-hover:bg-sky-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-10 w-10 text-white transition-all"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                          />
                        </svg>
                      </span>
                      <h2 className="text-white  font-bold text-xl py-2 ">
                        Pending
                      </h2>
                      <div className="flex flex-col">
                        <div className="-m-1.5 overflow-x-auto">
                          <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden">
                              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                  <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                      Amount
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                      {data.connect_reserved[0].amount}
                                    </td>
                                  </tr>

                                  <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                      Currency
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                      {data.connect_reserved[0].currency}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Balance;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/Login",
        permanent: false,
      },
    };
  } else {
    const user = await User.findOne({ email: session.user.email });
    if (user && user.isSuperUser) {
      const balance = await stripe.balance.retrieve();
      return {
        props: {
          blnc: balance ? JSON.stringify(balance) : null,
        },
      };
    }
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
