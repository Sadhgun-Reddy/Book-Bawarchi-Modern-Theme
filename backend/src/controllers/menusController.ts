import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMenus = async (req: Request, res: Response): Promise<void> => {
  try {
    const menus = await prisma.menu.findMany({
      include: {
        items: true,
        caterer: {
          select: { businessName: true }
        }
      }
    });

    const parsedMenus: any = menus.map(m => ({
        ...m,
        dietaryOptions: JSON.parse(m.dietaryOptions || '[]'),
        items: m.items.map(item => ({
            ...item,
            images: JSON.parse(item.images || '[]'),
            dietaryTags: JSON.parse(item.dietaryTags || '[]')
        }))
    }));

    res.json({ success: true, data: parsedMenus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error fetching menus' });
  }
};

export const createMenu = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { name, description, cuisineType, dietaryOptions, items } = req.body;

    const caterer = await prisma.caterer.findUnique({ where: { userId } });
    if (!caterer) {
        res.status(403).json({ success: false, error: 'Only caterers can create menus' });
        return;
    }

    const menu = await prisma.menu.create({
      data: {
        catererId: caterer.id,
        name,
        description,
        cuisineType,
        dietaryOptions: JSON.stringify(dietaryOptions || []),
        items: {
          create: (items || []).map((item: any) => ({
            name: item.name,
            description: item.description,
            price: parseFloat(item.price),
            imageUrl: item.imageUrl,
            images: JSON.stringify(item.images || []),
            preparationTime: item.preparationTime,
            serves: parseInt(item.serves) || 1,
            dietaryTags: JSON.stringify(item.dietaryTags || []),
          }))
        }
      },
      include: {
        items: true
      }
    });

    res.status(201).json({ success: true, data: menu });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error creating menu' });
  }
};

export const updateMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.id;
        const { id } = req.params;
        const { name, description, cuisineType, dietaryOptions, isActive } = req.body;

        const caterer = await prisma.caterer.findUnique({ where: { userId } });
        if (!caterer) {
            res.status(403).json({ success: false, error: 'Access denied' });
            return;
        }

        const existingMenu = await prisma.menu.findUnique({ where: { id: id as string } });
        if (!existingMenu || existingMenu.catererId !== caterer.id) {
            res.status(404).json({ success: false, error: 'Menu not found or access denied' });
            return;
        }

        const menu = await prisma.menu.update({
            where: { id: id as string },
            data: {
                name,
                description,
                cuisineType,
                isActive,
                ...(dietaryOptions && { dietaryOptions: JSON.stringify(dietaryOptions) })
            }
        });

        res.json({ success: true, data: menu });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error updating menu' });
    }
};

export const deleteMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.id;
        const { id } = req.params;

        const caterer = await prisma.caterer.findUnique({ where: { userId } });
        if (!caterer) {
            res.status(403).json({ success: false, error: 'Access denied' });
            return;
        }

        const existingMenu = await prisma.menu.findUnique({ where: { id: id as string } });
        if (!existingMenu || existingMenu.catererId !== caterer.id) {
            res.status(404).json({ success: false, error: 'Menu not found or access denied' });
            return;
        }

        // Delete menu items first due to foreign key
        await prisma.menuItem.deleteMany({ where: { menuId: id as string }});
        await prisma.menu.delete({ where: { id: id as string } });

        res.json({ success: true, message: 'Menu deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error deleting menu' });
    }
};
