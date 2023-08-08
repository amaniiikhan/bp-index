import prisma from 'lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const feed = await prisma.arrest_info.findMany()
  res.status(200).json(feed)
}