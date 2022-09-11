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

type findByIdDTO = {
    id: string
}

type UpdateUserDTO = {
    id: string
    userData: Partial<UserEntity>
}

type DeleteUserDTO = {
    id: string
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

    async findById({ id }: findByIdDTO){
        const userFound = await prisma.user.findFirst({
            where: {
                id
            }
        })

        return userFound;
    }

    async update({ id, userData }: UpdateUserDTO): Promise<UserEntity> {
        
        const updatedUser = await prisma.user.update({
                where: {
                    id
                },
                data: userData
        });
        
        return updatedUser;
    }

    async delete({ id }: DeleteUserDTO): Promise<void> {

        await prisma.user.delete({
            where: {
                id
            }
        })
    }
}

export { UsersRepository };