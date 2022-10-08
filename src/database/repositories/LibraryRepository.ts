import { prisma } from "../../../prisma/PrismaClient";
import { LibraryEntity } from "../entities/LibraryEntity"

type CreateBookDTO = {
    nameBook: string
}

class LibraryRepository {
    
    async create({ nameBook }: CreateBookDTO){
        
        const newBook = prisma.library.create({
            data: {
                name: nameBook
            }
        })

        return newBook;
    }
}

export { LibraryRepository };