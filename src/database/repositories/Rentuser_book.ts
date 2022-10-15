import { prisma } from "../../../prisma/PrismaClient";
import { Rentuser_bookEntity } from "../entities/Rentuser_bookentity";

type RentDTO = {
    bookId: string;
    userId: string;
}

type VerifyIfRentExistsDTO = {
    bookId: string;
    userId: string;
}

class Rentuser_bookRepository {
    async rent({ bookId, userId }: RentDTO): Promise<void> {
        await prisma.rentuser_book.create({
            data: {
                bookId,
                userId
            }
        })
    }

    async verifyIfRentExists({ bookId, userId}: VerifyIfRentExistsDTO): Promise<Rentuser_bookEntity> {
        const rentFound = await prisma.rentuser_book.findFirst({
            where: {
                bookId,
                userId
            }
        })
        
        return rentFound;
    }
}

export { Rentuser_bookRepository }