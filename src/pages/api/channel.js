import verifyRequestOrigin from '../../../middlewear/verifyRequestOrigin';
import verifyDbConnection from '../../../middlewear/dbVerification';
import User from '../../../models/User';
import Channel from '../../../models/Channel';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res){
    verifyDbConnection(req , res);
    verifyRequestOrigin(req , res);
    try{



    const session = await getServerSession(req, res, authOptions);
    if(session == null) return res.status(403).json({res : false , message : "Forbiden Login First"})
    const user = await User.findOne({email: session.user.email});
    // if(!user.isSuperUser) return res.status(404).json({res : false , message : "User not allowed."})

    if(req.method == "GET"){
        if (req.body.id) {
            const channel = await Channel.findById(req.body.id);
            if (channel) {
                return res.status(200).json({status:true ,message :"Channel Found." , data : channel})
            } else {
                return res.status(404).json({status : false , error: "Channel not found" });
            }
        } else {
            const channels = await Channel.find();
            return res.status(200).json({status:true ,message :"All Channels." , data : channels})
        }
    }
    else if(req.method == "POST"){

            if(!user.isSuperUser) return res.status(404).json({res : false , message : "User not allowed."})
            const { name, liveStreamLink, logoLink , isAllowFree ,isLive , otherHeaderLink} = req.body;


            let data = new Channel({
                name,
                liveStreamLink,
                logoLink,
                isAllowFree,
                otherHeaderLink,
                isLive
            });


            const result = await data.save();
            return res.status(201).json({ status: true, message: "Channel Added Succesfully" , data : result });
    } 
    
    else if (req.method === "PUT") {
        if(!user.isSuperUser) return res.status(404).json({res : false , message : "User not allowed."})
        const { _id, name, liveStreamLink, logoLink, isAllowFree, isLive , otherHeaderLink } = req.body;
    
        let updatedFields = {};
        if (name) updatedFields.name = name;
        if (liveStreamLink) updatedFields.liveStreamLink = liveStreamLink;
        if (logoLink) updatedFields.logoLink = logoLink;
        if (otherHeaderLink) updatedFields.otherHeaderLink = otherHeaderLink;
        if (isAllowFree !== undefined) updatedFields.isAllowFree = isAllowFree;
        if (isLive !== undefined) updatedFields.isLive = isLive;
    
        try {
            const result = await Channel.findByIdAndUpdate(_id, updatedFields, { new: true });
            console.log(result);
    
            if (result) {
                return res.status(200).json({ status: true, message: "Channel Updated.", data: result });
            } else {
                return res.status(404).json({ status: false, error: "Channel not found." });
            }
        } catch (error) {
            console.error("An error occurred while updating channel:", error);
            return res.status(500).json({ status: false, error: "An error occurred." });
        }
    } else if (req.method === "DELETE") {
        if(!user.isSuperUser) return res.status(404).json({res : false , message : "User not allowed."})
        const { id } = req.body;
    
        try {
            const deletedChannel = await Channel.findByIdAndDelete(id);
    
            if (deletedChannel) {
                return res.status(200).json({ status: true, message: "Channel deleted successfully." });
            } else {
                return res.status(404).json({ status: false, message: "Channel not found." });
            }
        } catch (error) 
            {
                console.error("An error occurred while deleting channel:", error);
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

