import { prisma } from "../../../../../../prisma/PrismaClient";
import { DeleteDTO, RentDTO, VerifyIfRentExistsDTO } from "../../../@types";
import { RentEntity } from "../../entities/RentEntity";
import { IRentRepository } from "../IRentRepository";

class RentRepository implements IRentRepository {
  async rent({
    userId,
    library_bookId,
    historyRentId,
  }: RentDTO): Promise<RentEntity> {
    const createdRent = await prisma.rentUserLibraryBook.create({
      data: {
        userId,
        library_bookId,
        historyId: historyRentId,
      },
    });

    return createdRent;
  }

  async verifyIfRentExists({
    returnId,
  }: VerifyIfRentExistsDTO): Promise<RentEntity> {
    const rentFound = await prisma.rentUserLibraryBook.findFirst({
      where: {
        id: returnId,
      },
    });

    return rentFound;
  }

  async delete({ returnId }: DeleteDTO): Promise<void> {
    await prisma.rentUserLibraryBook.delete({
      where: {
        id: returnId,
      },
    });
  }
}

export { RentRepository };
