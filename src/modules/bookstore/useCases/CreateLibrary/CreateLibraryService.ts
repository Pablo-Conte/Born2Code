import { AppError } from "../../../../shared/errors/appError";
import { UsersRepository } from "../../../accounts/infra/repositories/implementations/UsersRepository";
import { LibraryEntity } from "../../infra/entities/LibraryEntity";
import { LibraryRepository } from "../../infra/repositories/implementations/LibraryRepository";
import { inject, injectable } from "tsyringe";

type TCreateBook = {
  nameLibrary: string;
  userId: string;
};

@injectable()
class CreateLibraryService {
  /**
   * Verify name conflict
   * Create Library with name
   */

  constructor(
    @inject("LibraryRepository")
    private libraryRepository: LibraryRepository,
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ){}
  async execute({ nameLibrary, userId }: TCreateBook): Promise<LibraryEntity> {

    const userFound = await this.usersRepository.findById({ id: userId })
    const { email } = userFound

    const nameConflict = await this.libraryRepository.findByName({
      name: nameLibrary,
    });

    if (nameConflict) throw new AppError("Library Already exists!", 409);

    const newBook = await this.libraryRepository.create({ nameLibrary, email });

    return newBook;
  }
}

export { CreateLibraryService };
