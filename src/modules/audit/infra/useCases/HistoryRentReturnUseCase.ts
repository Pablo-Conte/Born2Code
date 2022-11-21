import { inject, injectable } from "tsyringe";
import { HistoryRentEntity } from "../entities/HistoryRentEntity";
import { HistoryRentRepository } from "../repositories/HistoryRentRepository";
import { IHistoryRentRepository } from "../repositories/implementations/IHistoryRentRepository";

@injectable()
class HistoryRentReturnUseCase {
  constructor(
    @inject(HistoryRentRepository)
    private historyRentRepository: IHistoryRentRepository
  ) {}

  async execute(data: Partial<HistoryRentEntity>): Promise<void> {
    const { id, endDate, totalValue } = data;

    await this.historyRentRepository.Update({ id, endDate, totalValue });
  }
}

export { HistoryRentReturnUseCase };
