import { UserEntity } from "../infra/entities/UserEntity";

type UpdateUserDTO = {
  id: string;
  avatar?: string;
  userData?: Partial<UserEntity>;
};

export { UpdateUserDTO };
