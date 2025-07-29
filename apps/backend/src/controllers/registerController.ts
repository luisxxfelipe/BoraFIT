import { Request, Response } from 'express';
import { registerUser } from '../services/registerService';

export const registerController = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    if (!user) return res.status(400).json({ error: 'Email já cadastrado' });
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar usuário', details: error });
  }
};
