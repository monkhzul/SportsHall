import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function selectInsert(req, res) {
  const date = req.body.date;
  const time = req.body.time;
  const time2 = req.body.time2;

  const data = await prisma.$queryRaw`select * from Hall where date = ${date} and time between ${time} and ${time2}`

  res.status(200).json(data)
}
