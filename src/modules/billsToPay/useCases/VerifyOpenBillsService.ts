import { UserIdVerifyDTO } from "../infra/@types";
import { BillEntity } from "../infra/entities/BillEntity";
import { BillRepository } from "../infra/repositories/implementations/BillRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class VerifyOpenBillsService {
  constructor(
    @inject("BillRepository")
    private billRepository: BillRepository
  ){}
  async execute({ userId }: UserIdVerifyDTO): Promise<BillEntity> {
    
    const openBill = await this.billRepository.verifyOpenBill({ userId });

    return openBill;
  }
}

export { VerifyOpenBillsService };
