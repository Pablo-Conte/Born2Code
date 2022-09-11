import { UserEntity } from "../database/entities/UserEntity";
import { UsersRepository } from "../database/repositories/UsersRepository";
import { AppError } from "../shared/errors";

type TDeleteUser = {
    id: string
}

class DeleteUserService {
    async execute({ id }: TDeleteUser): Promise<void>{
        const usersRepository = new UsersRepository();

        const userAlreadyExists = await usersRepository.findById({ id });

        if(!userAlreadyExists) {
            throw new AppError("User not exists!", 404);
        }

        await usersRepository.delete({ id });

        return;
    }
}

export { DeleteUserService }