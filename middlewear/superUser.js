import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function superUserChecker(context) {
    const session = await getServerSession(context.req, context.res, authOptions);
    console.log(session.user.name)
    if (session && session.user.name == "admin") {
        
        return true;
    }
    else{
        return false;
    }
}
