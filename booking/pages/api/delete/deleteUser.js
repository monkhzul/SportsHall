import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function Delete(req, res) {
  const id = req.body.id;

  const data = await prisma.$queryRaw`delete UserReq where id = ${id}`
  res.status(200).json(data)
}
