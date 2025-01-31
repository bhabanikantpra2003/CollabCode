import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
//update the user route

export const GET = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.userId,
      },
      select: {
        projects: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: {
            updatedAt: "desc",
          },
        },
      },
    });

    const participatedProjects = await prisma.participants.findMany({
      where: {
        userId: params.userId,
      },
      select: {
        project: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            shareId: true,
          },
        },
      },
    });

    const userProject =
      user !== null
        ? user.projects.map((project) => ({ ...project, type: "owner" }))
        : [];

    const filterParticipant = participatedProjects.filter(
      (project) =>
        !userProject.some((userProj) => userProj.id === project.project.id)
    );

    const allProjects = [
      ...userProject,
      ...filterParticipant.map((project) => ({
        ...project.project,
        type: "participant",
      })),
    ];

    allProjects.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      }
      if (a.updatedAt < b.updatedAt) {
        return 1;
      }
      return 0;
    });

    return NextResponse.json({ projects: allProjects }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
