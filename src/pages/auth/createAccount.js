
import CreateAccount from '../../../components/Auth/CreateAccount'
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import React, { useState } from "react";
import User from "../../../models/User";


const createaccount = () => {
  return (
    <div>
      <CreateAccount/>
    </div>
  )
}

export default createaccount;




export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
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
  
  return {
    props: { providers: providers ? providers : [] },
  };
}