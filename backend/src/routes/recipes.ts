import express from 'express';
import { getRecipes, createRecipe, updateRecipe, deleteRecipe, getRecipesFromMenus } from '../controllers/recipesController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', getRecipes);
router.post('/', authenticateToken, createRecipe);
router.put('/:id', authenticateToken, updateRecipe);
router.delete('/:id', authenticateToken, deleteRecipe);

router.get('/from-menus', getRecipesFromMenus);

export default router;
