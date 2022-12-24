import { BillIdDTO } from "../../infra/@types";
import { BillRepository } from "../../infra/repositories/BillRepository";

class PayBillService {
  async execute({ billId }: BillIdDTO): Promise<void> {
    const billRepository = new BillRepository();

    await billRepository.setPaiyedTrue({ billId });
  }
}

export { PayBillService };
