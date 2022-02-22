import { Users } from "@prisma/client";
import prisma from "@helpers/PrismaClient";
import { hash } from "bcrypt";

export class RegisterUserService {
  async execute(email: string, name: string, password: string) {
    const hashpassword = await hash(password, 10);

    const result: Users = await prisma.users.create({
      data: {
        email: email,
        name: name,
        password: hashpassword,
        type: "USER",
      },
    });
    return result;
  }
}
