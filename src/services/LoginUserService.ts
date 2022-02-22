import { Users } from "@prisma/client";
import prisma from "@helpers/PrismaClient";
import { sign, verify } from "jsonwebtoken";
import { compare } from "bcrypt";
import dotenv from "dotenv";
import { getRedis, setRedis } from "@app/helpers/RedisClient";
import {
  afterFirstTry,
  correctPasswordButThreeTries,
  firstTry,
} from "@app/helpers/CheckTries";
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

    const currenttries: any = await getRedis(`user-${userexists!.id}`);

    const checkpassword = await compare(password, userexists.password);

    if (!checkpassword) {
      if (!currenttries) {
        await firstTry(userexists!.id);
      } else {
        await afterFirstTry(userexists!.id, currenttries);
      }
    }

    if (currenttries) {
      await correctPasswordButThreeTries(userexists!.id, currenttries);
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
