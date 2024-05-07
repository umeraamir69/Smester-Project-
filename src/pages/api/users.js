import User from '../../../models/User';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import verifyDbConnection from '../../../middlewear/dbVerification';
import verifyRequestOrigin from '../../../middlewear/verifyRequestOrigin';


export default async function handler(req, res){
    verifyDbConnection(req , res);
    verifyRequestOrigin(req , res);
    try{
        const session = await getServerSession(req, res, authOptions);
        if(session == null) return res.status(403).json({res : false , message : "Forbiden Login First"})
        const user = await User.findOne({email: session.user.email});


        if(req.method == "GET"){
            if(!user.isSuperUser) return res.status(404).json({res : false , message : "User not allowed."})
            const userdata = await User.find()
            return res.status(200).json({res:true ,message :"User Data Found." , data : userdata})
        }
    }
    catch(error){
        console.log(error)  
    }
}


