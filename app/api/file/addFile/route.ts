import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export const POST = async (req: Request, res: Response) => {    
    try {
        const {name, language, projectId, code} = await req.json();

        const file = await prisma.files.create({
            data: {
                name,
                language,
                project: {
                    connect: {
                        id: projectId
                    }
                }
            }
        });

        const fileId = file.id;

        const codeF = await prisma.codes.create({
            data: {
                code,
                file: {
                    connect: {
                        id: fileId
                    }
                }
            }
        });

        return NextResponse.json({fileId}, {status: 200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'Error adding file'}, {status: 500});
    }
}