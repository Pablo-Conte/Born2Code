import { inject, injectable } from "tsyringe";
import { HistoryRentEntity } from "../infra/entities/HistoryRentEntity";
import { HistoryRentRepository } from "../infra/repositories/HistoryRentRepository";
import { IHistoryRentRepository } from "../infra/repositories/implementations/IHistoryRentRepository";

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
