import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function getServerSideProps(req, res) {
  const data = await prisma.$queryRaw`SELECT h.[ID],h.[Time],[A],[B],[Date], t.name FROM [sportHall].[dbo].[Hall] h
  left join sportHall.dbo.Time t on h.Time=t.time`
  res.status(200).json(data)
}
