import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router: Router = Router();
const prisma = new PrismaClient();

// Get all donations
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const donations = await prisma.donation.findMany({
      include: { donor: { select: { name: true, profileImage: true } } }
    });

    res.json({ success: true, data: donations });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create a new donation
router.post('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { foodType, quantity, pickupLocation, availabilityFrom, availabilityTo, specialInstructions } = req.body;

    const donation = await prisma.donation.create({
      data: {
        donorId: req.user!.id,
        foodType: String(foodType || ''),
        quantity: String(quantity || ''),
        pickupLocation: String(pickupLocation || ''),
        availabilityFrom: String(availabilityFrom || ''),
        availabilityTo: String(availabilityTo || ''),
        specialInstructions: specialInstructions ? String(specialInstructions) : null,
      }
    });

    res.json({ success: true, data: donation });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update donation status
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const donation = await prisma.donation.update({
      where: { id: String(req.params.id) },
      data: { status: String(status || 'available') }
    });

    res.json({ success: true, data: donation });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get a specific donation
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
      const donation = await prisma.donation.findUnique({
        where: { id: String(req.params.id) },
        include: { donor: { select: { name: true, profileImage: true } } }
      });

      res.json({ success: true, data: donation });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

export default router;
