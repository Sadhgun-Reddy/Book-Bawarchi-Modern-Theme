import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router: Router = Router();
const prisma = new PrismaClient();

// Get all recipes
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const recipes = await prisma.recipe.findMany({
      include: { caterer: { include: { user: { select: { name: true, profileImage: true } } } } }
    });

    const formatted = recipes.map((r: any) => {
      const copy = { ...r } as any;
      copy.images = typeof r.images === 'string' ? r.images.split(',').filter(Boolean) : [];
      copy.tags = typeof r.tags === 'string' ? r.tags.split(',').filter(Boolean) : [];
      return copy;
    });

    res.json({ success: true, data: formatted });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get a single recipe
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const r: any = await prisma.recipe.findUnique({
      where: { id: String(req.params.id) },
      include: { caterer: { include: { user: { select: { name: true, profileImage: true } } } } }
    });

    if (!r) {
      res.status(404).json({ success: false, error: 'Recipe not found' });
      return;
    }

    const formatted = { ...r } as any;
    formatted.images = typeof r.images === 'string' ? r.images.split(',').filter(Boolean) : [];
    formatted.tags = typeof r.tags === 'string' ? r.tags.split(',').filter(Boolean) : [];

    res.json({ success: true, data: formatted });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create a new recipe
router.post('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user?.id }, include: { catererProfile: true } });
    if (!user || !user.catererProfile) {
      res.status(403).json({ success: false, error: 'Only caterers can create recipes' });
      return;
    }

    const { title, content, tags, images } = req.body;

    const recipe = await prisma.recipe.create({
      data: {
        catererId: user.catererProfile.id,
        title: String(title || ''),
        content: String(content || ''),
        tags: String(Array.isArray(tags) ? tags.join(',') : (tags || '')),
        images: String(Array.isArray(images) ? images.join(',') : (images || '')),
      }
    });

    res.json({ success: true, data: recipe });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
