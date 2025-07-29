import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/authService';

// Adiciona tipagem customizada para req.user
interface AuthenticatedRequest extends Request {
  user?: any;
}

export function authenticateJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ error: 'Token inválido ou expirado' });
  req.user = payload;
  next();
}
