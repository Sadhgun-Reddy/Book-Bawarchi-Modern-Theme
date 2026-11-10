import express from 'express';
import { registerCaterer, getCaterers, getCatererById, getCatererProfile } from '../controllers/caterersController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/auth/register', registerCaterer);
router.get('/', getCaterers);
router.get('/profile', authenticateToken, getCatererProfile);
router.get('/:id', getCatererById);

export default router;
