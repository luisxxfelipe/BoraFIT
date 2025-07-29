import { Router, Request, Response } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { createRankingController, getRankingController, listRankingsByUserController, listFriendsRankingsController, updateRankingController, deleteRankingController } from '../controllers/rankingController';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const router = Router();

/**
 * @swagger
 * /api/ranking:
 *   post:
 *     summary: Cria ranking para o usuário autenticado
 *     tags: [Ranking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pontos:
 *                 type: number
 *               foto:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ranking criado
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.post('/', authenticateJWT, createRankingController);

/**
 * @swagger
 * /api/ranking:
 *   get:
 *     summary: Lista todos os rankings gerais
 *     tags: [Ranking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de rankings
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.get('/', authenticateJWT, listFriendsRankingsController);

/**
 * @swagger
 * /api/ranking/user:
 *   get:
 *     summary: Lista rankings do usuário autenticado
 *     tags: [Ranking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de rankings do usuário
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.get('/user', authenticateJWT, listRankingsByUserController);

/**
 * @swagger
 * /api/ranking/{id}:
 *   get:
 *     summary: Busca ranking por ID
 *     tags: [Ranking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ranking encontrado
 *       404:
 *         description: Ranking não encontrado
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.get('/:id', authenticateJWT, getRankingController);

/**
 * @swagger
 * /api/ranking/{id}:
 *   put:
 *     summary: Atualiza ranking por ID
 *     tags: [Ranking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Ranking atualizado
 *       404:
 *         description: Ranking não encontrado
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.put('/:id', authenticateJWT, updateRankingController);

/**
 * @swagger
 * /api/ranking/{id}:
 *   delete:
 *     summary: Exclui ranking por ID
 *     tags: [Ranking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ranking excluído
 *       404:
 *         description: Ranking não encontrado
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.delete('/:id', authenticateJWT, deleteRankingController);

export default router;
