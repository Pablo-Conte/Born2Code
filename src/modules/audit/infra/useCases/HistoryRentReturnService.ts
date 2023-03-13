import { container } from "tsyringe";
import { HistoryRentEntity } from "../entities/HistoryRentEntity";
import { HistoryRentRepository } from "../repositories/implementations/HistoryRentRepository";

class HistoryRentReturnService {

    async execute(data: Partial<HistoryRentEntity>): Promise<void>{

        const historyRentRepository = container.resolve(HistoryRentRepository);

        const { id, endDate, totalValue } = data

        await historyRentRepository.Update({ id, endDate, totalValue })

    }
}

export { HistoryRentReturnService }