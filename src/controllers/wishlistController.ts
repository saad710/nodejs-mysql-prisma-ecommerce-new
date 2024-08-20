import { Request, Response } from 'express';
import prisma from '../prismaClient';

// Add item to wishlist
export const addItemToWishlist = async (req: Request, res: Response) => {
  try {
    const { productId, variantId } = req.body;
    const userId = req.user!.userId;

    // Check if item already exists in wishlist
    const existingWishlistItem = await prisma.wishlist.findFirst({
      where: {
        user_id: userId,
        product_id: productId,
        product_variant_id: variantId,
      },
    });

    if (existingWishlistItem) {
      return res.status(400).json({ error: 'Item already in wishlist' });
    }

    // If item doesn't exist, add it to the wishlist
    const newWishlistItem = await prisma.wishlist.create({
      data: {
        user_id: userId,
        product_id: productId,
        product_variant_id: variantId,
      },
    });

    res.status(201).json(newWishlistItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user's wishlist
export const getUserWishlist = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const wishlistItems = await prisma.wishlist.findMany({
      where: { user_id: userId },
      include: {
        product: true,
        product_variant: true,
      },
    });

    res.status(200).json(wishlistItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Remove item from wishlist
export const removeItemFromWishlist = async (req: Request, res: Response) => {
  try {
    const { wishlistItemId } = req.params;

    await prisma.wishlist.delete({
      where: { id: parseInt(wishlistItemId) },
    });

    res.status(204).send(); // No content to send back after deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
