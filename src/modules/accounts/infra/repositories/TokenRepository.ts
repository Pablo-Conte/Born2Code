import { prisma } from "../../../../../prisma/PrismaClient";
import {
  CreateUserTokenDTO,
  DeleteTokenDTO,
  FindUserIdDTO,
} from "../../@types";
import { TokenEntity } from "../entities/TokenEntity";

class TokenRepository {
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

  async delete({ userId }: DeleteTokenDTO): Promise<void> {
    await prisma.tokens.delete({
      where: {
        userId,
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
}

export { TokenRepository };
