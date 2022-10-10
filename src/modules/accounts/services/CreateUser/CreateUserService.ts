import { hash } from "bcrypt";
import { UserEntity } from "../../../../database/entities/UserEntity";
import { UsersRepository } from "../../../../database/repositories/UsersRepository";
import { AppError } from "../../../../shared/errors";

type TCreateUser = {
    userData: UserEntity;
}

class CreateUserService{

    async execute({ userData }: TCreateUser): Promise<UserEntity>{
        
        const { email, password, cellNumber } = userData;
        const usersRepository = new UsersRepository();

        const cellNumberConflict = await usersRepository.findByCellNumber({ cellNumber })
        const userConflict = await usersRepository.findByEmail({ email });

        if (userConflict || cellNumberConflict) {
            
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