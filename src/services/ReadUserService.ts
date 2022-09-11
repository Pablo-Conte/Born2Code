import { UserEntity } from "../database/entities/UserEntity";
import { UsersRepository } from "../database/repositories/UsersRepository"
import { AppError } from "../shared/errors";

type TReadUser = {
    myId: string
    id: string
}

class ReadUserService {

    async execute({ myId, id }: TReadUser): Promise<UserEntity>{

        const usersRepository =  new UsersRepository();

        let userToRead = myId;

        if(id && id != myId){

            userToRead = id

        }

        const userAlreadyExists = await usersRepository.findById({ id: userToRead })
        
        
        return userAlreadyExists;
    } 


}

export { ReadUserService }