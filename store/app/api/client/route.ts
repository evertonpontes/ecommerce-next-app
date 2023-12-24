import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const client = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        email: client?.email,
      },
    });

    if (user) {
      return NextResponse.json(
        { error: "Email already registered", status: 406 },
        { status: 406 }
      );
    }

    const hashedPassword = await hash(client?.password, 10);

    const newclient = await prisma.user
      .create({
        data: {
          name: client?.name,
          image: client?.image,
          email: client?.email,
          password: hashedPassword,
        },
      })
      .then((res) => {
        return res;
      });

    return NextResponse.json(
      { body: newclient, status: 201 },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while registering the user.", status: 400 },
      { status: 400 }
    );
  }
};

export const PUT = async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get("id");
  const body: { image: string } = await request.json();

  try {
    if (id) {
      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          image: body.image,
        },
      });
    }

    return NextResponse.json(
      { message: "client upldated.", status: 201 },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error, status: 400 }, { status: 400 });
  }
};
