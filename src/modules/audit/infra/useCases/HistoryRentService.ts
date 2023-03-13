import { Request, Response } from "express";
import { HistoryRentEntity } from "../entities/HistoryRentEntity";
import { HistoryRentRepository } from "../repositories/implementations/HistoryRentRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class HistoryRentService {
    
    constructor(
        @inject("HistoryRentRepository")
        private historyRentRepository: HistoryRentRepository
    ) {}

    async execute(data: HistoryRentEntity): Promise<HistoryRentEntity> {

        const historyRent = await this.historyRentRepository.CreateHistoryRent({ dataToCreateHistory: data })

        return historyRent;
    }
}

export { HistoryRentService }