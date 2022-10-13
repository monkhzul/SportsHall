import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function hall(req, res) {
  // const data = await prisma.$queryRaw`SELECT m.leftTime, m.rightTime, m.beginDate,m.endDate,case when m.leftStatus=1 then N'зөвшөөрөгдсөн' when  m.leftStatus=2 then N'хүлээгдэж байгаа' else N'Сул' end as leftstatusname,case when m.rightStatus=1 then N'зөвшөөрөгдсөн' when  m.rightStatus=2 then N'хүлээгдэж байгаа' else N'Сул' end as rightstatusname,t.name FROM [sportHallReal].[dbo].[Main] m left join Time t on m.leftTime = t.time`
  // const data = await prisma.$queryRaw`SELECT m.leftTime, m.rightTime, m.beginDate ,m.endDate,case when m.leftStatus=1 then N'зөвшөөрөгдсөн' when  m.leftStatus=2 then N'хүлээгдэж байгаа' else N'Сул' end as leftstatusname,case when m.rightStatus=1 then N'зөвшөөрөгдсөн' when  m.rightStatus=2 then N'хүлээгдэж байгаа' else N'Сул' end as rightstatusname,t.name FROM [sportHallReal].[dbo].[Main] m right outer join Time t on m.leftTime = t.time`
  // const data = await prisma.$queryRaw`select m.* from Main2 m left join Time t on t.time = m.time`
  const data = await prisma.$queryRaw`select * from Time2`
  res.status(200).json(data)
}
