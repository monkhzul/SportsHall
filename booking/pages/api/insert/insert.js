import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function insert(req, res) {
  const time = req.body.time;
  const leftStatus = req.body.leftStatus;
  const rightStatus = req.body.rightStatus;
  const date = req.body.date;
  const data = await prisma.$queryRaw`INSERT INTO [dbo].[Time2] ([time] ,[leftStatus],[rightStatus],[date]) 
  VALUES (${time}, ${leftStatus}, ${rightStatus}, ${date})`
  res.status(200).json(data)
}
