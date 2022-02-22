import { Products } from "@prisma/client";
import prisma from "@helpers/PrismaClient";

export class RemoveProductDataFromDatabaseService {
  async execute(id: number) {
    const productexists: Products | null = await prisma.products.findUnique({
      where: {
        id: id,
      },
    });

    if (!productexists) {
      throw "notexists";
    }

    const removeproduct: Products = await prisma.products.delete({
      where: {
        id: id,
      },
    });

    return removeproduct;
  }
}
