import { TokenRepository } from "../../../database/repositories/TokenRepository";


type TUserLogout = {
    userId: string;
}

class UserLogoutService {
    async execute({ userId }: TUserLogout): Promise<void> {
        const tokensRepository = new TokenRepository()

        await tokensRepository.delete({ userId })
    }
}

export { UserLogoutService }