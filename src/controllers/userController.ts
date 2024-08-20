import { Request, Response } from 'express';
import prisma from '../prismaClient';

// Get User Details
export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId; // Get user ID from decoded token
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
