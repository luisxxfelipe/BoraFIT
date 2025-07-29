import { PrismaClient, Workout } from '@prisma/client';

const prisma = new PrismaClient();

export async function createWorkout(data: {
  divisao: string;
  reps: number;
  cargas: string;
  descanso: number;
  userId: number;
}): Promise<Workout> {
  return prisma.workout.create({ data });
}

export async function getWorkoutById(id: number): Promise<Workout | null> {
  return prisma.workout.findUnique({ where: { id } });
}

export async function listWorkoutsByUser(userId: number): Promise<Workout[]> {
  return prisma.workout.findMany({ where: { userId } });
}

export async function updateWorkout(id: number, data: Partial<Workout>): Promise<Workout | null> {
  return prisma.workout.update({ where: { id }, data });
}

export async function deleteWorkout(id: number): Promise<Workout | null> {
  return prisma.workout.delete({ where: { id } });
}
