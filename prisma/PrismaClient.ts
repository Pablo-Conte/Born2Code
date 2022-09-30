import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://pablo:17092022born2code@database_born2code:5432/born2code"
        }
    }
});

export { prisma };