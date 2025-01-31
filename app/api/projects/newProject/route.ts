import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import client from "@/app/lib/redis/db";

export const POST = async(req: Request) => {
  try {
    const { name, userId } = await req.json();
    
    const existingProject = await prisma.projects.findFirst({ 
      where: { name, userId }
    });

    if (existingProject) {
      return NextResponse.json({
        message: "Project already exists",
        project: existingProject
      }, { status: 400 });
    }

    const newProject = await prisma.projects.create({
      data: { name, userId }
    });

    await prisma.participants.create({
      data: {
        projectId: newProject.id,
        userId
      }
    });

    await client.sadd(`project:${newProject.id}`, userId);

    return NextResponse.json({
      message: "Project created successfully",
      project: newProject
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ 
      message: "Error creating project" 
    }, { status: 500 });
  }
}
