import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Inserting a new user into the database...");
    const user = await prisma.user.create({
        data: {
            firstName: "Emilio",
            lastName: "Resende",
            age: 35,
        },
        select: { id: true },
    });
    console.log("Created a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await prisma.user.findMany();
    console.log("Loaded users: ", users);

    const invoice = await prisma.invoice.create({
        data: {
            name: "new invoice",
            user: {connect: users[0]}
        },
        select: { id: true }
    });
    console.log("Created a new invoice with id: " + user.id);
    
    console.log("Loading invoices from the database...");
    const invoices = await prisma.invoice.findMany();
    console.log("Loaded invoices: ", invoices);

    console.log(
        "Here you can setup and run express / fastify / any other framework."
    );
}

main()
    .then(() => {
        console.log("exec terminated gracefully...");
    })
    .catch(() => {
        console.log("exec terminated badly...");
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
