
import CreateAccount from '../../../components/Auth/CreateAccount'
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import React, { useState } from "react";


const createaccount = ({ providers }) => {
  return (
    <div>
      <CreateAccount providers={providers}/>
    </div>
  )
}

export default createaccount;




export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {

    if (session.user.email == 'admin'  && session.user.name =="_admin" ) {
        return { redirect: { destination: "/dashboard" } };
      } 
    else {
        return { redirect: { destination: "/" } };
      };
  }
  
  return {
    props: { providers: [] },
  };
}


