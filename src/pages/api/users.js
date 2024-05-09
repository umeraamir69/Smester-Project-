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
        if(session == null) return res.status(403).json({res : false , message : "Forbiden Login First"})
        const user = await User.findOne({email: session.user.email});
        if(!user.isSuperUser) return res.status(404).json({res : false , message : "User not allowed."})


        if(req.method == "GET"){
           
            const userdata = await User.find()
            return res.status(200).json({res:true ,message :"User Data Found." , data : userdata})
        }

        else if (req.method == "POST"){
            const { name, email, password ,userType , isSuperUser } = req.body;



            if (await User.findOne({ email: email })) 
            {
                return res.status(400).json({ res: false, error: "Email already exists." });
            }
            
          
            // Validate password
            if (!password || typeof password !== 'string' || password.length < 6 || !containsDigitAndLetter(password)) {
                return res.status(400).json({ res: false, error: "Password must be at least 6 characters long and contain both digits and letters." });
            }

            let data = new User({
                name: name,
                email: email,
                password: await bcrypt.hash(password, 10),
                userType :userType,
                isSuperUser: isSuperUser
            });

            const result = await data.save();
            return res.status(200).json({ res: true, error: "User Added.", data:result});
        }
        else if (req.method == "PUT") {
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

function containsDigitAndLetter(str) {
    return /[a-zA-Z]/.test(str) && /\d/.test(str);
}

