//1 - pegar ID do user
//2 - verificar se o user com esse ID é administrador
//3 - se for, pega o user do header e muda o atributo admin para true 
//4 - se não, retorna erro de autorização

import { UserEntity } from "../../../database/entities/UserEntity"
import { UsersRepository } from "../../../database/repositories/UsersRepository"
import { AppError } from "../../../shared/errors"




type TAddUser = {
    userId: string, 
    headerUserId: string
}

type TUserData = {
    userData: Partial<UserEntity>
    headerUserid: string
}

class AddAdminService {

    async execute({ userId, headerUserId}: TAddUser): Promise<void> {

        const usersRepository = new UsersRepository();

        const myUserIsAdmin = await usersRepository.findById({ id: userId });

        if (myUserIsAdmin.admin == false) {
            throw new AppError("User is not a Admin to change permission for this user", 401)
        }
        
        const userToChangeExists = await usersRepository.findById({ id: headerUserId });

        if (!userToChangeExists) {
            throw new AppError("This isn't a valid user ID, try again!", 404)
        }

        const setUserAdmin = await usersRepository.setAdmin({ userId: headerUserId }) 
    }
}




export { AddAdminService };