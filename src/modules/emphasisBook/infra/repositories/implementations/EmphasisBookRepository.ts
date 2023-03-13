import { prisma } from "../../../../../../prisma/PrismaClient";
import {
  AddTotalRentsOnEmphasisBookUseCaseDTO,
  CreateDTO,
  FindByIdDTO,
} from "../../../@types";
import { EmphasisBookEntity } from "../../entities/EmphasisBookEntity";

class EmphasisBookRepository {
  async FindById({ bookId }: FindByIdDTO): Promise<EmphasisBookEntity> {
    const FoundedEmphasisBook = await prisma.emphasisBook.findFirst({
      where: {
        bookId,
      },
    });
    return FoundedEmphasisBook;
  }

  async create({ bookId }: CreateDTO): Promise<void> {
    await prisma.emphasisBook.create({
      data: {
        bookId,
        totalRents: 0,
      },
    });
  }

  async updateTotalRents({
    bookId,
  }: AddTotalRentsOnEmphasisBookUseCaseDTO): Promise<void> {
    const { totalRents } = await this.FindById({ bookId });
    const totalRentsAdded = totalRents + 1;

    await prisma.emphasisBook.update({
      where: {
        bookId,
      },
      data: {
        totalRents: totalRentsAdded,
      },
    });
  }

  async readAllEmphasisBooks(): Promise<EmphasisBookEntity[]> {
    const emphasisBooks = await prisma.emphasisBook.findMany({
      orderBy: {
        totalRents: "desc",
      }
    });

    return emphasisBooks;
  }
}

export { EmphasisBookRepository };
