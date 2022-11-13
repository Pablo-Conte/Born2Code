import { HistoryRentEntity } from "../infra/entities/HistoryRentEntity";

type CreateHistoryRentDTO = {
  dataToCreateHistory: HistoryRentEntity;
};

type UpdateDTO = {
  id: string;
  endDate: Date;
  totalValue: string;
};

export { CreateHistoryRentDTO, UpdateDTO };
