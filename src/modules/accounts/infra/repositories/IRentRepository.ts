import { RentEntity } from "../entities/RentEntity";
import { RentDTO } from "../../@types/RentDTO";
import { DeleteTokenDTO } from "../../../sessions/@types/DeleteTokenDTO";

interface IRentRepository {
  rent({ userId, library_bookId, historyRentId }: RentDTO): Promise<RentEntity>;
  verifyIfRentExists({ returnId }: DeleteTokenDTO): Promise<RentEntity>;
  delete({ returnId }: DeleteTokenDTO): Promise<void>;
}

export { IRentRepository };
