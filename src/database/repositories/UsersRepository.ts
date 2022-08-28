import { prisma } from "../../../prisma/PrismaClient";
import { UserEntity } from "../entities/UserEntity";

type CreateUserDTO = {
    userData: UserEntity;
}

type findByEmailDTO = {
    email: string
}

class UsersRepository {

    async create({ userData }: CreateUserDTO) {
        const newUser = await prisma.user.create({
            data: {
                ... userData
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