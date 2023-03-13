import { CreateUserTokenDTO, DeleteTokenDTO, FindUserIdDTO, TokenEntity } from "../../@types"

interface ITokenRepository {
  create({
    tokenData: { userId, token },
  }: CreateUserTokenDTO): Promise<void>;

  delete({ userId }: DeleteTokenDTO): Promise<void>;

  findByUserId({ userId }: FindUserIdDTO): Promise<TokenEntity>;
}

export { ITokenRepository };