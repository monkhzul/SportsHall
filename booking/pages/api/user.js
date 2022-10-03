import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function getServerSideProps(req, res) {
  const data = await prisma.$queryRaw`select * from Users`
  res.status(200).json(data)
}
