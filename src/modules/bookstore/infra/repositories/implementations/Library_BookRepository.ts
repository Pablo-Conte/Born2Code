import {
  FindLibraryBookByIdDTO,
  CreateRelationDTO,
  AlreadyRelationConflictDTO,
  UpdateToRentedDTO,
  UpdateToNotRentedDTO,
} from "@modules/bookstore/@types";
import { prisma } from "@prisma/PrismaClient";
import { Library_BookEntity } from "../../entities/Library_BookEntity";
import { ILibrary_BookRepository } from "../ILibrary_BookRepository";

class Library_BookRepository implements ILibrary_BookRepository {
  async findById({
    library_bookId,
  }: FindLibraryBookByIdDTO): Promise<Library_BookEntity> {
    const library_bookFound = await prisma.libraryBook.findFirst({
      where: {
        id: library_bookId,
      },
    });

    return library_bookFound;
  }

  async createRelation({
    bookId,
    libraryId,
  }: CreateRelationDTO): Promise<void> {
    await prisma.libraryBook.create({
      data: {
        bookId,
        libraryId,
      },
    });
  }

  async alreadyRelationConflict({
    bookId,
    libraryId,
  }: AlreadyRelationConflictDTO): Promise<Library_BookEntity> {
    const verifyConflict = await prisma.libraryBook.findFirst({
      where: {
        bookId,
        libraryId,
      },
    });

    return verifyConflict;
  }

  async updateToRented({ library_bookId }: UpdateToRentedDTO): Promise<void> {
    await prisma.libraryBook.update({
      where: {
        id: library_bookId,
      },
      data: {
        rented: true,
      },
    });
  }

  async updateToNotRented({
    library_bookId,
  }: UpdateToNotRentedDTO): Promise<void> {
    await prisma.libraryBook.update({
      where: {
        id: library_bookId,
      },
      data: {
        rented: false,
      },
    });
  }
}

export { Library_BookRepository };
