import { Router, Request, Response } from 'express';
import { getUser, createUser } from '../controllers/userController';
import { authenticateJWT } from '../middlewares/authMiddleware';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const router = Router();

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Retorna dados do usuário autenticado
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário autenticado
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.get('/me', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  res.json(req.user);
});

router.get('/:id', authenticateJWT, getUser);
router.post('/', createUser);

export default router;
