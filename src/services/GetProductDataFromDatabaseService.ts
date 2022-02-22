import { Products } from "@prisma/client";
import prisma from "@helpers/PrismaClient";

export class GetProductDataFromDatabaseService {
  async execute(id: number) {
    const result: Products | null = await prisma.products.findFirst({
      where: {
        id: id,
      },
    });
    return result;
  }
}
