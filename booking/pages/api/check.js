import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function time(req, res) {
  const date = req.body.date;
  const time = req.body.time;
  const endtime = req.body.endtime;
  const data = await prisma.$queryRaw`select * from Time2 where date = ${date} and time BETWEEN ${time} AND ${endtime - 1}`

  res.status(200).json(data)
}
