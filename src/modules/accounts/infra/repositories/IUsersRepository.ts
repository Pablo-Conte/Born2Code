import { ReadAllBooksDTO, IsAdminDTO, CreateUserDTO, findByCellNumberDTO, findByEmailDTO, findByIdDTO, UpdateUserDTO, DeleteUserDTO, SetAdminDTO } from "../../@types"
import { UserEntity } from "../entities/UserEntity"

interface IUsersRepository {
  readAllBooks({ userId }: ReadAllBooksDTO): Promise<number>

  isAdmin({ userId }: IsAdminDTO): Promise<boolean>

  create({ uData }: CreateUserDTO): Promise<UserEntity>

  findByCellNumber({
    cellNumber,
  }: findByCellNumberDTO): Promise<UserEntity>

  findByEmail({ email }: findByEmailDTO): Promise<UserEntity> 

  findById({ id }: findByIdDTO)

  update({ id, userData }: UpdateUserDTO): Promise<UserEntity>

  delete({ myId }: DeleteUserDTO): Promise<void>

  toggleAdmin({ userId, admin }: SetAdminDTO): Promise<void>

  readAll(): Promise<UserEntity[]>
}

export { IUsersRepository };