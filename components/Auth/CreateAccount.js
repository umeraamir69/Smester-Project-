import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import Recaptchav2 from '../universal/Recaptchav2';
import Loader from '../universal/Loader';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import HomeNavbar from '../HomeNavbar';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const CreateAccount = (props) => {
  const [data, setdata] = useState({Fname :"", Lname : "" , email:"" , password:"" , username :""});
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [captchav2, setcaptchav2] = useState(false)
  const [loader, setloader] = useState(false)
  const [showPassword, setShowPassword] = useState(false); 
  const [formData, setFormData] = useState({
    amember_login: '',
    amember_pass: ''
  });

  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleRecaptcha = (value) => {
    setRecaptchaValue(value);
  };

  const handleOnChange = (event) => {
    setdata({ ...data, [event.target.name]: event.target.value })

    if(event.target.name == "password"){
    setFormData({ ...formData, "amember_pass": event.target.value })
    }
    else if( event.target.name ==  "username"){
    setFormData({ ...formData, "amember_login": event.target.value })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!executeRecaptcha) {
      setloader(false)
      return toast.warn("Captcha Please Try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
    if (!captchav2) {
      try {
        const token = await executeRecaptcha('OrderRequest');
        const response = await axios.post('/api/verifyRecaptcha', { token });
      } catch (error) {
        toast.error("Verify captcha", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        setloader(false)
        return setcaptchav2(true);
      }
    }

    if (captchav2 && recaptchaValue == null) {
      setloader(false)
      return toast.error("Please Verify captcha ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }

    if (!isPasswordValid(data.password)) {
      return toast.error("Enter Valid Password ", {
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
    const request = await fetch('/api/createAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      const resuelt = await request.json();
      if(resuelt.status){

         toast.success(resuelt.message, {
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
      else{
        return toast.error(resuelt.error, {
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

  const isPasswordValid = (password) => {
    return /[a-zA-Z]/.test(password) && /\d/.test(password);
  }

  return (
    <div className='pb-10 bg-gray-900'>
      <HomeNavbar/>
      <section id='createAccount' className='flex items-center justify-center '>
        <div className="mx-auto flex h-screen max-w-lg flex-col md:max-w-none md:flex-row md:pr-10 bg-black mt-10 rounded-xl pb-5">
          <div className="max-w-md rounded-3xl bg-gradient-to-tl from-[#252525] to-gray-800 px-4 py-10 text-white sm:px-10 md:m-6 md:mr-8">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-4xl bg-gradient-to-b from-[#FF5F00] to-[#FEB941] text-transparent bg-clip-text text-center pb-20">StreamBTW</h2>
            <p className="mb-4 text-3xl font-bold md:text-4xl md:leading-snug">
              Start your <br />
              journey with us
            </p>
            <p className="mb-28 leading-relaxed text-gray-300 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere nisi voluptas a officia. Omnis.</p>
          </div>

          <form onSubmit={handleSubmit} className="px-4 py-4 lg:w-96 bg-blak my-5 rounded-xl ">
            <h2 className="mb-2 text-3xl font-bold text-white">Sign Up</h2>



            <hr className='mt-5'/>

            <p className="mb-1 font-medium text-white mt-10">Fiorst Name</p>
            <div className="mb-4 flex flex-col">
              <div className="focus-within:border-blue-600 relativeflex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
                <input minLength={4} required type="text" id="Fname"  name="Fname" value={data.Fname} onChange={handleOnChange}  className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Enter your email" />
              </div>
            </div>
            <p className="mb-1 font-medium text-white mt-10">loast Name</p>
            <div className="mb-4 flex flex-col">
              <div className="focus-within:border-blue-600 relativeflex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
                <input minLength={4} required type="text" id="Lname"  name="Lname" value={data.Lname} onChange={handleOnChange}  className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Enter your email" />
              </div>
            </div>

            <p className="mb-1 font-medium text-white mt-10">userName</p>
            <div className="mb-4 flex flex-col">
              <div className="focus-within:border-blue-600 relativeflex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
                <input minLength={4} required type="text" id="username"  name="username" value={data.username} onChange={handleOnChange}  className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Enter your email" />
              </div>
            </div>

            <p className="mb-1 font-medium text-white">Email</p>
            <div className="mb-4 flex flex-col">
              <div className="focus-within:border-blue-600 relativeflex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
                <input required type="email" id="email" name="email" value={data.email} onChange={handleOnChange} className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Enter your email" />
              </div>
            </div>

            <p className="mb-1 font-medium text-white">Password</p>
            <div className="mb-4 flex flex-col">
              <div className="focus-within:border-blue-600 relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
                <input required minLength={6} type={showPassword ? "text" : "password"} id="password" name="password" value={data.password} onChange={handleOnChange} className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Choose a password (minimum 8 characters)" />
                <button
                  type="button"
                  className="absolute right-0 top-0 bottom-0 flex items-center px-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </button>
              </div>
            </div>

            {captchav2 && 
              <div className='flex justify-end mb-4'>
                  <Recaptchav2 onChange={handleRecaptcha}/>
              </div>
            }

            <button type='submit'  className="hover:shadow-blue-600/40 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-3 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg ">Sign Up</button>

            <Link href="/auth/Login" className="mb-10 block font-bold text-blue-600 mt-5 ">Have an account ?</Link>
          </form>
        </div>
      </section>


      <form action="https://securepayments.live/secure/login" method="post" className="hidden" id="loginForm">
        <input type="text" required placeholder="Email" name="amember_login" id="amember_login"  value={formData.amember_login} />
        <input type="password" required placeholder="amember_pass" name="amember_pass" id="amember_pass"  value={formData.amember_pass} />
        <button type="submit">login</button>
    </form>

    </div>
  )
}

export default CreateAccount;
