import { Products } from "@prisma/client";
import prisma from "@helpers/PrismaClient";

export class AddNewProductToDatabaseService {
  async execute(name: string, description: string, price: number) {
    const result: Products = await prisma.products.create({
      data: {
        name: name,
        description: description,
        price: price,
      },
    });
    return result;
  }
}
