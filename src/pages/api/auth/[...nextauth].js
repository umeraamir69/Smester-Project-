// [...nextauth].js
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import connectToDatabase from '../../../../middlewear/connectDb';
import bcrypt from 'bcrypt';


connectToDatabase();

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

                if(username =="admin"){
                    const hash  = '$2b$10$MW7Lbmd/YemuNvLd3/PGUemAbl3SqjONN0k1gP7B8B07jaMgWII5G'
                    const match = await bcrypt.compare(password, hash);
                    if(match === true) {
                        return {
                            email: "admin",
                            username: "admin",
                            name: "_admin",
                        };
                    }
                   
                }

                try {
                    const checkUser = await fetch(`${process.env.URL}/api/check-access/by-login-pass?_key=${process.env.API}&login=${username}&pass=${password}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    const userRes = await checkUser.json();
                    return {
                        email: userRes.email,
                        username: username,
                        name: userRes.name_f + " " + userRes.name_l,
                    };

                } catch (error) {
                    console.error('Error authorizing user:', error.message);
                    throw new Error(error.message); // Pass the error message to NextAuth
                }
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
        },
        async redirect({ url, baseUrl }) {
            if (url.includes('/auth/error') && !url.includes('Invalid%20subscription%20date')) {
                return `${baseUrl}/auth/error`;
            }
            return url.startsWith(baseUrl) ? url : baseUrl;
        }
    },
    pages: {
        signIn: "/auth/Login",
        newUser: '/auth/createAccount',
        error: '/auth/error'
    }
};


export default NextAuth(authOptions);
