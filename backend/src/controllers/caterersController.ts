import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

export const registerCaterer = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name, email, password,
      businessName, description, yearsExperience,
      specialties, certifications, kitchenAddress, serviceAreas, capacity
    } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ success: false, error: 'User already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'caterer', // Force role to caterer
        catererProfile: {
          create: {
            businessName,
            description,
            yearsExperience: parseInt(yearsExperience) || 0,
            specialties: Array.isArray(specialties) ? JSON.stringify(specialties) : (specialties || ''),
            certifications: Array.isArray(certifications) ? JSON.stringify(certifications) : (certifications || ''),
            kitchenAddress,
            serviceAreas: Array.isArray(serviceAreas) ? JSON.stringify(serviceAreas) : (serviceAreas || ''),
            capacity,
          }
        }
      },
      include: {
        catererProfile: true
      }
    });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error during caterer registration' });
  }
};

export const getCaterers = async (req: Request, res: Response): Promise<void> => {
  try {
    const caterers = await prisma.caterer.findMany({
      include: {
        user: {
          select: { name: true, profileImage: true }
        },
        menus: true,
        recipes: true,
      }
    });

    // Parse the JSON string fields back to arrays for the frontend
    const parsedCaterers: any = caterers.map(c => ({
        ...c,
        specialties: JSON.parse(c.specialties || '[]'),
        certifications: JSON.parse(c.certifications || '[]'),
        serviceAreas: JSON.parse(c.serviceAreas || '[]')
    }));

    res.json({ success: true, data: parsedCaterers, count: parsedCaterers.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error fetching caterers' });
  }
};

export const getCatererProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.id;

        const caterer = await prisma.caterer.findUnique({
            where: { userId },
            include: {
                user: { select: { name: true, email: true, phone: true } },
                menus: true,
                recipes: true
            }
        });

        if (!caterer) {
            res.status(404).json({ success: false, error: 'Caterer profile not found' });
            return;
        }

        const parsedCaterer2: any = {
            ...caterer,
            specialties: JSON.parse(caterer.specialties || '[]'),
            certifications: JSON.parse(caterer.certifications || '[]'),
            serviceAreas: JSON.parse(caterer.serviceAreas || '[]')
        };

        res.json({ success: true, data: parsedCaterer2 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error fetching caterer profile' });
    }
};

export const getCatererById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const caterer = await prisma.caterer.findUnique({
            where: { id: id as string },
            include: {
                user: { select: { name: true, email: true, phone: true, profileImage: true } },
                menus: true,
                recipes: true
            }
        });

        if (!caterer) {
            res.status(404).json({ success: false, error: 'Caterer not found' });
            return;
        }

        const parsedCaterer3: any = {
            ...caterer,
            specialties: JSON.parse(caterer.specialties || '[]'),
            certifications: JSON.parse(caterer.certifications || '[]'),
            serviceAreas: JSON.parse(caterer.serviceAreas || '[]')
        };

        res.json({ success: true, data: parsedCaterer3 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error fetching caterer' });
    }
};
