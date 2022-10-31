import { HistoryRentEntity } from "../infra/entities/HistoryRentEntity"

type CreateHistoryRentDTO = {
    dataToCreateHistory: Partial<HistoryRentEntity>
};

type UpdateDTO = {
    id: string;
    endDate: Date;
    totalValue: string;
}

export { CreateHistoryRentDTO, UpdateDTO };