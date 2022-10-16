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
    myId: string
}

type SetAdminDTO = {
    userId: string
}

type IsAdminDTO = {
    userId: string
}

type ReadAllbooksDTO = {
    userId: string
}

class UsersRepository {

    async readAllBooks({ userId }: ReadAllbooksDTO) {
        
        const booksFound = await prisma.user.findMany({
            where: {
                id: userId
            },
            include: {
                bookRented: { include: { Book: true }}
            } 
        })

        const result = booksFound.map((books) => {

            const book = books.bookRented

            return book.map((books) => { return books.Book })

        })

        return result;
    }

    async isAdmin({ userId }: IsAdminDTO): Promise<boolean> {
        const userFound = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })
        return userFound.admin;
    }

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

    async delete({ myId }: DeleteUserDTO): Promise<void> {
        
        await prisma.user.delete({
            where: {
                id: myId
            }
        })
    }

    async setAdmin({ userId }: SetAdminDTO): Promise<void> {
        
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                admin: true
            }
        })
    }

    async readAll (): Promise<UserEntity[]>  {
        
        const findUsers = await prisma.user.findMany()

        return findUsers;
    }
}

export { UsersRepository };