import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function insert(req, res) {
  const time = req.body.time;
  const type = req.body.type;
  const date = req.body.date;
  const userid = req.body.userid;
  const username = req.body.username;
  const status = req.body.status;
  const sysDate = req.body.sysDate;

  const data = await prisma.$queryRaw`INSERT INTO [dbo].[UserReq]
  ([time],[type],[date],[userId],[userName],[status],[sysDate])
  VALUES (${time}, ${type}, ${date}, ${userid}, ${username}, ${status}, ${sysDate})`
  res.status(200).json(data)
}
