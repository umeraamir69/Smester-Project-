import React from 'react'

const CreateAccount = () => {
  return (
    <section id='createAccount' className='flex items-center justify-center'>
    <div class="mx-auto flex h-screen max-w-lg flex-col md:max-w-none md:flex-row md:pr-10">
    <div class="max-w-md rounded-3xl bg-gradient-to-t from-blue-700 via-blue-700 to-blue-600 px-4 py-10 text-white sm:px-10 md:m-6 md:mr-8">
      <p class="mb-20 font-bold tracking-wider">CORINE</p>
      <p class="mb-4 text-3xl font-bold md:text-4xl md:leading-snug">
        Start your <br />
        journey with us
      </p>
      <p class="mb-28 leading-relaxed text-gray-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere nisi voluptas a officia. Omnis.</p>
      <div class="bg-blue-600/80 rounded-2xl px-4 py-8">
        <p class="mb-3 text-gray-200">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error ea voluptates sapiente!</p>
        <div class="">
          <div class="flex items-center">
            <img class="h-10 w-10 rounded-full object-cover" src="/images/y9s3xOJV6rnQPKIrdPYJy.png" alt="Simon Lewis" />
            <p class="ml-4 w-56">
              <strong class="block font-medium">Simon Lewis</strong>
              <span class="text-xs text-gray-200"> Published 12 Bestsellers </span>
            </p>
          </div>
        </div>
      </div>
    </div>


    <div class="px-4 py-20 lg:w-96">
      <h2 class="mb-2 text-3xl font-bold">Sign Up</h2>

      <p class="mb-1 font-medium text-gray-500 mt-10">Full Name</p>
      <div class="mb-4 flex flex-col">
        <div class="focus-within:border-blue-600 relativeflex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
          <input type="text" id="signup-email" class="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Enter your email" />
        </div>
      </div>

      <p class="mb-1 font-medium text-gray-500">Email</p>
      <div class="mb-4 flex flex-col">
        <div class="focus-within:border-blue-600 relativeflex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
          <input type="email" id="signup-email" class="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Enter your email" />
        </div>
      </div>

      
      <p class="mb-1 font-medium text-gray-500">Password</p>
      <div class="mb-4 flex flex-col">
        <div class="focus-within:border-blue-600 relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
          <input type="password" id="signup-password" class="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Choose a password (minimum 8 characters)" />
        </div>
      </div>
      <button class="hover:shadow-blue-600/40 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-3 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg">Sign Up</button>

      <a href="#" class="mb-10 block font-bold text-gray-600 mt-5">Have an account ?</a>
    </div>
  </div>
  </section>
  
  )
}

export default CreateAccount