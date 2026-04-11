import { prisma } from "@nero/db";
import bcrypt from "bcryptjs";
import { error } from "console";

export async function POST(req : Request) {
    const body = await req.json();

    const {email , password , name} = body;

    const exittingUser = await prisma.user.findUnique({
        where : {email}
    });

    if(exittingUser) {
        return Response.json({error : "User exists"} , {status : 400});
    }

    const hashedPassword = await bcrypt.hash(password , 10);

    const user = await prisma.user.create({
        data :  {
            email,
            name,
            password : hashedPassword,
        },
    });
    
    return Response.json({ user })
}