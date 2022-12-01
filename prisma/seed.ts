import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");
  const create = await prisma.user.create({
    data: {
      name: "Administrador",
      email: "administrador@gmail.com",
      password: "123456",
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
