const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import User from "../../../../models/User";
import Package from "../../../../models/Package";
import verifyRequestOrigin from '../../../../middlewear/verifyRequestOrigin';
import verifyDbConnection from "../../../../middlewear/dbVerification";

export default async function handler(req, res) {
    verifyDbConnection(req , res);
    verifyRequestOrigin(req , res);    
    
    try{
        const session = await getServerSession(req, res, authOptions);
        if(session == null) return res.status(403).json({status : false , message : "Forbidden. Login First"});
        const user = await User.findOne({email: session.user.email});
        if(!user.isSuperUser) return res.status(404).json({status : false , message : "User not allowed."});


        if (req.method === 'GET') {
            const balanceTransactions = await stripe.balanceTransactions.list();
            res.status(201).json({status : true , message:"Balance Fetched!", data: balanceTransactions.data });
        }
        else{
            res.status(404).json({status : false , message : "Methood Not Allowed"});
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}