import { Router } from 'express';
import { monthlyResetController } from '../controllers/monthlyResetController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

// Endpoint para resetar ranking e fotos (protegido)
router.post('/reset-monthly', authenticateJWT, monthlyResetController);

export default router;
