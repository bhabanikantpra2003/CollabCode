import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";


export const POST = async (req: Request, res: Response) => {
    try{
        const {projectId} = await req.json();

        const files = await prisma.files.findMany({
            where:{
                projectId
            },
            select:{
                id: true,
                name: true,
            }
        });

        return NextResponse.json(files, {status: 200});
    }
    catch(err){
        return NextResponse.json({message:'Error fetching files'},{status: 500});
    }
}