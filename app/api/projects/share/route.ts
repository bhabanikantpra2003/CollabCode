import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { nanoid } from "nanoid";


export const POST = async (req: Request, res: Response) => {
    try{
        const { projectId } = await req.json();
        const shareId = nanoid(6);
        const project = await prisma.projects.findUnique({
            where: {
                id: projectId
            }
        }); 

        if (!project){
            return NextResponse.json({ message: 'Project not found' }, { status: 404 });
        }


        await prisma.projects.update({
            where: {
                id: projectId
            },
            data: {
                shareId
            },
        });

        return NextResponse.json({ shareId }, { status: 200 });
    }
    catch (error){
        console.log(error)
    }
}