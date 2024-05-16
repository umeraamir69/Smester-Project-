import React, { useEffect } from 'react'

const Balance = () => {
    useEffect(() => {
        data();



    }, []);


    const data = async()=>{
        const request = await fetch("/api/stripe/balance", {
            headers: {
            "Content-Type": "application/json",
            },
            method: "GET",
        });
    
        const resuelt = await request.json();
        console.log(resuelt)
    }


  return (
    <div>Balance</div>
  )
}

export default Balance