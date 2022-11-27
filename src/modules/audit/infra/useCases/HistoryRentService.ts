import { Request, Response } from "express";
import { HistoryRentEntity } from "../entities/HistoryRentEntity";
import { HistoryRentRepository } from "../repositories/HistoryRentRepository";

class HistoryRentService {

    async execute(data: HistoryRentEntity): Promise<HistoryRentEntity> {

        const historyRentRepository = new HistoryRentRepository();

        const historyRent = await historyRentRepository.CreateHistoryRent({ dataToCreateHistory: data })

        return historyRent;
    }
}

export { HistoryRentService }