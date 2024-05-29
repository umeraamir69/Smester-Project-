import User from '../../../models/User';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import verifyDbConnection from '../../../middlewear/dbVerification';
import verifyRequestOrigin from '../../../middlewear/verifyRequestOrigin';
import bcrypt from 'bcrypt';

export default async function handler(req, res){
    verifyDbConnection(req , res);
    verifyRequestOrigin(req , res);
    try{
        const session = await getServerSession(req, res, authOptions);
        
        if(req.method == "GET"){
          const {page} = req.body
            if(session == null) return res.status(403).json({res : false , message : "Forbiden Login First"})
            
            if(!(session.user.email == 'admin'  && session.user.name =="_admin") ) return res.status(404).json({res : false , message : "User not allowed."})

            const request = await fetch(`${process.env.URL}/api/users?_key=${process.env.API}&_page=${page}`);
            const result = await request.json();
           
            return res.status(200).json({res:true ,message :"User Data Found." , data : result})
        }
        else if (req.method == "POST"){
            const {  username, password  } = JSON.parse(req.body)

                if(username =="admin"){
                    const hash  = '$2b$10$MW7Lbmd/YemuNvLd3/PGUemAbl3SqjONN0k1gP7B8B07jaMgWII5G'
                    const match = await bcrypt.compare(password, hash);
                    if(match == true) {
                        return res.status(200).json({res:true ,error :"Login" , code : 10})
                    }
                    return res.status(200).json({res:false ,error :"Invalid username or password" })
                }

                const checkUser = await fetch(`${process.env.URL}/api/check-access/by-login-pass?_key=${process.env.API}&login=${username}&pass=${password}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const userRes = await checkUser.json();
                console.log(userRes)

                if (!userRes.ok) {
                    return res.status(200).json({res:false ,error :"Invalid username or password" })
                }

                if (!userRes.subscriptions || Object.keys(userRes.subscriptions).length === 0) {
                    return res.status(200).json({res:false ,error :"No subscriptions found" ,  code:-10 })
                }

                const today = new Date();
                const subscriptionKey = Object.keys(userRes.subscriptions)[0];
                const subscriptionDate = new Date(userRes.subscriptions[subscriptionKey]);


                if (isNaN(subscriptionDate.getTime())) {
                    return res.status(200).json({res:false ,error :"No subscription Found" , code:-10 })
                }

                if (today >= subscriptionDate) {
                    return res.status(200).json({res:false ,error :"Subscription expired",  code:-10 })
                }

                return res.status(200).json({res:true ,error :"Login" , code : 10})


        }
        else if (req.method == "PUT") {
            if(session == null) return res.status(403).json({res : false , message : "Forbiden Login First"})
            
                if (!(session.user.email == 'admin'  && session.user.name =="_admin" ))  return res.status(404).json({res : false , message : "User not allowed."})

            const { _id, name, email, userType, isSuperUser } = req.body;
        
        
        
            let updatedFields = {};
            if (name) updatedFields.name = name;
            if (email) updatedFields.email = email;
            if (userType) updatedFields.userType = userType;
            if (isSuperUser !== undefined) updatedFields.isSuperUser = isSuperUser;
        
            try {
                const result = await User.findByIdAndUpdate(_id, updatedFields, { new: true });
                console.log(result)
        
                if (result) {
                    return res.status(200).json({ res: true, error: "User Updated.", data: result });
                } else {
                    return res.status(404).json({ res: false, error: "User not found." });
                }
            } catch (error) {
                console.error("An error occurred while updating user:", error);
                return res.status(500).json({ res: false, error: "An error occurred." });
            }
        }
        else if(req.method === "DELETE") {
            if(session == null) return res.status(403).json({res : false , message : "Forbiden Login First"})
               
                if (!(session.user.email == 'admin'  && session.user.name =="_admin" ))   return res.status(404).json({res : false , message : "User not allowed."})

            const { id } = req.body;
        
            try {
                const deletedUser = await User.findByIdAndDelete(id);
        
                if (deletedUser) {
                    return res.status(200).json({ res: true, message: "User deleted successfully." });
                } else {
                    return res.status(404).json({ res: false, message: "User not found." });
                }
            } catch (error) {
                console.error("An error occurred while deleting user:", error);
                return res.status(500).json({ res: false, message: "An error occurred." });
            }
        }
        
        

        return res.status(500)
    }
    catch(error){
        console.log(error)  
        return res.status(500)
    }
}


