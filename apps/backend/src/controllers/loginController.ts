import { Request, Response } from 'express';
import { authenticateUser } from '../services/authService';

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    const result = await authenticateUser(email, senha);
    if (!result) return res.status(401).json({ error: 'Credenciais inválidas' });
    res.json({ token: result.token, user: result.user });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar login', details: error });
  }
};
