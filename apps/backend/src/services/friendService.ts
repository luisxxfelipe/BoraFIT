import { PrismaClient, Friend } from '@prisma/client';

const prisma = new PrismaClient();

export async function addFriend(userId: number, friendId: number): Promise<Friend> {
  return prisma.friend.create({ data: { userId, friendId } });
}

export async function listFriends(userId: number): Promise<Friend[]> {
  return prisma.friend.findMany({ where: { userId } });
}

export async function removeFriend(userId: number, friendId: number): Promise<Friend | null> {
  const friend = await prisma.friend.findFirst({ where: { userId, friendId } });
  if (!friend) return null;
  return prisma.friend.delete({ where: { id: friend.id } });
}
