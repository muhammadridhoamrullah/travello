import { CreateUser } from "@/db/model/user";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schemaUserRegister = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const validatedData = schemaUserRegister.safeParse(data);

    if (!validatedData.success) {
      throw validatedData.error;
    }

    const creatingUser = await CreateUser(data);

    return NextResponse.json({
      data: creatingUser,
      message: "User has been created",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const path = error.issues[0].path[0];
      const message = error.issues[0].message;

      return NextResponse.json(
        {
          message: `${path} ${message}`,
        },
        {
          status: 400,
        }
      );
    } else if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "Internal Server Error",
        },
        {
          status: 500,
        }
      );
    }
  }
}
