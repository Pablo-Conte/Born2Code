import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { UsersRepository } from "../database/repositories/UsersRepository";
import auth from "../settings/auth";
import { AppError } from "../shared/errors";

type TUserLogin = {
    email: string;
    password: string;
}

type TloginReturn = {
    newToken: string;
}

class UserLoginService {
    async execute({ email, password }: TUserLogin): Promise<TloginReturn>{
        const { secret, countdown } = auth;

        const usersRepository = new UsersRepository();

        const userAlreadyExists = await usersRepository.findByEmail({ email });
        if (!userAlreadyExists) {
            throw new AppError("Incorrect email or password", 400);
        }

        const passwordMatch = await compare(password, userAlreadyExists.password)
        if (!passwordMatch) {
            throw new AppError("Incorrect email or password", 400);
        }

        const newToken = sign({ email }, secret, {
            subject: userAlreadyExists.id,
            expiresIn: countdown
        })

        if (!newToken) {
            throw new AppError("Login failed, contact support for more details", 401)
        }

        return { newToken };
    }
}

export { UserLoginService };