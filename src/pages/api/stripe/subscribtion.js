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

        if(req.method == "DELETE"){
            const {id} = req.body;
            const subscription = await stripe.subscriptions.cancel(id);
            return res.status(203).json({status : true })
        }
        else{
            res.status(404).json({status : false , message : "Methood Not Allowed"});
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}