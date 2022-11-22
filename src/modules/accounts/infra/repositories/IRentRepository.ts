import { RentDTO } from "@modules/accounts/@types/RentDTO";
import { DeleteTokenDTO } from "@modules/sessions/@types/DeleteTokenDTO";
import { RentEntity } from "../entities/RentEntity";

interface IRentRepository {
  rent({ userId, library_bookId, historyRentId }: RentDTO): Promise<RentEntity>;
  verifyIfRentExists({ returnId }: DeleteTokenDTO): Promise<RentEntity>;
  delete({ returnId }: DeleteTokenDTO): Promise<void>;
}

export { IRentRepository };
