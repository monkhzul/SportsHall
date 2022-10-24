import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function deleteUpdate(req, res) {
  const id = req.body.id;

  const data = await prisma.$queryRaw`UPDATE Hall SET rightStatus = 0 WHERE id = ${id}`
  res.status(200).json(data)
}
