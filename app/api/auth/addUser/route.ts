import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/app/lib/Apis/ApiResponse";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
    try{
        const {name, email, image} = await req.json();

        if(!name || !email){
            return NextResponse.json(new ApiResponse({status: 400, message: 'Please provide all the required fields'}))
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                image
            }
        })

        return NextResponse.json(new ApiResponse({status: 201, message: 'User created successfully'}))
    }
    catch(e){
        return NextResponse.json(new ApiResponse({status: 500, message: (e as Error).message}))
    }
    finally{
        await prisma.$disconnect()
    }
}


export const GET = async (req: Request) => {
    try{
        const {email} = await req.json();

        const getUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!getUser){
            return NextResponse.json(new ApiResponse({status: 404, message: 'User not found'}))
        }

        return NextResponse.json(new ApiResponse({status: 200, message: getUser.id}));
    }
    catch(e){
        return NextResponse.json(new ApiResponse({status: 500, message: (e as Error).message}))
    }
    finally{
        await prisma.$disconnect()
    }
}