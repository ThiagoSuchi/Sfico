//src/config/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

// Se ja foi criado uma instância, ela é reutilizada
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma
}

export default prisma;