import { BillIdDTO } from "../../infra/@types";
import { BillRepository } from "../../infra/repositories/implementations/BillRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class PayBillService {
  constructor(
    @inject("BillRepository")
    private billRepository: BillRepository
  ){}

  async execute({ billId }: BillIdDTO): Promise<void> {

    await this.billRepository.setPaiyedTrue({ billId });
  }
}

export { PayBillService };
