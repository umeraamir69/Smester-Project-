import verifyRequestOrigin from '../../../middlewear/verifyRequestOrigin';
import verifyDbConnection from '../../../middlewear/dbVerification';
import User from '../../../models/User';
import Contact from '../../../models/Contact';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res){
    verifyDbConnection(req , res);
    verifyRequestOrigin(req , res);
    try{

        const session = await getServerSession(req, res, authOptions);
        if(session == null) return res.status(403).json({res : false , message : "Forbiden Login First"})
        const user = await User.findOne({email: session.user.email});


    if(req.method == "GET"){
        if(!user.isSuperUser) return res.status(404).json({res : false , message : "User not allowed."})

        const data = await Contact.find();
        return res.status(200).json({status:true ,message :"Contacts Found." , data : data})
    }
    else if(req.method == "POST"){

        const { name,email , message} = req.body;

            let data = new Contact({
                name,
                email : email,
                message
            });
            await data.save();
            return res.status(201).json({ status: true, message: "Our represantative will contact u soon" });
    } 
    else if (req.method === "PUT") {

        if(!user.isSuperUser) return res.status(404).json({res : false , message : "User not allowed."})
        
        const {_id, name,email , message ,comments , solved} = req.body;
    
        let updatedFields = {};
        if (name) updatedFields.name = name;
        if (email) updatedFields.email = email;
        if (message) updatedFields.message = message;
        if (comments) updatedFields.comments = comments;
        if (solved !== undefined) updatedFields.solved = solved;
    
        try {
            const result = await Contact.findByIdAndUpdate(_id, updatedFields, { new: true });
    
            if (result) {
                return res.status(200).json({ status: true, message: "Contact Updated.", data: result });
            } else {
                return res.status(404).json({ status: false, message: "Contact not found." });
            }
        } catch (error) {
            return res.status(500).json({ status: false, message: "An error occurred." });
        }
    } 
    else if (req.method === "DELETE") {
        if(!user.isSuperUser) return res.status(404).json({status : false , message : "User not allowed."})
        const { id } = req.body;
    
        try {
            const deletedChannel = await Contact.findByIdAndDelete(id);
    
            if (deletedChannel) {
                return res.status(200).json({ status: true, message: "Contact deleted successfully." });
            } else {
                return res.status(404).json({ status: false, message: "Contact not found." });
            }
        } catch (error) 
            {
                return res.status(500).json({ status: false, message: "An error occurred." });
            }
    }
    else {
        return res.status(405).json({ status: false, message: "Method Not Allowed." });
    }
    }
    catch (error){
        return res.status(404).json({ status: false, message: error});
    }

}

