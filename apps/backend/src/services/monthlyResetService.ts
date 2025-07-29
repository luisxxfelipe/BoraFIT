import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function resetMonthlyRankingAndPhotos() {
  // Apaga rankings
  await prisma.ranking.updateMany({ data: { pontos: 0, foto: null } });

  // Apaga fotos dos rankings
  const rankings = await prisma.ranking.findMany({ where: { foto: { not: null } } });
  for (const ranking of rankings) {
    if (ranking.foto) {
      const filePath = path.join(__dirname, '../../uploads', ranking.foto);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  }

  // Apaga fotos dos checkins
  const checkins = await prisma.checkin.findMany({ where: { fotoUrl: { not: '' } } });
  for (const checkin of checkins) {
    if (checkin.fotoUrl) {
      const filePath = path.join(__dirname, '../../uploads', checkin.fotoUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  }

  // Zera fotoUrl dos checkins
  await prisma.checkin.updateMany({ data: { fotoUrl: '' } });

  return { success: true };
}
