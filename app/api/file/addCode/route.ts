import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export const POST = async (req:Request, res: Response) => {
    try{
        const {fileId, code} = await req.json();
        const file = await prisma.files.findUnique({
            where: { id: fileId },
        });
        if (!file) {
            return NextResponse.json({message: "File not found"}, { status: 404 });
        }

        await prisma.codes.update({
            where: { fileId: fileId },
            data: {
                code
            }
        });

        return NextResponse.json({message: "Code added successfully"}, { status: 200 });
    }
    catch(err){
        console.log(err);
        return NextResponse.json({message: "Internal Server Error"}, { status: 500 });
    }
}