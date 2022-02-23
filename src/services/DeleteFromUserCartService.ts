import { verify } from "jsonwebtoken";
import { getRedis } from "@app/helpers/RedisClient";
import prisma from "@app/helpers/PrismaClient";
import { Products } from "@prisma/client";
import { removefromcart } from "@app/helpers/RemoveFromCart";

export class DeleteFromUserCartService {
  async execute(id: number, token: string, quantity: number) {
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
          await removefromcart(
            id,
            decodedToken.id,
            currentcart,
            quantity ? quantity : "all"
          );
          return;
        } else {
          throw "itemnotfound";
        }
      }
      throw "productnotfound";
    } catch (error: any) {
      throw error;
    }
  }
}
