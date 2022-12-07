import { prisma } from "../../../../../prisma/PrismaClient";
import { UserIdDTO } from "../@types";
import { BillEntity } from "../entities/BillEntity";

class BillRepository {
  async create({ userId, valor }: UserIdDTO): Promise<BillEntity> {
    const newBill = prisma.bill.create({
      data: {
        userId,
        valor,
      },
    });
    return newBill;
  }
}

export { BillRepository }
