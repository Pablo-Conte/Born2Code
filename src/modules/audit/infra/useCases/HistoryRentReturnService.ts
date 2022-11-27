import { HistoryRentEntity } from "../entities/HistoryRentEntity";
import { HistoryRentRepository } from "../repositories/HistoryRentRepository";

class HistoryRentReturnService {

    async execute(data: Partial<HistoryRentEntity>): Promise<void>{

        const historyRentRepository = new HistoryRentRepository();

        const { id, endDate, totalValue } = data

        await historyRentRepository.Update({ id, endDate, totalValue })

    }
}

export { HistoryRentReturnService }