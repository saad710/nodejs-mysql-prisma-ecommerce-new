import { Request, Response } from 'express';
import prisma from '../prismaClient';

// Create a new offer
export const createOffer = async (req: Request, res: Response) => {
  try {
    const { coupon_code, discount_type, discount_value, start_date, end_date, description, status } = req.body;

    const newOffer = await prisma.offer.create({
      data: {
        coupon_code,
        discount_type,
        discount_value,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        description,
        status,
      },
    });

    res.status(201).json(newOffer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create offer' });
  }
};

// Get all offers
export const getOffers = async (req: Request, res: Response) => {
  try {
    const offers = await prisma.offer.findMany();

    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch offers' });
  }
};

// Get a single offer by ID
export const getOfferById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const offer = await prisma.offer.findUnique({
      where: { id: parseInt(id) },
    });

    if (!offer) {
      return res.status(404).json({ error: 'Offer not found' });
    }

    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch offer' });
  }
};

// Update an offer
export const updateOffer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { coupon_code, discount_type, discount_value, start_date, end_date, description, status } = req.body;

    const updatedOffer = await prisma.offer.update({
      where: { id: parseInt(id) },
      data: {
        coupon_code,
        discount_type,
        discount_value,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        description,
        status,
      },
    });

    res.status(200).json(updatedOffer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update offer' });
  }
};

// Delete an offer
export const deleteOffer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.offer.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete offer' });
  }
};
