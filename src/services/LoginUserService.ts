import { Users } from "@prisma/client";
import prisma from "@helpers/PrismaClient";
import { sign, verify } from "jsonwebtoken";
import { compare } from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export class LoginUserService {
  async execute(email: string, password: string) {
    const userexists: Users | null = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!userexists) {
      throw "emailnotfound";
    }

    const checkpassword = await compare(password, userexists.password);

    if (!checkpassword) {
      throw "invalidpass";
    }

    const usertoken = sign(
      {
        id: userexists.id,
        name: userexists.name,
        email: userexists.email,
        type: userexists.type,
      },
      process.env.SECRET as string,
      { expiresIn: "1d" }
    );

    try {
      const verifytoken: any = verify(usertoken, process.env.SECRET as string);
      const userObject = {
        name: verifytoken.name,
        token: usertoken,
      };

      return userObject;
    } catch (error) {
      throw "invalidjwt";
    }
  }
}
