import { Request, Response } from 'express';
import prisma from '../prismaClient';

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, items, shippingAddressId, paymentType } = req.body;

    // Calculate totals (this is a simplified version; you might need to adjust this based on your needs)
    const totalAmount = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
    const discountAmount = 0; // Apply discount logic if needed
    const shippingAmount = 50; // Flat shipping rate for example
    const grossAmount = totalAmount + shippingAmount;
    const netAmount = grossAmount - discountAmount;

    // Create the order
    const order = await prisma.order.create({
      data: {
        user_id: userId,
        total_amount: totalAmount,
        discount_amount: discountAmount,
        gross_amount: grossAmount,
        shipping_amount: shippingAmount,
        net_amount: netAmount,
        payment_status: 'not_paid',
        payment_type: paymentType,
        status: 'placed',
        order_items: {
          create: items.map((item: any) => ({
            product_id: item.productId,
            product_variant_id: item.variantId,
            product_name: item.productName,
            price: item.price,
            quantity: item.quantity,
            total_amount: item.price * item.quantity,
          })),
        },
        order_shipping_addresses: {
          create: {
            shipping_address_id: shippingAddressId,
          },
        },
      },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all orders for a user
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId; // Assuming the user ID is stored in the token

    const orders = await prisma.order.findMany({
      where: { user_id: userId },
      include: {
        order_items: true,
        order_shipping_addresses: {
          include: {
            shipping_address: true,
          },
        },
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get order details by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        order_items: true,
        order_shipping_addresses: {
          include: {
            shipping_address: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
