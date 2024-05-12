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


        if (req.method === 'GET') {
            const products = await Package.find();
            res.status(201).json({status : true , message:"Products Fetched!", data: products });
        }
        else if (req.method === 'POST') {
            if(!user.isSuperUser) return res.status(404).json({status : false , message : "User not allowed."});

            const {  name, active , description, currency , ammount , interval , interval_count} = req.body;

            const localPackage = new Package({
                name,
                active,
                description,
                currency,
                ammount,
                interval,
                interval_count
            })
            const resuelt = await localPackage.save()
            if (resuelt){
                const product =  await stripe.products.create({
                    id :resuelt._id.toString(), // mongodb id 
                    name  : resuelt.name,
                    active :resuelt.active,
                    description :resuelt.description,
                    default_price_data : {
                        currency : resuelt.currency,
                        unit_amount_decimal : (resuelt.ammount *1000),
                        recurring :{
                            interval : resuelt.interval,
                            interval_count : resuelt.interval_count
                        },
                    },
                });
                const packageToUpdate = await Package.findByIdAndUpdate(resuelt._id, {"priceId" : product.default_price}, { new: true });
                console.log(packageToUpdate)
                return res.status(201).json({status : true , message : "Package Added Succesfully"});
            }
            else{
                return res.status(500).json({status : false , message : "Databse Error Occured"});
            }
        }
       
        else if (req.method === 'PUT') {
            if (!user.isSuperUser) return res.status(404).json({ status: false, message: "User not allowed." });
            const { _id, name, active , description, currency , ammount , interval , interval_count} = req.body;
            
            // Check for fields in the request body and update the corresponding fields in the package
            let updatedFields = {};
            if (name) updatedFields.name = name;
            if (active !== undefined) updatedFields.active = active;
            if (description) updatedFields.description = description;
            if (currency) updatedFields.currency = currency;
            if (ammount) updatedFields.ammount = ammount;
            if (interval) updatedFields.interval = interval;
            if (interval_count) updatedFields.interval_count = interval_count;
            
            const packageToUpdate = await Package.findByIdAndUpdate(_id, updatedFields, { new: true });

            if (!packageToUpdate) {
                return res.status(404).json({ status: false, message: "Package not found." });
            }
            // Update the package in Stripe based on the updated fields
                const price = await stripe.prices.create({
                        currency : packageToUpdate.currency,
                        unit_amount_decimal : (packageToUpdate.ammount *1000),
                        recurring :{
                            interval : packageToUpdate.interval,
                            interval_count : packageToUpdate.interval_count
                        },
                    product : packageToUpdate._id.toString()
                })


                const product = await stripe.products.update(_id, {
                    name  : packageToUpdate.name,
                    active :packageToUpdate.active,
                    description :packageToUpdate.description,
                    default_price : price.id
                });

                await Package.findByIdAndUpdate(_id, {"priceId" : product.default_price}, { new: true });


                return res.status(200).json({ status: true, message: "Package updated successfully.", data: product });
        }
        else if(req.method == "DELETE"){
            
            if(!user.isSuperUser) return res.status(404).json({status : false , message : "User not allowed."});
            const {id} = req.body;
            const deleted = await Package.findByIdAndDelete(id);``
            const product = await stripe.products.update(id, {
                active :false
            });
            if (deleted) {
                return res.status(200).json({ status: true, message: "Package deleted successfully." });
            } else {
                return res.status(404).json({ status: false, message: "Package not found." });
            }
        }
        else{
            res.status(404).json({status : false , message : "Methood Not Allowed"});
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}