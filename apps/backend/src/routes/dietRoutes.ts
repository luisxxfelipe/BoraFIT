import { Router, Request, Response } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { createDietController, getDietController, listDietsController, updateDietController, deleteDietController } from '../controllers/dietController';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const router = Router();

/**
 * @swagger
 * /api/diets:
 *   post:
 *     summary: Cria ficha alimentar para o usuário autenticado
 *     tags: [Diet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               calorias:
 *                 type: number
 *               proteinas:
 *                 type: number
 *               carbs:
 *                 type: number
 *               gorduras:
 *                 type: number
 *               horarios:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ficha alimentar criada
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.post('/', authenticateJWT, createDietController);

/**
 * @swagger
 * /api/diets:
 *   get:
 *     summary: Lista todas as fichas alimentares do usuário autenticado
 *     tags: [Diet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de fichas alimentares
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.get('/', authenticateJWT, listDietsController);

/**
 * @swagger
 * /api/diets/{id}:
 *   get:
 *     summary: Busca ficha alimentar por ID
 *     tags: [Diet]
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
 *         description: Ficha alimentar encontrada
 *       404:
 *         description: Ficha alimentar não encontrada
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.get('/:id', authenticateJWT, getDietController);

/**
 * @swagger
 * /api/diets/{id}:
 *   put:
 *     summary: Atualiza ficha alimentar por ID
 *     tags: [Diet]
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
 *         description: Ficha alimentar atualizada
 *       404:
 *         description: Ficha alimentar não encontrada
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.put('/:id', authenticateJWT, updateDietController);

/**
 * @swagger
 * /api/diets/{id}:
 *   delete:
 *     summary: Exclui ficha alimentar por ID
 *     tags: [Diet]
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
 *         description: Ficha alimentar excluída
 *       404:
 *         description: Ficha alimentar não encontrada
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.delete('/:id', authenticateJWT, deleteDietController);

export default router;
