import verifyRequestOrigin from '../../../middlewear/verifyRequestOrigin';
import verifyDbConnection from '../../../middlewear/dbVerification';
import User from '../../../models/User';
import Team from '../../../models/Team';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import Leagues from '../../../models/Leagues';

export default async function handler(req, res){
    verifyDbConnection(req , res);
    verifyRequestOrigin(req , res);
    try{
        const session = await getServerSession(req, res, authOptions);
        if(session == null) return res.status(403).json({res : false , message : "Forbidden. Login First"});

        if(req.method == "GET"){
            if (req.body.id) {
                const team = await Team.findById(req.body.id).populate('league');
                if (team) {
                    return res.status(200).json({status:true ,message :"Team Found." , data : team})
                } else {
                    return res.status(404).json({status : false , error: "Team not found" });
                }
            } else {
                const teams = await Team.find().populate('league');
                return res.status(200).json({status:true ,message :"All Team." , data : teams})
            }
        }
        else if(req.method == "POST"){
            const user = await User.findOne({email: session.user.email});
            if(!user.isSuperUser) return res.status(404).json({res : false , message : "User not allowed."});

            const { name, logoLink, league } = req.body;

            let data = new Team({
                name,
                logoLink,
                league
            });

            const result = await data.save();
            return res.status(201).json({ status: true, message: "Team Added Successfully" , data : result });
        } 
        else if (req.method === "PUT") {
            const user = await User.findOne({email: session.user.email});
            if(!user.isSuperUser) return res.status(404).json({res : false , message : "User not allowed."});

            const { _id, name, logoLink, league } = req.body;
        
            let updatedFields = {};
            if (name) updatedFields.name = name;
            if (logoLink) updatedFields.logoLink = logoLink;
            if (league) updatedFields.league = league;
        
            try {
                const result = await Team.findByIdAndUpdate(_id, updatedFields, { new: true });
        
                if (result) {
                    return res.status(200).json({ status: true, message: "Team Updated.", data: result });
                } else {
                    return res.status(404).json({ status: false, error: "Team not found." });
                }
            } catch (error) {
                console.error("An error occurred while updating team:", error);
                return res.status(500).json({ status: false, error: "An error occurred." });
            }
        } 
        else if (req.method === "DELETE") {
            const user = await User.findOne({email: session.user.email});
            if(!user.isSuperUser) return res.status(404).json({res : false , message : "User not allowed."});

            const { id } = req.body;
        
            try {
                const deletedTeam = await Team.findByIdAndDelete(id);
        
                if (deletedTeam) {
                    return res.status(200).json({ status: true, message: "Team deleted successfully." });
                } else {
                    return res.status(404).json({ status: false, message: "Team not found." });
                }
            } catch (error) 
                {
                    console.error("An error occurred while deleting team:", error);
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
