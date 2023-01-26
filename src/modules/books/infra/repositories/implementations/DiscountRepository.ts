import { prisma } from "@prisma/PrismaClient";
import { DiscountEntity } from "../../entities/DiscountEntity";

type DiscountDTO = {
  bookId: string;
  percentage: number;
  startDate: Date;
  endDate: Date;
};

type PercentageDTO = {
  id: string;
};

class DiscountRepository {
  async createDiscount({
    percentage,
    bookId,
    startDate,
    endDate,
  }: DiscountDTO): Promise<DiscountEntity> {
    const newDiscount = await prisma.discount.create({
      data: {
        percentage,
        startDate,
        endDate,
        Book: {
          connect: {
            id: bookId,
          },
        },
      },
    });
    return newDiscount;
  }

  async findIdDiscount({ id }: PercentageDTO): Promise<DiscountEntity> {
    const findDiscount = await prisma.discount.findFirst({
      where: {
        id,
      },
    });
    return findDiscount;
  }
}

export { DiscountRepository };
