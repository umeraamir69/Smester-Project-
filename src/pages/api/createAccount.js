import verifyRequestOrigin from '../../../middlewear/verifyRequestOrigin';
import verifyDbConnection from '../../../middlewear/dbVerification';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default async function handler(req, res){
    verifyDbConnection(req , res);
    verifyRequestOrigin(req , res);
    
    if(req.method === "POST"){
        try {
            const { Fname, Lname ,  email, password  , username} = req.body;

            // Validate email
            if (!email || typeof email !== 'string' || !isValidEmail(email)) {
                return res.status(400).json({ status: false, error: "Valid email address is required." });
            }

            // Validate name
            if (!Fname || typeof Fname !== 'string' || Fname.trim() === '' || !Lname || typeof Lname !== 'string' || Lname.trim() === '') {
                return res.status(400).json({ status: false, error: "First and Last name is required." });
            }
            
            // Validate password
            if (!password || typeof password !== 'string' || password.length < 6 || !containsDigitAndLetter(password)) {
                return res.status(400).json({ status: false, error: "Password must be at least 6 characters long and contain both digits and letters." });
            }

            // checking email doesn't exist

            const checkEmail = await fetch(`${process.env.URL}/api/check-access/by-email?_key=${process.env.API}&email=${email}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'X-API-Key' : process.env.API
                },
              })    
            const emailRes = await checkEmail.json()
            if(emailRes.ok && emailRes.user_id && emailRes.email && emailRes.login) return res.status(400).json({ status: false, error: "Email already exists." }); ; 

            // Check username doesn't exist

            const checkUser = await fetch(`${process.env.URL}/api/check-access/by-login?_key=${process.env.API}&login=${username}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              })
            const userRes = await checkUser.json()
            if(userRes.ok && userRes.user_id && userRes.email && userRes.login) return res.status(400).json({ status: false, error: "Username already exists." }); ; 


            // creating user
            const createUser = await fetch(`${process.env.URL}/api/users?_key=${process.env.API}&login=${username}&pass=${password}&email=${email}&name_f=${Fname}&name_l=${Lname}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-API-Key' : process.env.API,
                },
              })
            const userees = await createUser.json()
            console.log(userees)
            if(userees.length> 0 && userees[0].user_id){
                const newUser = await fetch(`${process.env.URL}/api/users/${userees[0].user_id}?_key=${process.env.API}&login=${username}&pass=${password}&email=${email}&name_f=${Fname}&name_l=${Lname}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      'X-API-Key' : process.env.API,
                    },
                  })
                const userData = await newUser.json();
                if(!userData.ok && userData.error){
                    return res.status(400).json({ status: false, error: "Username or Password already exists." });
                }

                const token = jwt.sign({
                  name: userData.name_f + " "+ userData.name_l,
                  email:  userData.email,
                  username:  userData.login,
              }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  
              return res.status(201).json({ status: true, message: "Account Created Successfully!" ,  token , userData});
            }
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
