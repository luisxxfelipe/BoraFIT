import { PrismaClient, Diet } from '@prisma/client';

const prisma = new PrismaClient();

export async function createDiet(data: {
  calorias: number;
  proteinas: number;
  carbs: number;
  gorduras: number;
  horarios: string;
  userId: number;
}): Promise<Diet> {
  return prisma.diet.create({ data });
}

export async function getDietById(id: number): Promise<Diet | null> {
  return prisma.diet.findUnique({ where: { id } });
}

export async function listDietsByUser(userId: number): Promise<Diet[]> {
  return prisma.diet.findMany({ where: { userId } });
}

export async function updateDiet(id: number, data: Partial<Diet>): Promise<Diet | null> {
  return prisma.diet.update({ where: { id }, data });
}

export async function deleteDiet(id: number): Promise<Diet | null> {
  return prisma.diet.delete({ where: { id } });
}
