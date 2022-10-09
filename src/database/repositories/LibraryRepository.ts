import { prisma } from "../../../prisma/PrismaClient";
import { LibraryEntity } from "../entities/LibraryEntity"

type CreateBookDTO = {
    nameLibrary: string
}

type FindByNameDTO = {
    name: string
}

class LibraryRepository {

    async create({ nameLibrary }: CreateBookDTO): Promise<LibraryEntity>{
        
        const newLibrary = await prisma.library.create({
            data: {
                name: nameLibrary
            }
        })

        return newLibrary;
    }

    async findByName({ name }: FindByNameDTO): Promise<LibraryEntity> {

        const libraryFound = await prisma.library.findFirst({
            where: {
                name
            }
        })

        return libraryFound; 
    }
}

export { LibraryRepository };