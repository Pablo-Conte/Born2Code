import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model === "User" && params.action === "create") {
    const hashedPassword = await hash(params.args.data.password, 10);
    params.args.data.password = hashedPassword;
  }
  const result = await next(params);

  return result;
});

async function main() {
  console.log("Start seeding...");
  const create = await prisma.user.create({
    data: {
      name: "Administrador",
      email: "administrador@gmail.com",
      password: "1234",
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
