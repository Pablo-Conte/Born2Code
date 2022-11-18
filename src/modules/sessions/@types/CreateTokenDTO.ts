import { TokenEntity } from "../infra/entities/TokenEntity";

type CreateTokenDTO = {
  tokenData: Partial<TokenEntity>;
};

export { CreateTokenDTO };
