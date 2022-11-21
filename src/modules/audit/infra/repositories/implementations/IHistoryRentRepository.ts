import { CreateHistoryRentDTO, UpdateDTO } from "../../../@types";
import { HistoryRentEntity } from "../../entities/HistoryRentEntity";

interface IHistoryRentRepository {
  CreateHistoryRent({
    dataToCreateHistory,
  }: CreateHistoryRentDTO): Promise<HistoryRentEntity>;
  Update({ id, endDate, totalValue }: UpdateDTO): Promise<void>;
}

export { IHistoryRentRepository };
