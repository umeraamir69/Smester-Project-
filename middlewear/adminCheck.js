import { getServerSession } from "next-auth";
import User from "../models/User";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getSessionAndRedirect(context) {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (!session) {
        return {
            redirect: {
                destination: '/auth/Login',
                permanent: false,
            },
        };
    } else {
        const user = await User.findOne({ "email": session.user.email });
        if (user && user.isSuperUser) {
            return {
                props: {
                    data: "ok"
                },
            };
        }
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
}
