import { UserEntity } from "../database/entities/UserEntity";
import { UsersRepository } from "../database/repositories/UsersRepository";
import { hash } from "bcrypt";
import { AppError } from "../shared/errors";

type CreateUserDTO = {
    userData: UserEntity;
}

class CreateUserService{

    async execute({ userData }: CreateUserDTO): Promise<UserEntity>{
        
        const { email, password, birthDate } = userData;
        const usersRepository = new UsersRepository();

        const userConflict = await usersRepository.findByEmail({ email });

        if (userConflict) {
            
            throw new AppError("User Already exists!", 409);
        }

        const newPass = await hash(password, 10);

        userData.password = newPass;

        if (userData?.birthDate){
            userData.birthDate = new Date(userData.birthDate).toISOString() as unknown as Date;
        }


        const newUser = await usersRepository.create({ uData: userData });
        if (!newUser) {
            throw new AppError("User creation failed, contact support for more details", 400)
        }

        return newUser;
    }
};

export { CreateUserService };