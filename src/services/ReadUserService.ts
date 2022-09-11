import { UserEntity } from "../database/entities/UserEntity";
import { UsersRepository } from "../database/repositories/UsersRepository"
import { AppError } from "../shared/errors";

type TReadUser = {
    id: string
}

class ReadUserService {

    async execute({ id }: TReadUser): Promise<UserEntity>{

        const usersRepository =  new UsersRepository();
        
        const userAlreadyExists = await usersRepository.findById({ id })
        if(!userAlreadyExists){
            throw new AppError("User don't exists", 404)
        }
        
        return userAlreadyExists;
    } 


}

export { ReadUserService }