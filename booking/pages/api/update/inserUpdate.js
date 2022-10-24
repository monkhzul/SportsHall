import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function inserUpdate(req, res) {
  const id = req.body.id;

  const data = await prisma.$queryRaw`UPDATE [dbo].[Hall]
  SET [rightStatus] = 2
  WHERE id = ${id}`
  res.status(200).json(data)
}
