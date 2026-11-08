import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router: Router = Router();
const prisma = new PrismaClient();

// Get all menus for a specific caterer
router.get('/caterer/:catererId', async (req: Request, res: Response): Promise<void> => {
  try {
    const menus = await prisma.menu.findMany({
      where: { catererId: req.params.catererId as string },
      include: { items: true }
    });

    const formatted = menus.map((m: any) => {
      const copy = { ...m } as any;
      copy.dietaryOptions = typeof m.dietaryOptions === 'string' ? m.dietaryOptions.split(',').filter(Boolean) : [];
      if (copy.items) {
        copy.items = copy.items.map((item: any) => {
          const itemCopy = { ...item } as any;
          itemCopy.images = typeof item.images === 'string' ? item.images.split(',').filter(Boolean) : [];
          itemCopy.dietaryTags = typeof item.dietaryTags === 'string' ? item.dietaryTags.split(',').filter(Boolean) : [];
          return itemCopy;
        });
      }
      return copy;
    });

    res.json({ success: true, data: formatted });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create a new menu
router.post('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user?.id }, include: { catererProfile: true } });
    if (!user || !user.catererProfile) {
      res.status(403).json({ success: false, error: 'Only caterers can create menus' });
      return;
    }

    const { name, description, cuisineType, dietaryOptions } = req.body;

    const menu = await prisma.menu.create({
      data: {
        catererId: user.catererProfile.id,
        name: String(name || ''),
        description: String(description || ''),
        cuisineType: String(cuisineType || ''),
        dietaryOptions: String(Array.isArray(dietaryOptions) ? dietaryOptions.join(',') : (dietaryOptions || '')),
      },
      include: { items: true }
    });

    res.json({ success: true, data: menu });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add an item to a menu
router.post('/:menuId/items', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, description, price, preparationTime, serves, dietaryTags, imageUrl, images } = req.body;

    const item = await prisma.menuItem.create({
      data: {
        menuId: String(req.params.menuId),
        name: String(name || ''),
        description: String(description || ''),
        price: parseFloat(price) || 0,
        preparationTime: String(preparationTime || ''),
        serves: parseInt(serves) || null,
        dietaryTags: String(Array.isArray(dietaryTags) ? dietaryTags.join(',') : (dietaryTags || '')),
        imageUrl: String(imageUrl || ''),
        images: String(Array.isArray(images) ? images.join(',') : (images || '')),
      }
    });

    res.json({ success: true, data: item });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
