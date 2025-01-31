import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export const POST = async (req: Request, res: Response) => {
    try{
        const { id } = await req.json();
        const project = await prisma.projects.findUnique({
            where:{
                id
            },
            select:{
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
                userId: true,
                shareId: true,
                files: {
                    select: {
                        id: true,
                        name: true,
                        language: true
                    },
                    orderBy: {
                        name: 'asc'
                    },
                }
            }
        })
        if(!project){
            return NextResponse.json({error: 'Project not found'}, {status: 404});
        }

        return NextResponse.json(project);
    }
    catch(err){
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
}