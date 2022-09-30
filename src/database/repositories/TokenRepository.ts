import { prisma } from "../../../prisma/PrismaClient";
import { TokenEntity } from "../entities/TokenEntity";

type CreateUserDTO = {
    tokenData: Partial<TokenEntity>;
};

type FindUserIdDTO = {
    userId: string;
};

type DeleteTokenDTO = {
    userId: string;
};

class TokenRepository {
    async create({ tokenData: { userId, token }}: CreateUserDTO): Promise<void> {
        await prisma.tokens.create({
            data: {
                userId,
                token
            }
            
        });
    };

    async delete({ userId }: DeleteTokenDTO): Promise<void> {

        await prisma.tokens.delete({
            where: {
                userId
            }
        });
    };

    async findByUserId({ userId }: FindUserIdDTO): Promise<TokenEntity>{
        
        const foundedToken = await prisma.tokens.findFirst({
            where: {
                userId
            }
        });
        return foundedToken;
    };

};

export { TokenRepository };