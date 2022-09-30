import { Tokens } from "@prisma/client";

class TokenEntity implements Tokens {
    
    readonly id: string;
    userId: string;
    token: string;
    readonly created_at: Date;
    readonly updated_at: Date;
}

export { TokenEntity }