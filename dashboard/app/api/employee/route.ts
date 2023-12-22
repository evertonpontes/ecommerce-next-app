import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const employee = await request.json();

    const user = await prisma.employee.findUnique({
      where: {
        email: employee?.email,
      },
    });

    if (user) {
      return NextResponse.json(
        { error: "Email already registered", status: 406 },
        { status: 406 }
      );
    }

    const hashedPassword = await hash(employee?.password, 10);

    const newEmployee = await prisma.employee
      .create({
        data: {
          name: employee?.name,
          gender: employee?.gender,
          image: employee?.image,
          email: employee?.email,
          password: hashedPassword,
          number: employee?.number,
        },
      })
      .then((res) => {
        return res;
      });

    return NextResponse.json(
      { body: newEmployee, status: 201 },
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
      await prisma.employee.update({
        where: {
          id: id,
        },
        data: {
          image: body.image,
        },
      });
    }

    return NextResponse.json(
      { message: "Employee upldated.", status: 201 },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error, status: 400 }, { status: 400 });
  }
};
