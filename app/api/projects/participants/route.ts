import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import client from "@/app/lib/redis/db";

export async function POST(req:Request, res: Response) {
  try{
    const { projectId, userId } = await req.json();  
    
    const project = await prisma.projects.findUnique({
        where: { id: projectId },
    });
    if (!project) {
        return NextResponse.json({message: "Project not found"}, { status: 404 });
    }

    const participantExists = await prisma.participants.findFirst({
        where: {
            projectId,
            userId
        }
    });

    if(participantExists){
        await client.sadd(`project:${projectId}`,userId);
        return NextResponse.json({message: "Participant already exists"}, { status: 200 });
    }
    
    await prisma.participants.create({
        data: {
            projectId,
            userId
        }
    });

    await client.sadd(`project:${projectId}`,userId);
    return NextResponse.json({message: "Participant added successfully"}, { status: 200 });
    }
    catch(err){
        console.log(err);
        return NextResponse.json({message: "Internal Server Error"}, { status: 500 });
    }
}