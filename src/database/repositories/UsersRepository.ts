import { prisma } from "../../../prisma/PrismaClient";
import { UserEntity } from "../entities/UserEntity";

type CreateUserDTO = {
    uData: UserEntity;
}

type findByEmailDTO = {
    email: string
}

type findByCellNumberDTO = {
    cellNumber: string
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

    async findByCellNumber({ cellNumber }: findByCellNumberDTO): Promise<UserEntity> {
        const numberFound = await prisma.user.findFirst({
            where: {
                cellNumber
            }
        })

        return numberFound;
    }

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