import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router: Router = Router();
const prisma = new PrismaClient();

// Get all user's enquiries
router.get('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const enquiries = await prisma.enquiry.findMany({
      where: { userId: req.user?.id },
      include: {
        caterer: { include: { user: { select: { name: true, profileImage: true } } } }
      }
    });

    res.json({ success: true, data: enquiries });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get caterer's enquiries
router.get('/caterer', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user?.id }, include: { catererProfile: true } });
    if (!user || !user.catererProfile) {
      res.status(403).json({ success: false, error: 'Only caterers can view these enquiries' });
      return;
    }

    const enquiries = await prisma.enquiry.findMany({
      where: { catererId: user.catererProfile.id },
      include: { user: { select: { name: true, profileImage: true, email: true, phone: true } } }
    });

    res.json({ success: true, data: enquiries });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create an enquiry
router.post('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { catererId, eventType, eventDate, guestCount, budget, specialRequirements } = req.body;

    const enquiry = await prisma.enquiry.create({
      data: {
        userId: req.user!.id,
        catererId: catererId || null,
        eventType: String(eventType || ''),
        eventDate: String(eventDate || ''),
        guestCount: parseInt(guestCount) || 0,
        budget: budget ? parseFloat(budget) : null,
        specialRequirements: specialRequirements ? String(specialRequirements) : null,
      }
    });

    res.json({ success: true, data: enquiry });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single enquiry by ID
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const enquiry = await prisma.enquiry.findUnique({
        where: { id: String(req.params.id) },
        include: {
            caterer: { include: { user: { select: { name: true, profileImage: true } } } },
            user: { select: { name: true, profileImage: true, email: true, phone: true } }
        }
      });

      res.json({ success: true, data: enquiry });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

export default router;
