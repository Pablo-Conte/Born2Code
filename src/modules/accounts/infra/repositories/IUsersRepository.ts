import {
  DeleteUserDTO,
  findByCellNumberDTO,
  findByEmailDTO,
  findByIdDTO,
  IsAdminDTO,
  ReadAllBooksDTO,
  SetAdminDTO,
  UpdateUserDTO,
} from "../../@types";
import { CreateUserDTO } from "../../@types/CreateUserDTO";
import { UserEntity } from "../entities/UserEntity";

interface IUsersRepository {
  create({ userData }: CreateUserDTO): Promise<UserEntity>;
  findByCellNumber({ cellNumber }: findByCellNumberDTO): Promise<UserEntity>;
  findByEmail({ email }: findByEmailDTO): Promise<UserEntity>;
  findById({ id }: findByIdDTO): Promise<UserEntity>;
  readAllBooks({ userId }: ReadAllBooksDTO): Promise<number>;
  readAll(): Promise<UserEntity[]>;
  update({ id, userData }: UpdateUserDTO): Promise<UserEntity>;
  isAdmin({ userId }: IsAdminDTO): Promise<boolean>;
  toggleAdmin({ userId, admin }: SetAdminDTO): Promise<void>;
  delete({ myId }: DeleteUserDTO): Promise<void>;
}

export { IUsersRepository };
