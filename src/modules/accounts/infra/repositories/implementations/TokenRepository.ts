import { prisma } from "../../../../../../prisma/PrismaClient";
import {
  CreateUserTokenDTO,
  DeleteTokenDTO,
  FindUserIdDTO,
} from "../../../@types";
import { TokenEntity } from "../../entities/TokenEntity";
import { ITokenRepository } from "../ITokenRepository";

class TokenRepository implements ITokenRepository {
  async create({
    tokenData: { userId, token },
  }: CreateUserTokenDTO): Promise<void> {
    await prisma.tokens.create({
      data: {
        userId,
        token,
      },
    });
  }

  async findByUserId({ userId }: FindUserIdDTO): Promise<TokenEntity> {
    const foundedToken = await prisma.tokens.findFirst({
      where: {
        userId,
      },
    });
    return foundedToken;
  }

  async delete({ userId }: DeleteTokenDTO): Promise<void> {
    await prisma.tokens.delete({
      where: {
        userId,
      },
    });
  }
}

export { TokenRepository };
