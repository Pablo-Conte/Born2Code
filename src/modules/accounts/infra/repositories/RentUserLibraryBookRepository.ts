import { prisma } from "../../../../../prisma/PrismaClient";
import { DeleteDTO, RentDTO, VerifyIfRentExistsDTO } from "../../@types";
import { RentUserLibraryBookEntity } from "../entities/RentUserLibraryBookEntity";


class RentUserLibraryBookRepository {
  async delete({ returnId }: DeleteDTO): Promise<void> {
    
    await prisma.rentUserLibraryBook.delete({
      where: {
        id: returnId,
      },
    });
  }

  async rent({
    userId,
    library_bookId,
  }: RentDTO): Promise<void> {
    
    await prisma.rentUserLibraryBook.create({
      data: {
        userId,
        library_bookId,
      },
    });
  }

  async verifyIfRentExists({
    returnId,
  }: VerifyIfRentExistsDTO): Promise<RentUserLibraryBookEntity> {
    const rentFound = await prisma.rentUserLibraryBook.findFirst({
      where: {
        id: returnId,
      },
    });
    
    return rentFound;
  }
}

export { RentUserLibraryBookRepository };
