import { CellNumberDTO } from "@modules/accounts/@types/CellNumberDTO";
import { CreateUserDTO } from "@modules/accounts/@types/CreateUserDTO";
import { DeleteUserDTO } from "@modules/accounts/@types/DeleteUserDTO";
import { EmailDTO } from "@modules/accounts/@types/EmailDTO";
import { FindUserDTO } from "@modules/accounts/@types/FindUserDTO";
import { SetAdminDTO } from "@modules/accounts/@types/SetAdminDTO";
import { UpdateUserDTO } from "@modules/accounts/@types/UpdateUserDTO";
import { UserEntity } from "../entities/UserEntity";

interface IUsersRepository {
  create({ userData }: CreateUserDTO): Promise<UserEntity>;
  findByCellNumber({ cellNumber }: CellNumberDTO): Promise<UserEntity>;
  findByEmail({ email }: EmailDTO): Promise<UserEntity>;
  findById({ id }: FindUserDTO): Promise<UserEntity>;
  readAllBooks({ userId }: FindUserDTO): Promise<number>;
  readAll(): Promise<UserEntity[]>;
  update({ id, userData }: UpdateUserDTO): Promise<UserEntity>;
  isAdmin({ userId }: FindUserDTO): Promise<boolean>;
  toggleAdmin({ userId, admin }: SetAdminDTO): Promise<void>;
  delete({ myId }: DeleteUserDTO): Promise<void>;
}

export { IUsersRepository };
