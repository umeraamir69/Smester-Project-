import React, { useState, useEffect } from "react";
import { FiLogIn, FiEye, FiEyeOff } from 'react-icons/fi';
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { toast } from 'react-toastify';
import User from "../../../models/User";
import Link from "next/link";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from 'axios';
import Recaptchav2 from "../../../components/universal/Recaptchav2";
import Layout from "../../../components/Layout";
import Navbar from "../../../components/Navbar";
import HomeNavbar from "../../../components/HomeNavbar";

const images = [
    { src: "../../images/login.jpeg" },
    { src: "../../images/login2.jpeg" },
    { src: "../../images/login3.jpeg" },
];

export default function Login() {
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);
        return () => clearInterval(interval);
    }, []);



    const [providerval, setproviderval] = useState();
    const [data, setdata] = useState({ email: "", password: "" });
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const [captchav2, setcaptchav2] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleRecaptcha = (value) => {
        setRecaptchaValue(value);
    };

    // const handleSignIn = async (event) => {
    //     event.preventDefault();
    //     if (!executeRecaptcha) {
    //         return toast.warn("Please try again.", {
    //             position: "top-right",
    //             autoClose: 3000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             theme: "dark",
    //         });
    //     }
    //     if (!captchav2) {
    //         try {
    //             const token = await executeRecaptcha('CreateAccount');
    //             await axios.post('/api/verifyRecaptcha', { token });
    //         } catch (error) {
    //             toast.error("Please verify captcha", {
    //                 position: "top-right",
    //                 autoClose: 3000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 theme: "dark",
    //             });
    //             return setcaptchav2(true);
    //         }
    //     }

    //     try {
    //         if (captchav2 && recaptchaValue === null) {
    //             return toast.error("Please verify captcha", {
    //                 position: "top-right",
    //                 autoClose: 3000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 theme: "dark",
    //             });
    //         }


    //         const x = await signIn('credentials', { username: data.email, password: data.password });
    //         toast.info("Logging in", {
    //             position: "top-right",
    //             autoClose: 3000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             theme: "dark",
    //         });
    //         console.log(x);
    //     } catch (error) {
    //         toast.error(error, {
    //             position: "top-right",
    //             autoClose: 3000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             theme: "dark",
    //         });
    //     }
    // };


    const handleSignIn = async (e) => {
        e.preventDefault();
        const amember_login = 'someones';
        const amember_pass = 'Admin123..';
    
        const url = 'https://securepayments.live/secure/login';
    
        // Create URLSearchParams object and append form data
        const formBody = new URLSearchParams();
        formBody.append('amember_login', amember_login);
        formBody.append('amember_pass', amember_pass);
    
        try {
            // Perform the fetch request with the form data encoded as x-www-form-urlencoded
            const response = await fetch(url, {
                method: 'POST',
                body:data, // Convert URLSearchParams to a URL encoded string,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                credentials: 'include'
            });
    
            // Log the entire response
            console.log('Response:', response);
    

        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };
    
    
    
    
    


    const handleChange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <>
            <HomeNavbar />
            <div className="min-h-screen bg-gray-900 text-gray-900 flex justify-center px-4 pt-4 pb-4 sm:px-0 sm:pt-0 sm:pb-0">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-black shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 rounded-xl" >
                        <div>
                            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-4xl bg-gradient-to-b from-[#FF5F00] to-[#FEB941] text-transparent bg-clip-text text-center">StreamBTW</h2>
                        </div>
                        <div className="mt-12 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold text-gray-300">
                                Sign up
                            </h1>
                            <div className="w-full flex-1 mt-8">
              
                                <form onSubmit={handleSignIn} className="mx-auto max-w-xs">
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text" required placeholder="Email" name="email" value={data.email} onChange={handleChange} />

                                    <div className="relative">
                                        <input
                                            className="w-full px-8 py-4 my-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type={showPassword ? "text" : "password"} required placeholder="Password" name="password" value={data.password} onChange={handleChange} />
                                        <button
                                            type="button"
                                            className="absolute right-0 top-0 bottom-0 flex items-center px-2"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FiEyeOff /> : <FiEye />}
                                        </button>
                                    </div>

                                    {captchav2 &&
                                        <div className='flex justify-center mt-4'>
                                            <Recaptchav2 onChange={handleRecaptcha} />
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
                                        New at Stream BTW? &nbsp;
                                        <Link href="/auth/createAccount" className="border-b cursor-pointer font-bold border-gray-500 border-dotted">
                                            Create Account
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-[#1A1B1C] hidden lg:flex">
                        <img src={images[currentImageIndex].src} alt="swiper" className="w-full md:h-full h-[250px]" />
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (session) {
        const user = await User.findOne({ "email": session.user.email });

        if (user && user.isSuperUser) {
            return { redirect: { destination: "/dashboard" } };
        } else {
            return { redirect: { destination: "/" } };
        }
    }


    return {
        props: { a: [] },
    };
}
