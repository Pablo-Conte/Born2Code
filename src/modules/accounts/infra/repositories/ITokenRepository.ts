import {
  CreateUserTokenDTO,
  FindUserIdDTO,
  DeleteTokenDTO,
} from "../../@types";
import { TokenEntity } from "../entities/TokenEntity";

interface ITokenRepository {
  create({ tokenData: { userId, token } }: CreateUserTokenDTO): Promise<void>;
  findByUserId({ userId }: FindUserIdDTO): Promise<TokenEntity>;
  delete({ userId }: DeleteTokenDTO): Promise<void>;
}

export { ITokenRepository };
