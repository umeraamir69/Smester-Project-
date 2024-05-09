// [...nextauth].js
import NextAuth from 'next-auth';
import bcrypt from 'bcrypt';
import Google from 'next-auth/providers/google';
import connectToDatabase from '../../../../middlewear/connectDb';
import User from '../../../../models/User';
import Credentials from 'next-auth/providers/credentials';




await connectToDatabase()

export const authOptions = {
    secret: process.env.AUTH_SECRET,
    providers: [    
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackUrl: process.env.NEXTAUTH_URL 
      }), 
      Credentials({
          name: 'Credentials',
          credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              const { username, password } = credentials;
              const user = await User.findOne({email : username});
              if (user && bcrypt.compareSync(password, user.password)) {
                console.log(user.name , "Login Succesfully");
                return user;
              }
              else {
                return Promise.resolve('/auth/error');
                

              }
            }
      })  
  ],

    pages: {
      signIn: "/auth/Login",
      newUser: '/auth/createAccount',
      error: '/auth/error'
    },

  callbacks: {
    async signIn({ user}) {
      await connectToDatabase();
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser === null) {
          const newUser = new User({
              name: user.name,
              email: user.email,
              userType: "standard",
              isSuperUser: false
          });
          const result = await newUser.save();
          console.log("New user saved:", result);
      } 
      return true;
    },
  }
}
export default NextAuth(authOptions)



