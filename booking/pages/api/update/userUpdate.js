import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function insert(req, res) {
  const id = req.body.id;

  const data = await prisma.$queryRaw`UPDATE [dbo].[UserReq]
  SET [status] = 1
    WHERE id = ${id}`
  res.status(200).json(data)
}
