import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import  client from "@/app/lib/redis/db";

export const POST = async (req: Request, res: Response) => {
    try{
        const { projectId } = await req.json();
        const participants = await prisma.participants.findMany({
            where: {
                projectId
            },
            select: {
                user :{
                    select:{
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                }
            }
        });

        const availableUser = await client.smembers(`project:${projectId}`);

        const filterParticipants = participants.filter((val) => availableUser.includes(val.user.id));

        return NextResponse.json(filterParticipants, { status: 200 });
    }
    catch(err){
        return NextResponse.json({message: "Internal Server Error"}, { status: 500 });
    }
}