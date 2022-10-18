import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function insert(req, res) {
  const date = req.body.date;
  const time = req.body.time;

  const data = await prisma.$queryRaw`SELECT *
  FROM [sportHallReal].[dbo].[Time2]	
  where date = ${date} and time = ${time}`
  res.status(200).json(data)
}
