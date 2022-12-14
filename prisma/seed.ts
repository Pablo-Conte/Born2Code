import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");
  const create = await prisma.user.create({
    data: {
      name: "Administrador",
      email: "administrador@gmail.com",
      password: "$2b$10$moCHIc8JSeD0aUvCiuQcQ.j9KeWrjA8FwmGx6jfQchW6vtOy1VkSS",
      admin: true,
    },
  });
  console.log(`Created user with id:  ${create.name}`);
}
console.log("Seeding finished");

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
