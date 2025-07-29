import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function findUserById(id: number): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

export async function createUser(data: {
  nome: string;
  email: string;
  senha: string;
  altura: number;
  peso: number;
  objetivo: string;
  diasSemana: number;
}): Promise<User> {
  const hashedPassword = await bcrypt.hash(data.senha, 10);
  return prisma.user.create({
    data: { ...data, senha: hashedPassword }
  });
}
