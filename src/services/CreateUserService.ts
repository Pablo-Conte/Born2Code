import { UserEntity } from "../database/entities/UserEntity";
import { UsersRepository } from "../database/repositories/UsersRepository";
import { hash } from "bcrypt";

type CreateUserDTO = {
    userData: UserEntity;
}

class CreateUserService{

    async execute({ userData }: CreateUserDTO): Promise<UserEntity>{
        
        const { email, password } = userData;
        const usersRepository = new UsersRepository();

        const userConflict = await usersRepository.findByEmail({ email });

        if (userConflict) {
            throw new Error("User Already exists!");
        }

        const newPass = await hash(password, 10);

        userData.password = newPass;

        const newUser = await usersRepository.create({ uData: userData });
        if (!newUser) {
            throw new Error ("User creation failed, contact support for more details")
        }

        return newUser;
    }
};

export { CreateUserService };