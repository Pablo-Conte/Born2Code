import { UserEntity } from "../infra/entities/UserEntity";

type UpdateUserDTO = {
  id: string;
  userData: Partial<UserEntity>;
};

export { UpdateUserDTO };
