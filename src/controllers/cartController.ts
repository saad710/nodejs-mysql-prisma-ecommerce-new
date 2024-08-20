import { Request, Response } from 'express';
import prisma from '../prismaClient';

// Add item to cart
export const addItemToCart = async (req: Request, res: Response) => {
  try {
    const { productId, variantId, quantity } = req.body;
    const userId = req.user!.userId;

    // Check if item already exists in cart
    const existingCartItem = await prisma.cart.findFirst({
      where: {
        user_id: userId,
        product_id: productId,
        product_variant_id: variantId,
      },
    });

    if (existingCartItem) {
      // If item exists, update the quantity
      const updatedCartItem = await prisma.cart.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });

      return res.status(200).json(updatedCartItem);
    }

    // If item doesn't exist, create a new cart item
    const newCartItem = await prisma.cart.create({
      data: {
        user_id: userId,
        product_id: productId,
        product_variant_id: variantId,
        quantity,
      },
    });

    res.status(201).json(newCartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user's cart
export const getUserCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const cartItems = await prisma.cart.findMany({
      where: { user_id: userId },
      include: {
        product: true,
        product_variant: true,
      },
    });

    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update cart item quantity
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const { cartItemId, quantity } = req.body;

    const updatedCartItem = await prisma.cart.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    res.status(200).json(updatedCartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Remove item from cart
export const removeItemFromCart = async (req: Request, res: Response) => {
  try {
    const { cartItemId } = req.params;

    await prisma.cart.delete({
      where: { id: parseInt(cartItemId) },
    });

    res.status(204).send(); // No content to send back after deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
