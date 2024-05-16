const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
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
            const { priceId } = req.query;

            const customer = await stripe.customers.search({
                query: `email:'${session.user.email}'`
              });

              let checkout;
              if(customer.data.length > 0){
                console.log("first called first")
                   checkout = await stripe.checkout.sessions.create({
                      line_items: [
                          {
                              price: priceId,
                              quantity: 1,
                            },
                        ],
                        mode: 'subscription',

                        success_url: `${req.headers.origin}/auth/AccountDetails?success`,
                        cancel_url: `${req.headers.origin}/auth/AccountDetails?error`,
                        // customer_creation: "if_required",
                        customer : customer.data[0].id 
                    });
                }
                else{
                     checkout = await stripe.checkout.sessions.create({
                        line_items: [
                            {
                                price: priceId,
                                quantity: 1,
                              },
                          ],
                          mode: 'subscription',
                          customer_email : session.user.email,
                          success_url: `${req.headers.origin}/auth/AccountDetails?success`,
                          cancel_url: `${req.headers.origin}/auth/AccountDetails?error`,
                        //   customer_creation: "if_required"
                      });
                }
                return  res.redirect(303, checkout.url) 
    
        } else {
            return res.status(405).json({status : false , message:"Methood Not Allowed"});
        }
    } catch (err) {
        console.log(err)
        return res.status(err.statusCode || 500).json({status : false , message:err.message});
    }
  }