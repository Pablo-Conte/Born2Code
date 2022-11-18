import { DeleteDTO, RentDTO, VerifyIfRentExistsDTO } from "../../@types";
import { RentEntity } from "../entities/RentEntity";

interface IRentRepository {
  rent({ userId, library_bookId, historyRentId }: RentDTO): Promise<RentEntity>;
  verifyIfRentExists({ returnId }: VerifyIfRentExistsDTO): Promise<RentEntity>;
  delete({ returnId }: DeleteDTO): Promise<void>;
}

export { IRentRepository };
