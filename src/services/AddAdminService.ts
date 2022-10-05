//1 - pegar ID do user
//2 - verificar se o user com esse ID é administrador
//3 - se for, pega o user do header e muda o atributo admin para true 
//4 - se não, retorna erro de autorização

import { UsersRepository } from "../database/repositories/UsersRepository";


type TAddUser = {
    userId: string, 
    headerUserId: string
}

class AddAdminService {

    async execute({ userId, headerUserId}: TAddUser): Promise<void> {

        const usersRepository = new UsersRepository();

        const verifyIfUserIsAdmin = await usersRepository.findById({ id: headerUserId });
    }
}




export { AddAdminService };