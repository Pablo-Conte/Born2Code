import { AppError } from "../../../../shared/errors/appError";
import { UsersRepository } from "../../../accounts/infra/repositories/UsersRepository";
import { LibraryEntity } from "../../infra/entities/LibraryEntity";
import { LibraryRepository } from "../../infra/repositories/LibraryRepository";

type TCreateBook = {
  nameLibrary: string;
  userId: string;
};

class CreateLibraryService {
  /**
   * Verify name conflict
   * Create Library with name
   */

  async execute({ nameLibrary, userId }: TCreateBook): Promise<LibraryEntity> {
    const libraryRepository = new LibraryRepository();
    const usersRepository = new UsersRepository();

    const userFound = await usersRepository.findById({ id: userId })
    const { email } = userFound

    const nameConflict = await libraryRepository.findByName({
      name: nameLibrary,
    });

    if (nameConflict) throw new AppError("Library Already exists!", 409);

    const newBook = await libraryRepository.create({ nameLibrary, email });

    return newBook;
  }
}

export { CreateLibraryService };
