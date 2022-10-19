import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function update(req, res) {
  const date = req.body.date;
  const time = req.body.time;
  const leftStatus = req.body.leftStatus;
  const rightStatus = req.body.rightStatus;

  const data = await prisma.$queryRaw`update Hall 
  set leftStatus = ${leftStatus},
      rightStatus = ${rightStatus}
  where date = ${date} and time = ${time}`

  res.status(200).json(data)
}
