import { Router, Request, Response } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { createWorkoutController, getWorkoutController, listWorkoutsController, updateWorkoutController, deleteWorkoutController } from '../controllers/workoutController';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const router = Router();

/**
 * @swagger
 * /api/workouts:
 *   post:
 *     summary: Cria ficha de treino para o usuário autenticado
 *     tags: [Workout]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               divisao:
 *                 type: string
 *               reps:
 *                 type: number
 *               cargas:
 *                 type: string
 *               descanso:
 *                 type: number
 *     responses:
 *       201:
 *         description: Ficha criada
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.post('/', authenticateJWT, createWorkoutController);

/**
 * @swagger
 * /api/workouts:
 *   get:
 *     summary: Lista todas as fichas de treino do usuário autenticado
 *     tags: [Workout]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de fichas de treino
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.get('/', authenticateJWT, listWorkoutsController);

/**
 * @swagger
 * /api/workouts/{id}:
 *   get:
 *     summary: Busca ficha de treino por ID
 *     tags: [Workout]
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
 *         description: Ficha de treino encontrada
 *       404:
 *         description: Ficha de treino não encontrada
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.get('/:id', authenticateJWT, getWorkoutController);

/**
 * @swagger
 * /api/workouts/{id}:
 *   put:
 *     summary: Atualiza ficha de treino por ID
 *     tags: [Workout]
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
 *         description: Ficha de treino atualizada
 *       404:
 *         description: Ficha de treino não encontrada
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.put('/:id', authenticateJWT, updateWorkoutController);

/**
 * @swagger
 * /api/workouts/{id}:
 *   delete:
 *     summary: Exclui ficha de treino por ID
 *     tags: [Workout]
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
 *         description: Ficha de treino excluída
 *       404:
 *         description: Ficha de treino não encontrada
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.delete('/:id', authenticateJWT, deleteWorkoutController);

export default router;
