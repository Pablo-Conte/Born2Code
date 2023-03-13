import { UserIdDTO } from "../infra/@types";
import { BillRepository } from "../infra/repositories/implementations/BillRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateBillService {
  constructor(
    @inject("BillRepository")
    private billRepository: BillRepository
  ){}
  async execute({ userId, valor }: UserIdDTO) {
    
    await this.billRepository.create({ userId, valor });
  }
}

export { CreateBillService };
