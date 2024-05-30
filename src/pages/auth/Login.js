// pages/auth/Login.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiLogIn, FiEye, FiEyeOff } from 'react-icons/fi';

import { signIn } from 'next-auth/react';

import { toast } from 'react-toastify';
import Link from 'next/link';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import axios from 'axios';
import Recaptchav2 from '../../../components/universal/Recaptchav2';
import HomeNavbar from '../../../components/HomeNavbar';

const images = [
    { src: "../../images/login.jpeg" },
    { src: "../../images/login2.jpeg" },
    { src: "../../images/login3.jpeg" },
];

export default function Login() {

    const router = useRouter();
    const { error } = router.query;

    let errorMessage = '';
    if (error) {
        switch (error) {
            case 'Invalid%20username%20or%20password':
                errorMessage = 'Invalid username or password';
                break;
            case 'No%20subscriptions%20found':
                errorMessage = 'No subscriptions found';
                break;
            case 'Invalid%20subscription%20date':
                errorMessage = 'Invalid subscription date';
                break;
            case 'Subscription%20expired':
                errorMessage = 'Subscription expired';
                break;
            default:
                errorMessage = 'An unknown error occurred';
                break;
        }
    }


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);
        return () => clearInterval(interval);
    }, []);





    const [data, setdata] = useState({ email: "", password: "" });
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const [captchav2, setcaptchav2] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [formData, setFormData] = useState({
        amember_login: '',
        amember_pass: ''
      });

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

            if (captchav2 && recaptchaValue === null) {
                return toast.error("Please verify captcha", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });
            }
            const formElement = await document.getElementById('loginForm');
        
            const request = await fetch('/api/users' ,{
                method : 'POST',
                body : JSON.stringify({ username: data.email, password: data.password })
            })
            const resuelt = await request.json();
            if(!resuelt.res){
                if(resuelt.code == -10){
                    toast.error(resuelt.error, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "dark",
                    });
                    return formElement.submit();
                }
            } else {
                if(resuelt.code == 10) {
                    await signIn('credentials', { username: data.email, password: data.password });
                    return toast.success(resuelt.error, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "dark",
                    });
                }
            }
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });

        }
    };
    
    
    
    
    


    const handleChange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });

        if(e.target.name == "password"){
            setFormData({ ...formData, "amember_pass": e.target.value })
        }
        else if( e.target.name ==   "email"){
        setFormData({ ...formData, "amember_login": e.target.value })
        }
    };

    return (
        <>
            <HomeNavbar />
            <div className="min-h-screen bg-gray-900 text-gray-900 flex justify-center px-4 pt-4 pb-4 sm:px-0 sm:pt-0 sm:pb-0">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-black shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 rounded-xl">
                        <div>
                            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-4xl bg-gradient-to-b from-[#FF5F00] to-[#FEB941] text-transparent bg-clip-text text-center">StreamBTW</h2>
                        </div>
                        <div className="mt-12 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold text-gray-300">
                                Sign up
                                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
            <form action="https://securepayments.live/secure/login" method="post" className="hidden" id="loginForm">
                <input type="text" required placeholder="Email" name="amember_login" id="amember_login"  value={formData.amember_login} />
                <input type="password" required placeholder="amember_pass" name="amember_pass" id="amember_pass"  value={formData.amember_pass} />
                <button type="submit">login</button>
            </form>
        </>
    );
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (session) {
        if (session.user.email == 'admin'  && session.user.name =="_admin" ) {
        return { redirect: { destination: "/dashboard/" } };   
     }else{
        return { redirect: { destination: "/" } };
     }
    }


    return {
        props: { a: '' },

    };
}
