import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'READ') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const savedContact = await prisma.post.findMany();
    res.status(200).json(savedContact);
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};