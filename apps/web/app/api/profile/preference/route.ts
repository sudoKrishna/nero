import { NextResponse } from "next/server";
import { prisma } from "@nero/db";
import { getServerSession } from "next-auth";


export async function POST(req: Request) {
    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({
                error: "user not found"
            }, { status: 404 });
        }
        const data = await req.json();

        const existingPreference = await prisma.profile.findUnique({
            where: { userId: user.id }
        });

        if (existingPreference) {
            return NextResponse.json({ error: "Profile already exists" }, { status: 400 });
        }


        const preference = await prisma.preference.create({
            data: {
                userId: user.id,
                jobSearch: data.jobSearch,
                jobinterested: data.jobinterested,
                desiredsalary: data.desiredsalary,
                role: data.role,
                location: data.location,
                usauthorization: data.usauthorization,
                companiessizes: data.companiessizes,
            },
        });

        return NextResponse.json({ success  : true})
    } catch (error) {
        return NextResponse.json({
            error : "Something went wrong"
        },
     { status  : 500}
    )
    }
}