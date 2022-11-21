import { inject, injectable } from "tsyringe";
import { HistoryRentEntity } from "../entities/HistoryRentEntity";
import { HistoryRentRepository } from "../repositories/HistoryRentRepository";
import { IHistoryRentRepository } from "../repositories/implementations/IHistoryRentRepository";

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
