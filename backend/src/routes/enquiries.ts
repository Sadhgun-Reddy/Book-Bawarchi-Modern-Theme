import express from 'express';
import { getEnquiries, createEnquiry, updateEnquiryStatus } from '../controllers/enquiriesController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, getEnquiries);
router.post('/', authenticateToken, createEnquiry);
router.put('/:id', authenticateToken, updateEnquiryStatus);

export default router;
