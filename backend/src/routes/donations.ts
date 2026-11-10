import express from 'express';
import { getDonations, createDonation, updateDonation } from '../controllers/donationsController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', getDonations);
router.post('/', authenticateToken, createDonation);
router.put('/:id', authenticateToken, updateDonation);

export default router;
