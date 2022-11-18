import { prisma } from "../../../../../../prisma/PrismaClient";
import { CreateTokenDTO } from "../../../@types/CreateTokenDTO";
import { FindUserDTO } from "../../../../accounts/@types/FindUserDTO";

import { TokenEntity } from "../../entities/TokenEntity";
import { ITokenRepository } from "../ITokenRepository";

class TokenRepository implements ITokenRepository {
  async create({
    tokenData: { userId, token },
  }: CreateTokenDTO): Promise<void> {
    await prisma.tokens.create({
      data: {
        userId,
        token,
      },
    });
  }

  async findByUserId({ userId }: FindUserDTO): Promise<TokenEntity> {
    const foundedToken = await prisma.tokens.findFirst({
      where: {
        userId,
      },
    });
    return foundedToken;
  }

  async delete({ userId }: FindUserDTO): Promise<void> {
    await prisma.tokens.delete({
      where: {
        userId,
      },
    });
  }
}

export { TokenRepository };
