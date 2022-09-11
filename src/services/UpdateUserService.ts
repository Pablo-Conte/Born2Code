import { UserEntity } from "../database/entities/UserEntity";
import { UsersRepository } from "../database/repositories/UsersRepository";
import { AppError } from "../shared/errors";

type TUpdateUser = {
    id: string
    userData: Partial<UserEntity>;
}

class UpdateUserService {
    
    async execute({ id, userData }: TUpdateUser ): Promise<UserEntity> {
        
        const usersRepository = new UsersRepository();

        const userAlreadyExists = await usersRepository.findById({ id })
        
        if (!userAlreadyExists) {
            throw new AppError("User not found!", 404);
        }

        const updatedUser = await usersRepository.update({ id, userData });
    
        if (!updatedUser) {
            throw new AppError ("User update failed, contact support for more details", 400);
        }
        
        return updatedUser;
    }
}

export { UpdateUserService };