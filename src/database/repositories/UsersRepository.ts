import { prisma } from "../../../prisma/PrismaClient";
import { UserEntity } from "../entities/UserEntity";

type CreateUserDTO = {
    uData: UserEntity;
}

type findByEmailDTO = {
    email: string
}

class UsersRepository {

    async create({ uData }: CreateUserDTO): Promise<UserEntity> {
        const newUser = await prisma.user.create({
            data: {
                ... uData //spread
            }
        })

        return newUser;
    };

    async findByEmail({ email }: findByEmailDTO): Promise<UserEntity>{
        const userFound = await prisma.user.findFirst({
            where: {
                email
            }
        })

        return userFound;
    }
}

export { UsersRepository };