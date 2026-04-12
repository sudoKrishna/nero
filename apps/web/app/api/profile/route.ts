import { NextResponse } from "next/server";
import { prisma } from "@nero/db";
import { getServerSession } from "next-auth";


export async function POST(req: Request) {
    try {
        const session = await getServerSession();

        if(!session?.user?.email) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const data = await req.json();

       
        const existingProfile = await prisma.profile.findUnique({
            where: { userId: user.id },
        });

        if (existingProfile) {
            return NextResponse.json(
                { error: "Profile already exists" },
                { status: 400 }
            );
        }


        const profile = await prisma.profile.create({
            data: {
 
                userId : user.id,

                firstName: data.firstName,
                lastName: data.lastName,
                location: data.location,
                role: data.role,
                experience: data.experience,
                isStudent: data.isStudent === "yes",
                school: data.school,
                graduationMonth: data.graduationMonth,
                graduationYear: data.graduationYear,
                majors: data.majors,
                degree: data.degree,
                jobTitle: data.jobTitle,
                company: data.company,
                unemployed: data.unemployed,
                linkedin: data.linkedin,
                website: data.website,
            },
        });

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({
            error: "Something went wrong"
        },
            {
                status: 500
            })
    }
}