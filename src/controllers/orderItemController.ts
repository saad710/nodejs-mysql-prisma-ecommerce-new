import { Request, Response } from 'express';
import prisma from '../prismaClient';

// Add an item to an order
export const addOrderItem = async (req: Request, res: Response) => {
  try {
    const { orderId, productId, productVariantId, quantity } = req.body;

    // Fetch the product to get price and other details
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Fetch the product variant if applicable
    let productVariant = null;
    if (productVariantId) {
      productVariant = await prisma.productVariant.findUnique({
        where: { id: productVariantId },
      });

      if (!productVariant) {
        return res.status(404).json({ error: 'Product variant not found' });
      }
    }

    const price = productVariant ? productVariant.price : product.price;
    const totalAmount = price * quantity;

    const orderItem = await prisma.orderItem.create({
      data: {
        order_id: orderId,
        product_id: productId,
        product_variant_id: productVariantId,
        product_name: product.product_name,
        color: productVariant?.color || null,
        size: productVariant?.size || null,
        price,
        quantity,
        total_amount: totalAmount,
      },
    });

    res.status(201).json(orderItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an order item
export const updateOrderItem = async (req: Request, res: Response) => {
  try {
    const { orderItemId } = req.params;
    const { quantity } = req.body;

    const orderItem = await prisma.orderItem.findUnique({
      where: { id: parseInt(orderItemId) },
    });

    if (!orderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }

    const updatedTotalAmount = orderItem.price * quantity;

    const updatedOrderItem = await prisma.orderItem.update({
      where: { id: parseInt(orderItemId) },
      data: {
        quantity,
        total_amount: updatedTotalAmount,
      },
    });

    res.status(200).json(updatedOrderItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Remove an order item
export const removeOrderItem = async (req: Request, res: Response) => {
  try {
    const { orderItemId } = req.params;

    await prisma.orderItem.delete({
      where: { id: parseInt(orderItemId) },
    });

    res.status(204).send(); // No content to send back after deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
