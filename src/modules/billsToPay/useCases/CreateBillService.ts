import { UserIdDTO } from "../infra/@types";
import { BillRepository } from "../infra/repositories/BillRepository";

class CreateBillService {
  async execute({ userId, valor }: UserIdDTO) {
    const billRepository = new BillRepository();
    
    await billRepository.create({ userId, valor });
  }
}

export { CreateBillService };
