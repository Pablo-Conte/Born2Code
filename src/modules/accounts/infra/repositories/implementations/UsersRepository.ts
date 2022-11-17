import { prisma } from "../../../../../../prisma/PrismaClient";
import {
  ReadAllBooksDTO,
  IsAdminDTO,
  findByCellNumberDTO,
  findByEmailDTO,
  findByIdDTO,
  UpdateUserDTO,
  DeleteUserDTO,
  SetAdminDTO,
} from "../../../@types";
import { CreateUserDTO } from "../../../@types/CreateUserDTO";
import { UserEntity } from "../../entities/UserEntity";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  async create({ userData }: CreateUserDTO): Promise<UserEntity> {
    const newUser = await prisma.user.create({
      data: {
        ...userData, // spread
      },
    });

    return newUser;
  }

  async readAllBooks({ userId }: ReadAllBooksDTO): Promise<number> {
    const booksFound = await prisma.user.findMany({
      where: {
        id: userId,
      },
      include: { BookRented: true },
    });
    const result = booksFound.map((booksRented) => {
      return booksRented.BookRented;
    });

    return result[0].length;
  }

  async isAdmin({ userId }: IsAdminDTO): Promise<boolean> {
    const userFound = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    return userFound.admin;
  }

  async findByCellNumber({
    cellNumber,
  }: findByCellNumberDTO): Promise<UserEntity> {
    const numberFound = await prisma.user.findFirst({
      where: {
        cellNumber,
      },
    });

    return numberFound;
  }

  async findByEmail({ email }: findByEmailDTO): Promise<UserEntity> {
    const userFound = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return userFound;
  }

  async findById({ id }: findByIdDTO) {
    const userFound = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return userFound;
  }

  async update({ id, userData }: UpdateUserDTO): Promise<UserEntity> {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: userData,
    });

    return updatedUser;
  }

  async delete({ myId }: DeleteUserDTO): Promise<void> {
    await prisma.user.delete({
      where: {
        id: myId,
      },
    });
  }

  async toggleAdmin({ userId, admin }: SetAdminDTO): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        admin: !admin,
      },
    });
  }

  async readAll(): Promise<UserEntity[]> {
    const findUsers = await prisma.user.findMany();

    return findUsers;
  }
}

export { UsersRepository };
