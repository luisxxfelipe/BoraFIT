import { Request, Response } from 'express';
import { FriendInviteService } from '../services/friendInviteService';

export class FriendInviteController {
  static async generateInvite(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      const token = await FriendInviteService.generateInvite(userId);
      res.json({ inviteLink: `/api/friends/invite/accept/${token}` });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: message });
    }
  }

  static async acceptInvite(req: Request, res: Response) {
    try {
      const { token } = req.params;
      const invitedId = (req as any).user?.id;
      await FriendInviteService.acceptInvite(token, invitedId);
      res.json({ success: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      res.status(400).json({ error: message });
    }
  }
}
