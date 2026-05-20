const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('monmotdepasse', 10);
  const result = await prisma.admin.upsert({
    where: { email: 'nouveladmin@example.com' },
    update: {}, 
    create: { email: 'nouveladmin@example.com', password_hash: hash },
  });
  console.log('✅ Admin ajouté ou déjà présent :', result.email);
}
main().finally(() => prisma.$disconnect());