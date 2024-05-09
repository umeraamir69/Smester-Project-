import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import Recaptchav2 from '../universal/Recaptchav2';
import Loader from '../universal/Loader';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateAccount = () => {
  const [data, setdata] = useState({name :"", email:"" , password:"" });
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [captchav2, setcaptchav2] = useState(false)
  const [loader, setloader] = useState(false)

  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleRecaptcha = (value) => {
      setRecaptchaValue(value);
  };


  const handleOnChange =  (event) => {
    setdata({ ...data, [event.target.name]: event.target.value })
  }

  const handleSubmit =async (event) =>{
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
  if (!captchav2){
      try{
        const token = await executeRecaptcha('OrderRequest');
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
          setloader(false)
          return setcaptchav2(true);
      }
  }

      if(captchav2 && recaptchaValue == null){
          setloader(false)
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

    if (!isPasswordValid(data.password)){
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

    const request = await fetch('/api/createAccount', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
  })

//   if (!response.ok) {
//     throw new Error('Network response was not ok');
// }

//   const resuelt = await request.json();
  }



  const isPasswordValid = (password) =>{
    return /[a-zA-Z]/.test(password) && /\d/.test(password);
  }

  return (
    <section id='createAccount' className='flex items-center justify-center'>
    <div className="mx-auto flex h-screen max-w-lg flex-col md:max-w-none md:flex-row md:pr-10">
    <div className="max-w-md rounded-3xl bg-gradient-to-t from-blue-700 via-blue-700 to-blue-600 px-4 py-10 text-white sm:px-10 md:m-6 md:mr-8">
      <p className="mb-20 font-bold tracking-wider">CORINE</p>
      <p className="mb-4 text-3xl font-bold md:text-4xl md:leading-snug">
        Start your <br />
        journey with us
      </p>
      <p className="mb-28 leading-relaxed text-gray-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere nisi voluptas a officia. Omnis.</p>
      <div className="bg-blue-600/80 rounded-2xl px-4 py-8">
        <p className="mb-3 text-gray-200">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error ea voluptates sapiente!</p>
        <div className="">
          <div className="flex items-center">
            <img className="h-10 w-10 rounded-full object-cover" src="/images/y9s3xOJV6rnQPKIrdPYJy.png" alt="Simon Lewis" />
            <p className="ml-4 w-56">
              <strong className="block font-medium">Simon Lewis</strong>
              <span className="text-xs text-gray-200"> Published 12 Bestsellers </span>
            </p>
          </div>
        </div>
      </div>
    </div>


    <form  onSubmit={handleSubmit} className="px-4 py-20 lg:w-96">
      <h2 className="mb-2 text-3xl font-bold">Sign Up</h2>

      <p className="mb-1 font-medium text-gray-500 mt-10">Full Name</p>
      <div className="mb-4 flex flex-col">
        <div className="focus-within:border-blue-600 relativeflex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
          <input minLength={4} required type="text" id="name"  name="name" value={data.name} onChange={handleOnChange}  className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Enter your email" />
        </div>
      </div>

      <p className="mb-1 font-medium text-gray-500">Email</p>
      <div className="mb-4 flex flex-col">
        <div className="focus-within:border-blue-600 relativeflex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">

      <input required type="email" id="email" name="email" value={data.email} onChange={handleOnChange} className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Enter your email" />
        </div>
      </div>

      
      <p className="mb-1 font-medium text-gray-500">Password</p>
      <div className="mb-4 flex flex-col">
        <div className="focus-within:border-blue-600 relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
          <input required  minLength={6} type="password"  id="password" name="password" value={data.password} onChange={handleOnChange} className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Choose a password (minimum 8 characters)" />
        </div>
      </div>

      {captchav2 && 
        <div className='flex justify-end mb-4'>
            <Recaptchav2 onChange={handleRecaptcha}/>
        </div>
      }

      <button type='submit'  className="hover:shadow-blue-600/40 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-3 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg">Sign Up</button>

      <Link href="/login" className="mb-10 block font-bold text-gray-600 mt-5">Have an account ?</Link>
    </form>
  </div>
  </section>
  
  )
}

export default CreateAccount