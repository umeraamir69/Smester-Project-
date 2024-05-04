const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import User from "../../../../models/User";

export default async function handler(req, res) {
    try{
        const session = await getServerSession(req, res, authOptions);
        // if(session){
        if(true){
            // if ((await User.findOne({email : email})).isSuperUser){
            if (true){
                if (req.method === 'GET') {


                    const customers = await stripe.customers.list({});
                    res.status(201).json({ customers });
                    }



                }
                if (req.method === 'POST') {

                    
                        const { email, name } = req.body;
                        const customer = await stripe.customers.create({
                            email,
                            name,
                        });
                    
                        res.status(201).json({ customer });


                
                } 
            }

        
        else{
            res.status(405).end('Not Allowed');
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}