import { verify } from "jsonwebtoken";
import { getRedis } from "@app/helpers/RedisClient";

export class GetUserCartService {
  async execute(token: string) {
    try {
      const decodedToken: any = verify(token, process.env.SECRET as string);
      const currentcart: any = await getRedis(`cart-${decodedToken.id}`);
      if (currentcart && JSON.parse(currentcart).length >= 1) {
        const parsedCart = JSON.parse(currentcart);
        return parsedCart;
      }

      throw "nocart";
    } catch (error: any) {
      throw error;
    }
  }
}
