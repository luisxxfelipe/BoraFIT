import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FriendInviteService {
  static async generateInvite(userId: number) {
    const token = uuidv4();
    await prisma.friendInvite.create({
      data: {
        token,
        inviterId: userId,
        used: false,
      },
    });
    return token;
  }

  static async acceptInvite(token: string, invitedId: number) {
    const invite = await prisma.friendInvite.findUnique({ where: { token } });
    if (!invite || invite.used) throw new Error('Convite inválido ou já utilizado');
    await prisma.friend.create({
      data: {
        userId: invite.inviterId,
        friendId: invitedId,
      },
    });
    await prisma.friendInvite.update({
      where: { token },
      data: { used: true },
    });
    return true;
  }
}
