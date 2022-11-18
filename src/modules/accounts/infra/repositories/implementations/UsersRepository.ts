import { prisma } from "../../../../../../prisma/PrismaClient";
import { UserEntity } from "../../entities/UserEntity";
import { IUsersRepository } from "../IUsersRepository";
import { CellNumberDTO } from "../../../@types/CellNumberDTO";
import { EmailDTO } from "../../../@types/EmailDTO";
import { CreateUserDTO } from "../../../@types/CreateUserDTO";
import { ReadUserDTO } from "../../../@types/ReadUserDTO";
import { FindUserDTO } from "../../../@types/FindUserDTO";
import { SetAdminDTO } from "../../../@types/SetAdminDTO";
import { UpdateUserDTO } from "../../../@types/UpdateUserDTO";
import { DeleteUserDTO } from "../../../@types/DeleteUserDTO";

class UsersRepository implements IUsersRepository {
  async create({ userData }: CreateUserDTO): Promise<UserEntity> {
    const newUser = await prisma.user.create({
      data: {
        ...userData, // spread
      },
    });

    return newUser;
  }

  async readAllBooks({ userId }: ReadUserDTO): Promise<number> {
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

  async findById({ id }: FindUserDTO) {
    const userFound = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return userFound;
  }

  async findByEmail({ email }: EmailDTO): Promise<UserEntity> {
    const userFound = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return userFound;
  }

  async findByCellNumber({ cellNumber }: CellNumberDTO): Promise<UserEntity> {
    const numberFound = await prisma.user.findFirst({
      where: {
        cellNumber,
      },
    });

    return numberFound;
  }

  async update({ id, userData }: UpdateUserDTO): Promise<UserEntity> {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: userData.name,
        email: userData.email,
        birthDate: userData.birthDate,
        password: userData.password,
        cellNumber: userData.cellNumber,
      },
    });

    return updatedUser;
  }

  async isAdmin({ userId }: FindUserDTO): Promise<boolean> {
    const userFound = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    return userFound.admin;
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