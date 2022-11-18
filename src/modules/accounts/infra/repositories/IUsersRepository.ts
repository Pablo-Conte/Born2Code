import { UserEntity } from "../entities/UserEntity";
import { CellNumberDTO } from "../../@types/CellNumberDTO";
import { EmailDTO } from "../../@types/EmailDTO";
import { CreateUserDTO } from "../../@types/CreateUserDTO";
import { FindUserDTO } from "../../@types/FindUserDTO";
import { UpdateUserDTO } from "../../@types/UpdateUserDTO";
import { SetAdminDTO } from "../../@types/SetAdminDTO";
import { DeleteUserDTO } from "../../@types/DeleteUserDTO";

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
