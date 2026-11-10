import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getRecipes = async (req: Request, res: Response): Promise<void> => {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        caterer: {
          select: { businessName: true, profileImage: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const parsedRecipes: any = recipes.map(r => ({
        ...r,
        images: JSON.parse(r.images || '[]'),
        tags: JSON.parse(r.tags || '[]')
    }));

    res.json({ success: true, data: parsedRecipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error fetching recipes' });
  }
};

export const createRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { title, content, images, tags } = req.body;

    const caterer = await prisma.caterer.findUnique({ where: { userId } });
    if (!caterer) {
        res.status(403).json({ success: false, error: 'Only caterers can create recipes' });
        return;
    }

    const recipe = await prisma.recipe.create({
      data: {
        catererId: caterer.id,
        title,
        content,
        images: JSON.stringify(images || []),
        tags: JSON.stringify(tags || [])
      }
    });

    res.status(201).json({ success: true, data: recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error creating recipe' });
  }
};

export const updateRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.id;
        const { id } = req.params;
        const { title, content, images, tags } = req.body;

        const caterer = await prisma.caterer.findUnique({ where: { userId } });
        if (!caterer) {
            res.status(403).json({ success: false, error: 'Access denied' });
            return;
        }

        const existingRecipe = await prisma.recipe.findUnique({ where: { id: id as string } });
        if (!existingRecipe || existingRecipe.catererId !== caterer.id) {
            res.status(404).json({ success: false, error: 'Recipe not found or access denied' });
            return;
        }

        const recipe = await prisma.recipe.update({
            where: { id: id as string },
            data: {
                title,
                content,
                ...(images && { images: JSON.stringify(images) }),
                ...(tags && { tags: JSON.stringify(tags) })
            }
        });

        res.json({ success: true, data: recipe });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error updating recipe' });
    }
};

export const deleteRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.id;
        const { id } = req.params;

        const caterer = await prisma.caterer.findUnique({ where: { userId } });
        if (!caterer) {
            res.status(403).json({ success: false, error: 'Access denied' });
            return;
        }

        const existingRecipe = await prisma.recipe.findUnique({ where: { id: id as string } });
        if (!existingRecipe || existingRecipe.catererId !== caterer.id) {
            res.status(404).json({ success: false, error: 'Recipe not found or access denied' });
            return;
        }

        await prisma.recipe.delete({ where: { id: id as string } });

        res.json({ success: true, message: 'Recipe deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error deleting recipe' });
    }
};

export const getRecipesFromMenus = async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch all menu items across all active menus to display as "recipes/dishes"
        const items = await prisma.menuItem.findMany({
            include: {
                menu: {
                    include: {
                        caterer: {
                            select: { businessName: true, profileImage: true, id: true }
                        }
                    }
                }
            },
            take: 20 // Limit to avoid massive payload
        });

        const formatted = items.map(item => ({
            id: item.id,
            title: item.name,
            content: item.description || '',
            images: JSON.parse(item.images || '[]'),
            catererId: item.menu.catererId,
            tags: JSON.parse(item.dietaryTags || '[]'),
            views: 0,
            createdAt: item.menu.createdAt,
            caterer: item.menu.caterer,
            imageUrl: item.imageUrl
        }));

        res.json({ success: true, data: formatted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error fetching recipes from menus' });
    }
}
