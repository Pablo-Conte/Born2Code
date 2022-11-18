import { CreateTokenDTO } from "../../@types/CreateTokenDTO";
import { FindUserDTO } from "../../@types/FindUserDTO";
import { TokenEntity } from "../entities/TokenEntity";

interface ITokenRepository {
  create({ tokenData: { userId, token } }: CreateTokenDTO): Promise<void>;
  findByUserId({ userId }: FindUserDTO): Promise<TokenEntity>;
  delete({ userId }: FindUserDTO): Promise<void>;
}

export { ITokenRepository };
