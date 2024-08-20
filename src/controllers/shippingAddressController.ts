import { Request, Response } from 'express';
import prisma from '../prismaClient';

// Create a new shipping address
export const createShippingAddress = async (req: Request, res: Response) => {
  try {
    const { full_address, state, city, zip_code } = req.body;
    const userId = req.user!.userId;

    const newAddress = await prisma.shippingAddress.create({
      data: {
        user_id: userId,
        full_address,
        state,
        city,
        zip_code,
      },
    });

    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create shipping address' });
  }
};

// Get all shipping addresses for the authenticated user
export const getUserShippingAddresses = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const addresses = await prisma.shippingAddress.findMany({
      where: { user_id: userId },
    });

    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch shipping addresses' });
  }
};

// Update a shipping address
export const updateShippingAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { full_address, state, city, zip_code } = req.body;
    const userId = req.user!.userId;

    const updatedAddress = await prisma.shippingAddress.update({
      where: { id: parseInt(id), user_id: userId },
      data: { full_address, state, city, zip_code },
    });

    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update shipping address' });
  }
};

// Delete a shipping address
export const deleteShippingAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    await prisma.shippingAddress.delete({
      where: { id: parseInt(id), user_id: userId },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete shipping address' });
  }
};
