import verifyRequestOrigin from '../../../middlewear/verifyRequestOrigin';
import verifyDbConnection from '../../../middlewear/dbVerification';
import User from '../../../models/User';
import Leagues from '../../../models/Leagues'; // Import the Leagues model
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res){
    verifyDbConnection(req , res);
    verifyRequestOrigin(req , res);
    try{

        const session = await getServerSession(req, res, authOptions);
        if(session == null) return res.status(403).json({res : false , message : "Forbidden. Login First"});


        if(req.method == "GET"){
            if (req.body.id) {
                const league = await Leagues.findById(req.body.id);
                if (league) {
                    return res.status(200).json({status:true ,message :"League Found." , data : league})
                } else {
                    return res.status(404).json({status : false , error: "League not found" });
                }
            } else {
                const leagues = await Leagues.find();
                return res.status(200).json({status:true ,message :"All Leagues." , data : leagues})
            }
        }
        else if(req.method == "POST"){
            const user = await User.findOne({email: session.user.email});
            if(!user.isSuperUser) return res.status(404).json({res : false , message : "User not allowed."});

            const { name, logoLink } = req.body;

            let data = new Leagues({
                name,
                logoLink
            });

            const result = await data.save();
            return res.status(201).json({ status: true, message: "League Added Successfully" , data : result });
        } 
        else if (req.method === "PUT") {
            const user = await User.findOne({email: session.user.email});
            if(!user.isSuperUser) return res.status(404).json({res : false , message : "User not allowed."});

            const { _id, name, logoLink } = req.body;
        
            let updatedFields = {};
            if (name) updatedFields.name = name;
            if (logoLink) updatedFields.logoLink = logoLink;
        
            try {
                const result = await Leagues.findByIdAndUpdate(_id, updatedFields, { new: true });
        
                if (result) {
                    return res.status(200).json({ status: true, message: "League Updated.", data: result });
                } else {
                    return res.status(404).json({ status: false, error: "League not found." });
                }
            } catch (error) {
                console.error("An error occurred while updating league:", error);
                return res.status(500).json({ status: false, error: "An error occurred." });
            }
        } 
        else if (req.method === "DELETE") {
            const user = await User.findOne({email: session.user.email});
            if(!user.isSuperUser) return res.status(404).json({res : false , message : "User not allowed."});
            
            const { id } = req.body;
        
            try {
                const deletedLeague = await Leagues.findByIdAndDelete(id);
        
                if (deletedLeague) {
                    return res.status(200).json({ status: true, message: "League deleted successfully." });
                } else {
                    return res.status(404).json({ status: false, message: "League not found." });
                }
            } catch (error) 
                {
                    console.error("An error occurred while deleting league:", error);
                    return res.status(500).json({ status: false, message: "An error occurred." });
                }
        } 
        else {
            return res.status(405).json({ status: false, error: "Method Not Allowed." });
        }
    }
    catch (error){
        console.log(error)
        return res.status(404).json({ status: false, error: error});
    }
}
