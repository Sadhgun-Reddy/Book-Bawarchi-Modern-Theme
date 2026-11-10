import express from 'express';
import { getMenus, createMenu, updateMenu, deleteMenu } from '../controllers/menusController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', getMenus);
router.post('/', authenticateToken, createMenu);
router.put('/:id', authenticateToken, updateMenu);
router.delete('/:id', authenticateToken, deleteMenu);

export default router;
