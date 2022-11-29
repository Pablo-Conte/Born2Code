import { inject, injectable } from "tsyringe";
import { HistoryRentEntity } from "../infra/entities/HistoryRentEntity";
import { HistoryRentRepository } from "../infra/repositories/HistoryRentRepository";
import { IHistoryRentRepository } from "../infra/repositories/implementations/IHistoryRentRepository";

@injectable()
class HistoryRentUseCase {
  constructor(
    @inject(HistoryRentRepository)
    private historyRentRepository: IHistoryRentRepository
  ) {}

  async execute(data: HistoryRentEntity): Promise<HistoryRentEntity> {
    const historyRent = await this.historyRentRepository.CreateHistoryRent({
      dataToCreateHistory: data,
    });

    return historyRent;
  }
}

export { HistoryRentUseCase };
