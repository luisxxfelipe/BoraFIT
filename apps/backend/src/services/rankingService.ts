import { PrismaClient, Ranking } from '@prisma/client';

const prisma = new PrismaClient();

export async function createRanking(data: {
  pontos: number;
  foto?: string;
  userId: number;
}): Promise<Ranking> {
  return prisma.ranking.create({ data });
}

export async function getRankingById(id: number): Promise<Ranking | null> {
  return prisma.ranking.findUnique({ where: { id } });
}

export async function listRankingsByUser(userId: number): Promise<Ranking[]> {
  return prisma.ranking.findMany({ where: { userId } });
}


export async function listFriendsRankings(userId: number): Promise<Ranking[]> {
  // Busca amigos do usuário
  const friends = await prisma.friend.findMany({
    where: { userId },
    select: { friendId: true },
  });
  // Inclui o próprio usuário
  const ids = [userId, ...friends.map(f => f.friendId)];
  // Retorna ranking apenas dos amigos e do próprio usuário
  return prisma.ranking.findMany({
    where: { userId: { in: ids } },
    orderBy: { pontos: 'desc' },
    include: { user: true },
  });
}

export async function updateRanking(id: number, data: Partial<Ranking>): Promise<Ranking | null> {
  return prisma.ranking.update({ where: { id }, data });
}

export async function deleteRanking(id: number): Promise<Ranking | null> {
  return prisma.ranking.delete({ where: { id } });
}
