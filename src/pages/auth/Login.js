import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import {FiLogIn} from 'react-icons/fi'
import React, { useState } from "react";
import { toast } from 'react-toastify';
import User from "../../../models/User";
import Link from "next/link";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import axios from 'axios';
import Recaptchav2 from "../../../components/universal/Recaptchav2";
import { useEffect } from "react";
import Layout from "../../../components/Layout";
import Navbar from "../../../components/Navbar";

export default function Login({ providers }) {

    useEffect(() => {
        setproviderval(Object.values(providers))
        console.log(providers)
    }, [providers])

  const [providerval, setproviderval] = useState()
  const [data, setdata] = useState({email : "" , password:"" })
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [captchav2, setcaptchav2] = useState(false)

  const { executeRecaptcha } = useGoogleReCaptcha()


  const handleRecaptcha = (value) => {
    setRecaptchaValue(value);
    };


  const handleSignIn = async (event) => {
      event.preventDefault();
    if (!executeRecaptcha) {
        return toast.warn("Please Try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        });
    }
    if (!captchav2){
        try{
        const token = await executeRecaptcha('CreateAccount');
        const response = await axios.post('/api/verifyRecaptcha', { token });
        }
        catch(error){
            toast.error("Verify captcha", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            return setcaptchav2(true);
        }
    }


      try {
        if(captchav2 && recaptchaValue == null){
            return  toast.error("Please Verify captcha ", {
                 position: "top-right",
                 autoClose: 3000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 theme: "dark",
             });
         }

          // Pass the 'email' and other data fields to the email provider
          toast.info("Loggin in", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
          });
          console.log("first")
          const x = await signIn('credentials', { username: data.email , password : data.password });
          console.log(x)

          // toast

        } catch (error) {
             toast.error(error, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
          });
          // Handle any sign-in errors, display a message, or perform other actions as needed
        }
      }

    const handleChange = (e) => {
      setdata({ ...data,[ e.target.name] : e.target.value });
    };
    
  return (
    <>
<Navbar/>
<div className="min-h-screen bg-gray-900 text-gray-900 flex justify-center">
    <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 rounded-xl" >
            <div>
                <img src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                    className="w-32 mx-auto" />
            </div>
            <div className="mt-12 flex flex-col items-center">
                <h1 className="text-2xl xl:text-3xl font-extrabold">
                    Sign up
                </h1>
                <div className="w-full flex-1 mt-8">
                    <div className="flex flex-col items-center">
                        <button onClick={() => signIn(providerval[0].id)}
                            className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                            <div className="bg-white p-2 rounded-full">
                                <svg className="w-4" viewBox="0 0 533.5 544.3">
                                    <path
                                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                        fill="#4285f4" />
                                    <path
                                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                        fill="#34a853" />
                                    <path
                                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                        fill="#fbbc04" />
                                    <path
                                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                        fill="#ea4335" />
                                </svg>
                            </div>
                            <span className="ml-4">
                                Log in with Google
                            </span>
                        </button>

                  
                    </div>

                    <div className="my-12 border-b text-center">
                        <div
                            className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            Or log in with Credentials
                        </div>
                    </div>

                    <form onSubmit={handleSignIn} className="mx-auto max-w-xs">
                        <input
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="email" required placeholder="Email" name="email" value={data.email} onChange={handleChange} />

                        <input
                            className="w-full px-8 py-4 my-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="password" required placeholder="Password" name="password" value={data.password} onChange={handleChange} />
                        
                            {captchav2 && 
                                <div className='flex justify-center mt-4'>
                                    <Recaptchav2 onChange={handleRecaptcha}/>
                                </div>
                                }
                        <button
                            className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                           <FiLogIn className="w-6 h-6" />
                            <span className="ml-3">
                                Log in
                            </span>
                        </button>
                        <p className="mt-6 text-xs text-gray-600 text-center">
                           New at Strema BTW ? &nbsp;
                            <Link href="/auth/createAccount" className="border-b cursor-pointer font-bold border-gray-500 border-dotted">
                               Create  Account
                            </Link>
                            
                        </p>
                    </form>
                </div>
            </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
               >
            </div>
        </div>
    </div>
</div>
</>
  );
}


export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(session)
  if (session) {
    const user = await User.findOne({"email": session.user.email})

     if (user && user.isSuperUser) {
        return { redirect: { destination: "/dashboard" } };
      } 
    else {
        return { redirect: { destination: "/" } };
      };
  }

  const providers = await getProviders();
  console.log(providers)
  return {
    props: { providers: providers ? providers : [] },
  };
}