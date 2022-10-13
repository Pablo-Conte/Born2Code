import { prisma } from "../../../prisma/PrismaClient";
import { BookEntity } from "../entities/BookEntity";
import { LibraryEntity } from "../entities/LibraryEntity"

type CreateBookDTO = {
    nameLibrary: string;
}

type FindByNameDTO = {
    name: string;
}

type DataToUpdateDTO = {
    data: Partial<LibraryEntity>;
    libraryId: string;
}

type FindByIdDTO = {
    libraryId: string;
}

type DeleteLibraryDTO = {
    libraryId: string;
}

type ReadAllBooksDTO = {
    query: string;
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

    async update({ data, libraryId }: DataToUpdateDTO): Promise<LibraryEntity>{

        const updatedLibrary = await prisma.library.update({
            where: {
                id: libraryId
            },
            data: {
                ... data
            }
        })

        return updatedLibrary
    }

    async findById({ libraryId }: FindByIdDTO): Promise<LibraryEntity> {
        
        const libraryFound = await prisma.library.findUnique({
            where: {
                id: libraryId
            }
        })

        return libraryFound;
    }

    async delete({ libraryId }: DeleteLibraryDTO): Promise<void> {

        await prisma.library.delete({
            where: {
                id: libraryId
            }
        })
    }

    async findByName({ name }: FindByNameDTO): Promise<LibraryEntity> {

        const libraryFound = await prisma.library.findFirst({
            where: {
                name
            }
        })

        return libraryFound; 
    }

    async readAllBooks({ query }: ReadAllBooksDTO): Promise<any> {
        
        const booksFound = await prisma.library.findMany({
            where: {
                name: query
            },
            include: {
                books: { include: { Book: true }}
            }
            
        })

        const result = booksFound.map((books) => {
            return {...books.books.map((book) => { return { ...book.Book }})}
        })

        return result;
        
    }
}

export { LibraryRepository };