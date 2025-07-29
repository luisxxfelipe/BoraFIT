import { Request, Response } from 'express';
import { addFriend, listFriends, removeFriend } from '../services/friendService';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const addFriendController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { friendId } = req.body;
    const friend = await addFriend(userId, friendId);
    res.status(201).json(friend);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar amigo', details: error });
  }
};

export const listFriendsController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const friends = await listFriends(userId);
    res.json(friends);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar amigos', details: error });
  }
};

export const removeFriendController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { friendId } = req.body;
    const friend = await removeFriend(userId, friendId);
    if (!friend) return res.status(404).json({ error: 'Amigo não encontrado' });
    res.json({ message: 'Amigo removido', friend });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover amigo', details: error });
  }
};
