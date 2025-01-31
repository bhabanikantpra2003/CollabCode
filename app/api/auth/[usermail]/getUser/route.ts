//for getting user data
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export const GET = async (
  req: Request,
  { params }: { params: { usermail: string } }
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: params.usermail,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user" },
      { status: 500 }
    );
  }
};
