
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string; [key: string]: any };
  file?: Express.Multer.File;
}

export const updateProfileController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { nome, altura, peso, objetivo, diasSemana, tipo } = req.body;
    const user = await prisma.user.update({
      where: { id: userId },
      data: { nome, altura, peso, objetivo, diasSemana, tipo },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar perfil', details: error });
  }
};

export const uploadProfilePhotoController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!req.file) return res.status(400).json({ error: 'Nenhuma foto enviada' });
    // Remove foto antiga se existir
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user?.fotoPerfil) {
      const oldPath = path.join(__dirname, '../../uploads', user.fotoPerfil);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    // Salva nova foto
    await prisma.user.update({
      where: { id: userId },
      data: { fotoPerfil: req.file.filename },
    });
    res.json({ success: true, filename: req.file.filename });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar foto de perfil', details: error });
  }
};

export const deleteProfilePhotoController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user?.fotoPerfil) {
      const filePath = path.join(__dirname, '../../uploads', user.fotoPerfil);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      await prisma.user.update({ where: { id: userId }, data: { fotoPerfil: null } });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao apagar foto de perfil', details: error });
  }
};
