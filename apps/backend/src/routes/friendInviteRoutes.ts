import { Router } from 'express';
import { FriendInviteController } from '../controllers/friendInviteController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

// Gera link de convite
router.post('/invite', authenticateJWT, (req, res) => FriendInviteController.generateInvite(req, res));

// Aceita convite
router.post('/invite/accept/:token', authenticateJWT, (req, res) => FriendInviteController.acceptInvite(req, res));

export default router;
