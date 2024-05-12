const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import User from "../../../../models/User";
import verifyRequestOrigin from '../../../../middlewear/verifyRequestOrigin';
import verifyDbConnection from "../../../../middlewear/dbVerification";

export default async function handler(req, res) {
    verifyDbConnection(req , res);
    verifyRequestOrigin(req , res);   
    //verify user login
    const session = await getServerSession(req, res, authOptions);
    if(session == null) return res.status(403).json({status : false , message : "Forbidden. Login First"});
    try {
        if (req.method === 'POST') {
            const { price } = req.body;
            const checkout = await stripe.checkout.sessions.create({
                line_items: [
                    {
                    price: 'price_1PF1yxL2gPnd81nsR92UExVw',
                    quantity: 1,
                    },
                ],
                mode: 'subscription',
                customer_email : session.user.email,
                success_url: `${req.headers.origin}/Payment/?Success`,
                cancel_url: `${req.headers.origin}/Payment/?Error`,
            });
            return  res.redirect(303, checkout.url) 
    
        } else {
            return res.status(405).json({status : false , message:"Methood Not Allowed"});
        }
    } catch (err) {
        console.log(err)
        return res.status(err.statusCode || 500).json({status : false , message:err.message});
    }
  }