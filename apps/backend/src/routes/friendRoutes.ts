import { Router, Request, Response } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { addFriendController, listFriendsController, removeFriendController } from '../controllers/friendController';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const router = Router();

/**
 * @swagger
 * /api/friends:
 *   post:
 *     summary: Adiciona amigo pelo ID
 *     tags: [Friend]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               friendId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Amigo adicionado
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.post('/', authenticateJWT, addFriendController);

/**
 * @swagger
 * /api/friends:
 *   get:
 *     summary: Lista amigos do usuário autenticado
 *     tags: [Friend]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de amigos
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.get('/', authenticateJWT, listFriendsController);

/**
 * @swagger
 * /api/friends:
 *   delete:
 *     summary: Remove amigo pelo ID
 *     tags: [Friend]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               friendId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Amigo removido
 *       404:
 *         description: Amigo não encontrado
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.delete('/', authenticateJWT, removeFriendController);

export default router;
