import { verify } from "jsonwebtoken";
import { getRedis } from "@app/helpers/RedisClient";
import prisma from "@app/helpers/PrismaClient";
import { cartalreadyexists, cartdoesntexists } from "@app/helpers/AddToCart";
import { Products } from "@prisma/client";

export class AddToUserCartService {
  async execute(id: number, token: string) {
    try {
      const productexists: Products | null = await prisma.products.findFirst({
        where: {
          id: id,
        },
      });

      if (productexists) {
        const decodedToken: any = verify(token, process.env.SECRET as string);
        const currentcart: any = await getRedis(`cart-${decodedToken.id}`);

        if (currentcart) {
          await cartalreadyexists(id, decodedToken.id, currentcart);
          return;
        } else {
          await cartdoesntexists(id, decodedToken.id);
          return;
        }
      }
      throw "productnotfound";
    } catch (error: any) {
      throw error;
    }
  }
}
