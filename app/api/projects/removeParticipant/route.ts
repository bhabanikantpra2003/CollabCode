import { NextResponse } from "next/server";
import  client from "@/app/lib/redis/db";

export const POST = async(req: Request) => {
    try{
        const {projectId, userId} = await req.json();
        const check = await client.sismember(`project:${projectId}`,userId);

        if(!check) return NextResponse.json({message: 'User is not a member'}, {status: 404});
        await client.srem(`project:${projectId}`,userId);

        return NextResponse.json({message: 'User removed'}, {status: 200});
    }
    catch(err){
        return NextResponse.json({message: 'Internal server error'}, {status: 500});
    }
}