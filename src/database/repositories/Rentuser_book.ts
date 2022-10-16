import { prisma } from "../../../prisma/PrismaClient";
import { Rentuser_bookEntity } from "../entities/Rentuser_bookentity";

type RentDTO = {
    bookId: string;
    userId: string;
    libraryId: string;
    library_bookId: string;
}

type VerifyIfRentExistsDTO = {
    returnId: string;
}

type DeleteDTO = {
    returnId: string;
}

class Rentuser_bookRepository {

    async delete({ returnId}: DeleteDTO): Promise<void>{
        await prisma.rentuser_book.delete({
            where: {
                id: returnId
            }
        })
    }
    
    async rent({ bookId, userId, libraryId, library_bookId }: RentDTO): Promise<void> {
        
        await prisma.rentuser_book.create({
            data: {
                bookId,
                userId,
                libraryId,
                library_bookId
            }
        })
    }

    async verifyIfRentExists({ returnId }: VerifyIfRentExistsDTO): Promise<Rentuser_bookEntity> {
        const rentFound = await prisma.rentuser_book.findFirst({
            where: {
                id: returnId
            }
        })
        
        return rentFound;
    }
}

export { Rentuser_bookRepository }