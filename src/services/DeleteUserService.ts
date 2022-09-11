import { UserEntity } from "../database/entities/UserEntity";
import { UsersRepository } from "../database/repositories/UsersRepository";
import { AppError } from "../shared/errors";

type TDeleteUser = {
    myId: string
    id: string
}

class DeleteUserService {
    
    async execute({ id, myId }: TDeleteUser): Promise<void>{
        
        const usersRepository = new UsersRepository();
        
        let userToDelete = myId;
        
        if(id && id != myId){
            
            const userAlreadyExists = await usersRepository.findById({ id });
            
            if(!userAlreadyExists) {
                throw new AppError("User not exists!", 404);
            }
            
            userToDelete = id;
            
        }
        
        console.log(userToDelete)
        await usersRepository.delete({ myId: userToDelete });
    
        return;
    }
}

export { DeleteUserService }