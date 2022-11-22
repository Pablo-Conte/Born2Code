import { prisma } from "@prisma/PrismaClient";
import { RentDTO } from "@modules/accounts/@types/RentDTO";
import { DeleteTokenDTO } from "@modules/sessions/@types/DeleteTokenDTO";
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

  async verifyIfRentExists({ returnId }: DeleteTokenDTO): Promise<RentEntity> {
    const rentFound = await prisma.rentUserLibraryBook.findFirst({
      where: {
        id: returnId,
      },
    });

    return rentFound;
  }

  async delete({ returnId }: DeleteTokenDTO): Promise<void> {
    await prisma.rentUserLibraryBook.delete({
      where: {
        id: returnId,
      },
    });
  }
}

export { RentRepository };
