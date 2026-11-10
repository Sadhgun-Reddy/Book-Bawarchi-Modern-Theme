import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDonations = async (req: Request, res: Response): Promise<void> => {
  try {
    const donations = await prisma.donation.findMany({
      include: {
        donor: {
          select: { name: true, email: true, phone: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, data: donations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error fetching donations' });
  }
};

export const createDonation = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { foodType, quantity, pickupLocation, availabilityFrom, availabilityTo, specialInstructions } = req.body;

    const donation = await prisma.donation.create({
      data: {
        donorId: userId,
        foodType,
        quantity,
        pickupLocation,
        availabilityFrom,
        availabilityTo,
        specialInstructions
      }
    });

    res.status(201).json({ success: true, data: donation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error creating donation' });
  }
};

export const updateDonation = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.id;
        const { id } = req.params;
        const { status } = req.body;

        const existingDonation = await prisma.donation.findUnique({ where: { id: id as string } });
        if (!existingDonation) {
            res.status(404).json({ success: false, error: 'Donation not found' });
            return;
        }

        // Only donor or admin can update, simple check:
        if (existingDonation.donorId !== userId) {
            res.status(403).json({ success: false, error: 'Access denied' });
            return;
        }

        const donation = await prisma.donation.update({
            where: { id: id as string },
            data: { status }
        });

        res.json({ success: true, data: donation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error updating donation' });
    }
};
