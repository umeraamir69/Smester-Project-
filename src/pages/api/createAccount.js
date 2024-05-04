import verifyRequestOrigin from '../../../middlewear/verifyRequestOrigin';
import verifyDbConnection from '../../../middlewear/dbVerification';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default async function handler(req, res){
    verifyDbConnection(req , res);
    verifyRequestOrigin(req , res);
    
    if(req.method === "POST"){
        try {
            const { name, email, password } = req.body;

            // Validate email
            if (!email || typeof email !== 'string' || !isValidEmail(email)) {
                return res.status(400).json({ status: false, error: "Valid email address is required." });
            }

            //checking email doesn't exist

            if (await User.findOne({ email: email })) 
            {
                return res.status(400).json({ status: false, error: "Email already exists." });
            }
            

            // Validate name
            if (!name || typeof name !== 'string' || name.trim() === '') {
                return res.status(400).json({ status: false, error: "Name is required." });
            }
          
            // Validate password
            if (!password || typeof password !== 'string' || password.length < 6 || !containsDigitAndLetter(password)) {
                return res.status(400).json({ status: false, error: "Password must be at least 6 characters long and contain both digits and letters." });
            }

            let data = new User({
                name: name,
                email: email,
                password: await bcrypt.hash(password, 10)
            });

            const result = await data.save();

            const token = jwt.sign({
                name: result.name,
                email: result.email,
                userId: result._id,
            }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

            return res.status(201).json({ status: true, message: "Account Created Successfully!", data: token, id: result._id });
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, error: "Internal Server Error." });
        }  
    } else {
        return res.status(405).json({ status: false, error: "Method Not Allowed." });
    }
}

// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to validate if a string contains both digits and letters
function containsDigitAndLetter(str) {
    return /[a-zA-Z]/.test(str) && /\d/.test(str);
}
