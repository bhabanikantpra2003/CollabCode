import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export const POST = async (req: Request, res: Response) => {    
    try{
        const { projectId } = await req.json();
        const owner = await prisma.projects.findFirst({
            where: {
                id: projectId
            },
            select: {
                userId: true
            }
        });

        if (!owner){
            return NextResponse.json({message: "Project not found"}, { status: 404 });
        }

        return NextResponse.json(owner, { status: 200 });
    }
    catch (err){
        return NextResponse.json({message: "Internal Server Error"}, { status: 500 });
    }
}