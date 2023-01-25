import { prisma } from "@prisma/PrismaClient";
import { DiscountEntity } from "../../entities/DiscountEntity";

type DiscountDTO = {
  bookId: string;
  percentage: number;
};

class DiscountRepository {
  async createDiscount({
    percentage,
    bookId,
  }: DiscountDTO): Promise<DiscountEntity> {
    const newDiscount = await prisma.discount.create({
      data: {
        percentage,
        Book: {
          connect: {
            id: bookId,
          },
        },
      },
    });
    return newDiscount;
  }
}

export { DiscountRepository };
