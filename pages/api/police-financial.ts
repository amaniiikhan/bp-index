import prisma from 'lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const feed = await prisma.police_financial.findMany()
  res.status(200).json(feed)
}