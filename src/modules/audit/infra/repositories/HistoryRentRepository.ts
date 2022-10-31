import { prisma } from "../../../../../prisma/PrismaClient";
import { CreateHistoryRentDTO, UpdateDTO } from "../../@types";
import { HistoryRentEntity } from "../entities/HistoryRentEntity";

class HistoryRentRepository {

    async CreateHistoryRent({ dataToCreateHistory }: CreateHistoryRentDTO): Promise<HistoryRentEntity> {
        const CreatedHistory = await prisma.historyRent.create({
            data: {
                ...dataToCreateHistory
            }
        });
        
        return CreatedHistory
    };

    async Update({ id, endDate, totalValue }: UpdateDTO): Promise<void> {
        await prisma.historyRent.update({
            where: {
                id
            },
            data: {
                endDate,
                totalValue
            }

        })
    }
};

export { HistoryRentRepository };