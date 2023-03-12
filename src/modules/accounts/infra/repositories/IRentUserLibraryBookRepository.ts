import { DeleteDTO, RentDTO, VerifyIfRentExistsDTO } from "../../@types";
import { RentUserLibraryBookEntity } from "../entities/RentUserLibraryBookEntity";

interface IRentUserLibraryBookRepository {
  
  delete({ returnId }: DeleteDTO): Promise<void>;

  rent({
    userId,
    library_bookId,
    historyRentId
  }: RentDTO): Promise<RentUserLibraryBookEntity>;

  verifyIfRentExists({
    returnId,
  }: VerifyIfRentExistsDTO): Promise<RentUserLibraryBookEntity>;
}

export { IRentUserLibraryBookRepository };


 