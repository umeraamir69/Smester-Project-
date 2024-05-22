// [...nextauth].js
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';


export const authOptions = {
    secret: process.env.AUTH_SECRET,
    providers: [    
      Credentials({
          name: 'Credentials',
          credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              const { username, password } = credentials;
              const checkUser = await fetch(`${process.env.URL}/api/check-access/by-login-pass?_key=${process.env.API}&login=${username}&pass=${password}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              
              const userRes = await checkUser.json();


              
              const dsa = await asd.json();


              console.log(dsa)
              if(userRes.ok && userRes.subscriptions) {
                return {
                  email: userRes.email,
                  username: username,
                  name :userRes.name_f +" "+userRes.name_l,
                };
              }
              return null;
            }
      })  
    ],
    callbacks: {
      async session({ session, token, user }) {
        if (!session) return;
        session.user.email = token.email;
        session.user.name = token.name;
        return session;
      },
      async jwt({ token, user }) {
        if (user) {
          token.email = user.email;
          token.name = user.name;
        }
        return token;
      }
    },
    pages: {
      signIn: "/auth/Login",
      newUser: '/auth/createAccount',
      error: '/auth/error'
    },
}

export default NextAuth(authOptions);
