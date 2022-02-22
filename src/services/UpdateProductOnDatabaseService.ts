import { Products } from "@prisma/client";
import prisma from "@helpers/PrismaClient";

export class UpdateProductOnDatabaseService {
  async execute(
    id: number,
    name?: string,
    description?: string,
    price?: number
  ) {
    const currentproduct: Products | null = await prisma.products.findUnique({
      where: {
        id: id,
      },
    });

    if (!currentproduct) {
      throw "notexists";
    }

    const updateProduct: Products = await prisma.products.update({
      where: {
        id: id,
      },
      data: {
        name: name || currentproduct.name,
        description: description || currentproduct.description,
        price: price || currentproduct.price,
      },
    });

    return updateProduct;
  }
}
