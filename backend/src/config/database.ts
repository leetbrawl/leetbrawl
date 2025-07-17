import { PrismaClient } from '@prisma/client';

// Create a global Prisma client instance
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Enable logging
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

//testing

export { prisma };