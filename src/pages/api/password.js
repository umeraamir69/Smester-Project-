import verifyRequestOrigin from '../../../middlewear/verifyRequestOrigin';
import verifyDbConnection from '../../../middlewear/dbVerification';
import User from '../../../models/User';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcrypt';
import { authOptions } from './auth/[...nextauth]';


export default async function handler(req, res){
    verifyDbConnection(req , res);
    verifyRequestOrigin(req , res);
    try{
        const session = await getServerSession(req, res, authOptions);
        if(session == null) return res.status(403).json({res : false , message : "Forbidden. Login First"});

        if(req.method == "POST"){ 
            const { oldpass, newpass ,cnfrmpass} = req.body;

            if(cnfrmpass !== newpass){
                return res.status(400).json({ status: false, message: "Password Does Not matche." });
            }

            if (!newpass || typeof newpass !== 'string' || newpass.length < 6 || !containsDigitAndLetter(newpass)) {
                return res.status(400).json({ status: false, message: "Password must be at least 6 characters long and contain both digits and letters." });
            }

            if(oldpass !== undefined){
                const user = await User.findOne({email : session.user.email})
                if (bcrypt.compareSync(oldpass, user.password)) {
                    await User.findOneAndUpdate({email:session.user.email} ,{password : await bcrypt.hash(newpass, 10)})
                    return res.status(201).json({ status: true, message: "Password Change Successfully"  });
                }else{
                    return res.status(201).json({ status: false, message: "old Passwrod Not matched."  });
                }
            }else{
                await User.findOneAndUpdate({email:session.user.email} ,{password : await bcrypt.hash(newpass, 10)})
                return res.status(201).json({ status: true, message: "Password Change Successfully"  });
            }

        } 
        
        else {
            return res.status(405).json({ status: false, message: "Method Not Allowed." });
        }
    }
    catch (error){
        console.log(error)
        return res.status(404).json({ status: false, message: error});
    }
}



// Function to validate if a string contains both digits and letters
function containsDigitAndLetter(str) {
    return /[a-zA-Z]/.test(str) && /\d/.test(str);
}
