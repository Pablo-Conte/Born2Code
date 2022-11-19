import { HistoryRentEntity } from "../infra/entities/HistoryRentEntity";

type CreateHistoryRentDTO = {
  dataToCreateHistory: HistoryRentEntity;
};

type UpdateDTO = {
  id: string;
  endDate: Date;
  totalValue: number;
};

export { CreateHistoryRentDTO, UpdateDTO };
