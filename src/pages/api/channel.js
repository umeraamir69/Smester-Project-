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

    if(req.methood = "GET"){
        if (req.body.id) {
            const channel = await Channel.findById(req.body.id);
            if (channel) {
                return res.status(200).json({res:true ,message :"Channel Found." , data : channel})
            } else {
                return res.status(404).json({res : false , error: "Channel not found" });
            }
        } else {
            const channels = await Channel.find();
            return res.status(200).json({res:true ,message :"All Channels." , data : channels})
        }
    }
    else if(req.method === "POST"){

            if(!user.isSuperUser) return res.status(404).json({res : false , message : "User not allowed."})
            const { name, liveStreamLink, logoLink , isAllowFree ,isLive} = req.body;

            let data = new Channel({
                name,
                liveStreamLink,
                logoLink,
                isAllowFree,
                isLive
            });
            console.log(data)

            const result = await data.save();
            console.log("result" , result)
            return res.status(201).json({ status: true, message: "Channel Added Succesfully" , data : result });
    } else {
        return res.status(405).json({ status: false, error: "Method Not Allowed." });
    }
    }
    catch (error){
        console.log(error)
        return res.status(404).json({ status: false, error: error});
    }

}

