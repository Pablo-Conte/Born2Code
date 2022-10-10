import { LibraryEntity } from "../../../../database/entities/LibraryEntity";
import { LibraryRepository } from "../../../../database/repositories/LibraryRepository";
import { UsersRepository } from "../../../../database/repositories/UsersRepository";
import { AppError } from "../../../../shared/errors";

type TCreateBook = {
    nameLibrary: string
    userId: string
}

class AddLibraryService {

    async execute({ nameLibrary, userId }: TCreateBook): Promise<LibraryEntity> {

        const libraryRepository = new LibraryRepository();
        const usersRepository = new UsersRepository();

        const isUserAdmin = await usersRepository.isAdmin({ userId });
        
        if (!isUserAdmin){
            throw new AppError("You aren't a admin!", 401);
        }

        const nameConflict = await libraryRepository.findByName({ name: nameLibrary })

        if (nameConflict) {
            
            throw new AppError("Library Already exists!", 409);
        }

        const newBook = await libraryRepository.create({ nameLibrary })

        return newBook;
    }
}

export { AddLibraryService }