import { UserIdDTO, UserIdVerifyDTO, BillIdDTO } from "../@types";
import { BillEntity } from "../entities/BillEntity";

interface IBillRepository {
  create({ userId, valor }: UserIdDTO): Promise<BillEntity>

  verifyOpenBill({ userId }: UserIdVerifyDTO): Promise<BillEntity>

  setPaiyedTrue({ billId }: BillIdDTO): Promise<void>
}

export { IBillRepository };