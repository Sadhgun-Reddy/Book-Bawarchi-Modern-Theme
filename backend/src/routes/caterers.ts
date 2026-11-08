import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router: Router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

router.post('/auth/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name, email, password, phone,
      businessName, description, yearsExperience, specialties,
      certifications, kitchenAddress, serviceAreas, capacity
    } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ success: false, error: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: String(name || ''),
        email: String(email || ''),
        password: hashedPassword,
        phone: phone ? String(phone) : null,
        role: 'caterer',
        catererProfile: {
          create: {
            businessName: String(businessName || ''),
            description: String(description || ''),
            yearsExperience: parseInt(yearsExperience) || 0,
            specialties: String(Array.isArray(specialties) ? specialties.join(',') : (specialties || '')),
            certifications: String(Array.isArray(certifications) ? certifications.join(',') : (certifications || '')),
            kitchenAddress: String(kitchenAddress || ''),
            serviceAreas: String(Array.isArray(serviceAreas) ? serviceAreas.join(',') : (serviceAreas || '')),
            capacity: String(capacity || ''),
          }
        }
      },
    });
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ success: true, token });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const caterers = await prisma.caterer.findMany({
      include: { user: { select: { name: true, profileImage: true } } }
    });

    const formatted: any = caterers.map((c: any) => ({
      id: c.id,
      userId: c.userId,
      businessName: c.businessName,
      description: c.description,
      yearsExperience: c.yearsExperience,
      kitchenAddress: c.kitchenAddress,
      capacity: c.capacity,
      approvalStatus: c.approvalStatus,
      profileViews: c.profileViews,
      responseRate: c.responseRate,
      profileImage: c.profileImage,
      adminRemarks: c.adminRemarks,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      user: c.user,
      specialties: typeof c.specialties === 'string' ? c.specialties.split(',').filter(Boolean) : [],
      certifications: typeof c.certifications === 'string' ? c.certifications.split(',').filter(Boolean) : [],
      serviceAreas: typeof c.serviceAreas === 'string' ? c.serviceAreas.split(',').filter(Boolean) : [],
    }));

    res.json({ success: true, data: formatted });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const c: any = await prisma.caterer.findUnique({
      where: { id: String(req.params.id) },
      include: { user: { select: { name: true, profileImage: true } } }
    });
    if (!c) {
      res.status(404).json({ success: false, error: 'Caterer not found' });
      return;
    }
    const formatted: any = {
      id: c.id,
      userId: c.userId,
      businessName: c.businessName,
      description: c.description,
      yearsExperience: c.yearsExperience,
      kitchenAddress: c.kitchenAddress,
      capacity: c.capacity,
      approvalStatus: c.approvalStatus,
      profileViews: c.profileViews,
      responseRate: c.responseRate,
      profileImage: c.profileImage,
      adminRemarks: c.adminRemarks,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      user: c.user,
      specialties: typeof c.specialties === 'string' ? c.specialties.split(',').filter(Boolean) : [],
      certifications: typeof c.certifications === 'string' ? c.certifications.split(',').filter(Boolean) : [],
      serviceAreas: typeof c.serviceAreas === 'string' ? c.serviceAreas.split(',').filter(Boolean) : [],
    };

    res.json({ success: true, data: formatted });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
