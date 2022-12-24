import { UserIdVerifyDTO } from "../infra/@types";
import { BillEntity } from "../infra/entities/BillEntity";
import { BillRepository } from "../infra/repositories/BillRepository";

class VerifyOpenBillsService {
  async execute({ userId }: UserIdVerifyDTO): Promise<BillEntity> {
    
    const billRepository = new BillRepository();
    
    const openBill = await billRepository.verifyOpenBill({ userId });

    return openBill;
  }
}

export { VerifyOpenBillsService };
