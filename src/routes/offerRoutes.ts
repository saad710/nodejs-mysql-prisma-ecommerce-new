import express from 'express';
import {
  createOffer,
  getOffers,
  getOfferById,
  updateOffer,
  deleteOffer,
} from '../controllers/offerController';

const router = express.Router();

// Create a new offer
router.post('/offers', createOffer);

// Get all offers
router.get('/offers', getOffers);

// Get a single offer by ID
router.get('/offers/:id', getOfferById);

// Update an offer
router.put('/offers/:id', updateOffer);

// Delete an offer
router.delete('/offers/:id', deleteOffer);

export default router;
