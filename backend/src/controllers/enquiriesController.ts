import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEnquiries = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    let enquiries;

    if (user.role === 'caterer') {
        const caterer = await prisma.caterer.findUnique({ where: { userId: user.id }});
        if (!caterer) {
            res.status(404).json({ success: false, error: 'Caterer profile not found' });
            return;
        }
        enquiries = await prisma.enquiry.findMany({
            where: { catererId: caterer.id },
            include: { user: { select: { name: true, email: true, phone: true } } },
            orderBy: { createdAt: 'desc' }
        });
    } else {
        enquiries = await prisma.enquiry.findMany({
            where: { userId: user.id },
            include: { caterer: { select: { businessName: true, profileImage: true } } },
            orderBy: { createdAt: 'desc' }
        });
    }

    res.json({ success: true, data: enquiries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error fetching enquiries' });
  }
};

export const createEnquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { catererId, eventType, eventDate, guestCount, budget, specialRequirements } = req.body;

    const enquiry = await prisma.enquiry.create({
      data: {
        userId,
        catererId,
        eventType,
        eventDate,
        guestCount: parseInt(guestCount),
        budget: budget ? parseFloat(budget) : null,
        specialRequirements
      }
    });

    res.status(201).json({ success: true, data: enquiry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error creating enquiry' });
  }
};

export const updateEnquiryStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.id;
        const { id } = req.params;
        const { status } = req.body;

        const caterer = await prisma.caterer.findUnique({ where: { userId } });
        if (!caterer) {
            res.status(403).json({ success: false, error: 'Access denied' });
            return;
        }

        const existingEnquiry = await prisma.enquiry.findUnique({ where: { id: id as string } });
        if (!existingEnquiry || existingEnquiry.catererId !== caterer.id) {
            res.status(404).json({ success: false, error: 'Enquiry not found or access denied' });
            return;
        }

        const enquiry = await prisma.enquiry.update({
            where: { id: id as string },
            data: {
                status,
                respondedAt: status === 'responded' ? new Date() : undefined
            }
        });

        res.json({ success: true, data: enquiry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error updating enquiry' });
    }
};
