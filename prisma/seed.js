// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Nettoyer dans l'ordre inverse des dépendances
  await prisma.sessionSpeaker.deleteMany();
  await prisma.question.deleteMany();
  await prisma.session.deleteMany();
  await prisma.event.deleteMany();
  await prisma.room.deleteMany();
  await prisma.speaker.deleteMany();
  await prisma.admin.deleteMany();

  // ROOMS (id auto-incrémenté)
  const roomA = await prisma.room.create({
    data: { name: "Salle A" },
  });
  const roomB = await prisma.room.create({
    data: { name: "Salle B" },
  });
  const roomC = await prisma.room.create({
    data: { name: "Salle C" },
  });

  // SPEAKERS (id est une String à fournir)
  const speaker1 = await prisma.speaker.create({
    data: {
      id: "ben",
      name: "Ben Rakoto",
      bio: "Expert en AgriTech et Machine Learning",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      expertise: ["Agriculture", "IA", "Machine Learning"],
    },
  });

  const speaker2 = await prisma.speaker.create({
    data: {
      id: "aina",
      name: "Aina Tsiory",
      bio: "Spécialiste en drones et capteurs",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      expertise: ["Drones", "IoT", "Capteurs"],
    },
  });

  // ADMIN (id auto-incrémenté)
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.admin.create({
    data: {
      email: "admin@eventsync.com",
      password_hash: hashedPassword,  // Note: c'est password_hash, pas password
    },
  });

  // EVENT (id auto-incrémenté)
  const event = await prisma.event.create({
    data: {
      title: "Conférence AgriTech Madagascar",
      description: "Utilisation de l'IA pour l'aide à la décision agricole.",
      startDate: new Date("2026-05-15"),
      endDate: new Date("2026-05-16"),
      location: "Antananarivo",
      category: "Agriculture",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2",
    },
  });

  // SESSIONS (id auto-incrémenté)
  const session1 = await prisma.session.create({
    data: {
      title: "Introduction",
      description: "Présentation générale du programme.",
      startTime: new Date("2026-05-15T09:00:00"),
      endTime: new Date("2026-05-15T10:00:00"),
      capacity: 120,
      roomId: roomA.id,
      eventId: event.id,
    },
  });

  const session2 = await prisma.session.create({
    data: {
      title: "Drones et Capteurs",
      description: "Utilisation des drones agricoles.",
      startTime: new Date("2026-05-15T11:00:00"),
      endTime: new Date("2026-05-15T12:30:00"),
      capacity: 80,
      roomId: roomB.id,
      eventId: event.id,
    },
  });

  // SESSION SPEAKERS (relation many-to-many)
  await prisma.sessionSpeaker.createMany({
    data: [
      { sessionId: session1.id, speakerId: speaker1.id },
      { sessionId: session2.id, speakerId: speaker2.id },
    ],
  });

  // QUESTIONS (id auto-incrémenté)
  await prisma.question.create({
    data: {
      content: "Quels sont les objectifs principaux ?",
      author: "Jean",
      upvotes: 12,
      sessionId: session1.id,
    },
  });

  console.log("✅ Database seeded successfully!");
  console.log(`   - ${await prisma.admin.count()} admins`);
  console.log(`   - ${await prisma.event.count()} événements`);
  console.log(`   - ${await prisma.session.count()} sessions`);
  console.log(`   - ${await prisma.speaker.count()} intervenants`);
  console.log(`   - ${await prisma.room.count()} salles`);
  console.log(`   - ${await prisma.question.count()} questions`);
}

main()
  .catch((e) => {
    console.error("❌ Erreur:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });