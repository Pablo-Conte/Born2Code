import { TokenEntity } from "../infra/entities/TokenEntity";
import { UserEntity } from "../infra/entities/UserEntity";

type findByEmailDTO = {
  email: string;
};

type findByCellNumberDTO = {
  cellNumber: string;
};

type findByIdDTO = {
  id: string;
};

type UpdateUserDTO = {
  id: string;
  userData: Partial<UserEntity>;
};

type DeleteUserDTO = {
  myId: string;
};

type SetAdminDTO = {
  userId: string;
  admin: boolean;
};

type IsAdminDTO = {
  userId: string;
};

type ReadAllBooksDTO = {
  userId: string;
};

type CreateUserTokenDTO = {
  tokenData: Partial<TokenEntity>;
};

type FindUserIdDTO = {
  userId: string;
};

type DeleteTokenDTO = {
  userId: string;
};

type RentDTO = {
  userId: string;
  library_bookId: string;
  historyRentId: string;
};

type VerifyIfRentExistsDTO = {
  returnId: string;
};

type DeleteDTO = {
  returnId: string;
};

export {
  DeleteUserDTO,
  IsAdminDTO,
  ReadAllBooksDTO,
  SetAdminDTO,
  UpdateUserDTO,
  findByCellNumberDTO,
  findByEmailDTO,
  findByIdDTO,
  CreateUserTokenDTO,
  DeleteTokenDTO,
  FindUserIdDTO,
  DeleteDTO,
  RentDTO,
  TokenEntity,
  VerifyIfRentExistsDTO,
};
