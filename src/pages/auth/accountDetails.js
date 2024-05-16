import { getServerSession } from 'next-auth'
import React, { useEffect, useState } from 'react'
import { authOptions } from '../api/auth/[...nextauth]'
import User from '../../../models/User'
import Link from 'next/link';
import Password from '../../../components/Password';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { toast } from 'react-toastify';
import Layout from '../../../components/Layout';





const AccountDetails = (props) => {

  const [userDb, setuserDb] = useState();
  const [stripdata, setstripdata] = useState();
  const [invoicedata, setinvoicedata] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setdata] = useState({oldpass: "" , newpass:"" , cnfrmpass:""});
  const [type, settype] = useState('');

  useEffect(() => {
    if(props.userData){
      setuserDb(JSON.parse(props.userData))
      if(!props.customer == false )  setstripdata(JSON.parse(props.customer)) 
      if(!props.invoice == false )  setinvoicedata(JSON.parse(props.invoice)) 
    }

  }, [props]);


  const cancleSubscription = async (e)=>{
    e.preventDefault();
    const request = await fetch("/api/stripe/subscribtion", {
      headers: {  
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body : JSON.stringify({id :invoicedata[0].subscription})
    });
  
    const resuelt = await request.json();
    if(resuelt.status){
      setuserDb({
        ...userDb,
        ['userType']:  'standard'
      });
      
    return toast.success("Subscription Cancled", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
  });
}else{
  return toast.error("An error Occured", {
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

  const handlechangepass = ()=>{
    settype("change")
    setIsOpen(true)
  }
  const handleaddpas = ()=>{
    settype("add")
    setIsOpen(true)
  }

  const isPasswordValid = (password) =>{
    return /[a-zA-Z]/.test(password) && /\d/.test(password);
  }

  const handleadd =async (e)=>{
    e.preventDefault()
    if(data.newpass !== data.cnfrmpass){
      return toast.error("Password Does'nt match", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    });
    }
    if (!isPasswordValid(data.newpass)){
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

  const request = await fetch("/api/password", {
    headers: {  
      "Content-Type": "application/json",
    },
    method: "POST",
    body : type =="add"? JSON.stringify({newpass :data.newpass ,cnfrmpass : data.cnfrmpass}) : JSON.stringify({oldpass:data.oldpass ,newpass :data.newpass ,cnfrmpass : data.cnfrmpass})
  });

  const resuelt = await request.json();
  console.log(resuelt)
  if(resuelt.status){
    setdata({oldpass: "" , newpass:"" , cnfrmpass:""});
    settype('')
    setuserDb({
      ...userDb,
      ['password']:  '123'
    });
    setIsOpen(false)
    return toast.success(resuelt.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
  });
  
}
  else{
    return toast.error('error',resuelt.message, {
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










  return (
<Layout>
<div class="">
  <Password isOpen={isOpen} setIsOpen={setIsOpen} data={data} setdata={setdata} type={type} handleadd={handleadd}  />
{ userDb &&
    // <div class="container mx-auto my-5 p-5">
    //     <div class="md:flex no-wrap md:-mx-2 ">

    //         <div class="w-full md:w-3/12 md:mx-2">

    //             <div class="bg-white p-3 border-t-4 border-green-400">
    //                 <div class="image overflow-hidden">
    //                     <img class="h-auto w-full mx-auto"
    //                         src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
    //                         alt=""/>
    //                 </div>
    //                 <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{userDb.name}</h1>
    //                 <p class="text-sm text-gray-500 hover:text-gray-600 leading-6"></p>
    //                 <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
    //                     <li class="flex items-center py-3">
    //                         <span>Status</span>
    //                         <span class="ml-auto"><span
    //                                 class="bg-green-500 py-1 px-2 rounded text-white text-sm">{userDb.userType}</span></span>
    //                     </li>
    //                     <li class="flex items-center py-3">
    //                         <span>Member since</span>
    //                         <span class="ml-auto">{userDb.createdAt.substring(0,10)}</span>
    //                     </li>
    //                 </ul>
    //             </div>

    //             <div class="my-4"></div>

    //             {stripdata &&<div class="bg-white p-3 hover:shadow">
    //                 <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
    //                     <span class="text-green-500">
    //                         <svg class="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
    //                             viewBox="0 0 24 24" stroke="currentColor">
    //                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    //                                 d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    //                         </svg>
    //                     </span>
    //                     <span>Payment</span>
    //                 </div>
    //                 <ul
    //                     class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        
    //                     <li class="flex items-center py-3">
    //                         <span>Currency</span>
    //                         <span class="ml-auto uppercase">{stripdata.currency}</span>
    //                     </li>
    //                 </ul>
    //             </div>}

    //             {userDb.userType == "premium" &&<div class="bg-white p-3 hover:shadow mt-4">
    //                 <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
    //                     <span class="text-green-500">
    //                         <svg class="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
    //                             viewBox="0 0 24 24" stroke="currentColor">
    //                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    //                                 d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    //                         </svg>
    //                     </span>
    //                     <span>Actions</span>
    //                 </div>

    //                     <button onClick={cancleSubscription} type="button" class="mt-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancel Subscription</button>

    //             </div>}

    //         </div>

    //         <div class="w-full md:w-9/12 mx-2 h-64">

    //             <div class="bg-white p-3 shadow-sm rounded-sm">
    //                 <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
    //                     <span clas="text-green-500">
    //                         <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    //                             stroke="currentColor">
    //                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    //                                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    //                         </svg>
    //                     </span>
    //                     <span class="tracking-wide">About</span>
    //                 </div>
    //                 <div class="text-gray-700">
    //                     <div class="grid md:grid-cols-2 text-sm">
    //                         <div class="grid grid-cols-2">
    //                             <div class="px-4 py-2 font-semibold">Full Name</div>
    //                             <div class="px-4 py-2">{userDb.name}</div>
    //                         </div>
    //                         <div class="grid grid-cols-2">
    //                             <div class="px-4 py-2 font-semibold">Email</div>
    //                             <div class="px-4 py-2">{userDb.email}</div>
    //                         </div>

    //                         <div class="grid grid-cols-2">
    //                             <div class="px-4 py-2 font-semibold">Login Mode</div>
    //                             <div class="px-4 py-2">{userDb.password ? "Credentials" : "Google Login"}</div>
    //                         </div>
    //                         <div class="grid grid-cols-2">
    //                             <div class="px-4 py-2 font-semibold">Membership</div>
    //                             <div class="px-4 py-2 capitalize">{userDb.userType}</div>
    //                         </div>
    //                         <div class="grid grid-cols-2">
    //                             <div class="px-4 py-2 font-semibold">Account Created</div>
    //                             <div class="px-4 py-2">
    //                             {userDb.createdAt.substring(0,10)}
    //                             </div>
    //                         </div>
    //                         <div class="grid grid-cols-2">
    //                             <div class="px-4 py-2 font-semibold">Last Updated</div>
    //                             <div class="px-4 py-2">{userDb.updatedAt.substring(0,10)}</div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <button
    //                 onClick={userDb.password ? handlechangepass : handleaddpas}
    //                     class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">{userDb.password ? "Change Password" : "Add Password"}</button>
    //             </div>


    //             <div class="my-4"></div>


    //             <div class="bg-white p-3 shadow-sm rounded-sm">

    //                 <div class="grid grid-cols-2">
    //                     <div>
    //                         <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
    //                             <span clas="text-green-500">
    //                                 <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    //                                     stroke="currentColor">
    //                                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    //                                         d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    //                                 </svg>
    //                             </span>
    //                             <span class="tracking-wide">Purchase</span>
    //                         </div>
    //                         {invoicedata &&
    //                         <div>
    //                           <ul class="list-inside space-y-2">
    //                             {invoicedata.map((data , i)=>(
    //                               <li key={data.id} className={i==0 && userDb.userType == "premium" ? 'bg-green-200': 'bg-red-200'}>
    //                                 <div class="text-teal-600">{data.lines.data[0].description}</div>
    //                                 <div class="text-teal-600">ID : {data.number}</div>
    //                                 <div class="text-gray-500 text-xs">Ammount Paid : {data.amount_paid}</div>
    //                                 <div class="text-gray-500 text-xs">Payment : {data.status}</div>
    //                                 <div class="text-gray-500 text-xs">Date : {new Date(data.created * 1000).toString().substring(0,15)}</div>
    //                                 <div class="text-gray-500 text-xs">Subscription Start Date : {new Date(data.lines.data[0].period.start  * 1000).toString().substring(0,15)}</div>
    //                                 <div class="text-gray-500 text-xs">Subscription End  : {new Date(data.lines.data[0].period.end * 1000).toString().substring(0,15)}</div>
    //                                 <div class="text-gray-500 text-xs">Get invoice
    //                                   <Link href={data.hosted_invoice_url} target='_blank'>Get PDF</Link>
    //                                 </div>
    //                               </li>
    //                             ))}
                            
    //                         </ul>
    //                     </div>}
    //                     </div>
    //                     <div >

    //             <div className=' bg-green-400'>Active</div>
    //             <div className=' bg-red-400'>Cancled </div>
    //                     </div>
                
    //                 </div>

    //             </div>

    //         </div>
    //     </div>
    // </div>
    <div>
      <div>
      <div class="bg-white p-3 shadow-sm  rounded-lg">
                     <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                           <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span class="tracking-wide">About</span>
                    </div>
                    <div class="text-gray-700">
                        <div class="grid md:grid-cols-2 text-sm">
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Full Name</div>
                                <div class="px-4 py-2">{userDb.name}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Email</div>
                                <div class="px-4 py-2">{userDb.email}</div>
                            </div>

                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Login Mode</div>
                                <div class="px-4 py-2">{userDb.password ? "Credentials" : "Google Login"}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Membership</div>
                                <div class="px-4 py-2 capitalize">{userDb.userType}</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Account Created</div>
                                <div class="px-4 py-2">
                                {userDb.createdAt.substring(0,10)}
                                </div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Last Updated</div>
                                <div class="px-4 py-2">{userDb.updatedAt.substring(0,10)}</div>
                            </div>
                        </div>
                    </div>
                    <button
                    onClick={userDb.password ? handlechangepass : handleaddpas}
                        class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">{userDb.password ? "Change Password" : "Add Password"}</button>
                </div>
                <div className='grid grid-cols-3 mt-10 gap-x-4 '>
                  <div className='bg-white rounded-lg  border-green-400 border-t-4'>
                  <div class=" p-3  ">
                     <div class="image overflow-hidden">
                         <img class="h-auto w-full mx-auto"
                            src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                            alt=""/>
                    </div>
                    <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{userDb.name}</h1>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6"></p>
                    <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li class="flex items-center py-3">
                            <span>Status</span>
                            <span class="ml-auto"><span
                                    class="bg-green-500 py-1 px-2 rounded text-white text-sm">{userDb.userType}</span></span>
                        </li>
                        <li class="flex items-center py-3">
                            <span>Member since</span>
                            <span class="ml-auto">{userDb.createdAt.substring(0,10)}</span>
                        </li>
                    </ul>
                </div>
                  </div>
                  <div className='bg-white rounded-lg  border-green-400 border-t-4'>
                  {stripdata &&<div class=" p-3 hover:shadow">
                    <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                         <span class="text-green-500">
                             <svg class="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </span>
                        <span>Payment</span>
                    </div>
                    <ul
                        class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        
                        <li class="flex items-center py-3">
                            <span>Currency</span>
                            <span class="ml-auto uppercase">{stripdata.currency}</span>
                        </li>
                    </ul>
                </div>}
                  </div>
                  <div className='bg-white rounded-lg  border-green-400 border-t-4'>
                  {userDb.userType == "premium" &&<div class=" p-3 hover:shadow ">
                     <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                         <span class="text-green-500">
                            <svg class="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </span>
                        <span>Actions</span>
                    </div>

                        <button onClick={cancleSubscription} type="button" class="mt-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancel Subscription</button>

                </div>}
                  </div>
                </div>
                <div class="rounded-2xl">
                <div >



            <div class="my-10"></div>


            <div class="bg-white p-3 shadow-sm rounded-sm">

                <div class="grid grid-cols-2">
                    <div>
                        <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                            <span clas="text-green-500">
                                <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </span>
                            <span class="tracking-wide">Purchase</span>
                        </div>
                        {invoicedata &&
                        <div>
                          <ul class="list-inside space-y-2">
                            {invoicedata.map((data , i)=>(
                              <li key={data.id} className={i==0 && userDb.userType == "premium" ? 'bg-green-200': 'bg-red-200'}>
                                <div class="text-teal-600">{data.lines.data[0].description}</div>
                                <div class="text-teal-600">ID : {data.number}</div>
                                <div class="text-gray-500 text-xs">Ammount Paid : {data.amount_paid}</div>
                                <div class="text-gray-500 text-xs">Payment : {data.status}</div>
                                <div class="text-gray-500 text-xs">Date : {new Date(data.created * 1000).toString().substring(0,15)}</div>
                                <div class="text-gray-500 text-xs">Subscription Start Date : {new Date(data.lines.data[0].period.start  * 1000).toString().substring(0,15)}</div>
                                <div class="text-gray-500 text-xs">Subscription End  : {new Date(data.lines.data[0].period.end * 1000).toString().substring(0,15)}</div>
                                <div class="text-gray-500 text-xs">Get invoice
                                  <Link href={data.hosted_invoice_url} target='_blank'>Get PDF</Link>
                                </div>
                              </li>
                            ))}
                        
                        </ul>
                    </div>}
                    </div>
                    <div >

            <div className=' bg-green-400'>Active</div>
            <div className=' bg-red-400'>Cancled </div>
                    </div>
            
                </div>

            </div>

        </div>
                </div>
      </div>
    </div>
}
</div>
</Layout>
  )
}

export default AccountDetails


export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    const user = await User.findOne({"email": session.user.email})
     if (user) {
      const customer = await stripe.customers.search({
        query: `email:'${session.user.email}'`
      });
      console.log(customer)
      let invoice;
      if(customer.data.length >0){
         invoice = await stripe.invoices.search({
          query: `customer: '${customer.data[0].id}'`,
        });
      }
      return {
        props: {
            userData: JSON.stringify(user),
            customer : customer.data.length >0 ? JSON.stringify(customer.data[0]) : false,
            invoice : invoice && invoice.data.length >0 ? JSON.stringify(invoice.data) : false,
        }};
      } 
    else {
        return { redirect: { destination: "/" } };
      };
  } else {
    return { redirect: { destination: "/" } };
  };
}