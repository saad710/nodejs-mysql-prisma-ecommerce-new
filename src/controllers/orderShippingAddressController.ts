import { Request, Response } from 'express';
import prisma from '../prismaClient';

// Link a shipping address to an order
export const linkShippingAddressToOrder = async (order_id: number, shipping_address_id: number) => {
  try {
    // Fetch the shipping address details
    const shippingAddress = await prisma.shippingAddress.findUnique({
      where: { id: shipping_address_id },
    });

    if (!shippingAddress) {
      throw new Error('Shipping address not found');
    }

    // Create the order shipping address with full details
    const orderShippingAddress = await prisma.orderShippingAddress.create({
      data: {
        order_id,
        shipping_address_id,
        full_address: shippingAddress.full_address,
        state: shippingAddress.state,
        city: shippingAddress.city,
        zip_code: shippingAddress.zip_code,
      },
    });

    return orderShippingAddress;
  } catch (error) {
    throw new Error('Failed to link shipping address to order: ');
  }
};

// Get the shipping address for a specific order
export const getOrderShippingAddress = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const orderShippingAddress = await prisma.orderShippingAddress.findFirst({
      where: { order_id: parseInt(orderId) },
      include: {
        shipping_address: true,
      },
    });

    if (!orderShippingAddress) {
      return res.status(404).json({ error: 'Order shipping address not found' });
    }

    res.status(200).json(orderShippingAddress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order shipping address' });
  }
};

