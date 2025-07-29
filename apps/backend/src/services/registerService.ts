import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function registerUser(data: {
  nome: string;
  email: string;
  senha: string;
  altura?: number;
  peso?: number;
  objetivo?: string;
  diasSemana?: number;
  tipo?: string;
}): Promise<User | null> {
  const exists = await prisma.user.findUnique({ where: { email: data.email } });
  if (exists) return null;
  const hash = await bcrypt.hash(data.senha, 10);
  const user = await prisma.user.create({
    data: {
      nome: data.nome,
      email: data.email,
      senha: hash,
      altura: data.altura ?? 0,
      peso: data.peso ?? 0,
      objetivo: data.objetivo ?? '',
      diasSemana: data.diasSemana ?? 0,
      tipo: data.tipo ?? 'comum',
    },
  });
  return user;
}
