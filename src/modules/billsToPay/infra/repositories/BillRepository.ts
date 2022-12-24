import { prisma } from "../../../../../prisma/PrismaClient";
import { BillIdDTO, UserIdDTO, UserIdVerifyDTO } from "../@types";
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

  async verifyOpenBill({ userId }: UserIdVerifyDTO): Promise<BillEntity> {
    const openBill = await prisma.bill.findFirst({
      where: {
        userId,
        payied: false,
      },
    });
    return openBill;
  }

  async setPaiyedTrue({ billId }: BillIdDTO): Promise<void> {
    await prisma.bill.update({
      where: {
        id: billId,
      },
      data: {
        payied: true,
      },
    });
  }
}

export { BillRepository };
