// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

// export default async function handler(req, res) {
//   const tradeshopid = req.body.tradeshopid;
//   const mmonth = req.body.mmonth;
//   const discounttype = req.body.discounttype;
//   const Amount = req.body.Amount;
//   const state = req.body.state;
//   const createUser = req.body.createUser;
  
//   const data = await prisma.$queryRaw`INSERT INTO [SMTExchange_Anungoo].[dbo].[t_DiscountTML]
//         ([tradeshopid], [mmonth], [discounttype], [Amount], [state], [createdate], [createUser])
//         VALUES (${tradeshopid}, '${mmonth}', '${discounttype}', ${Amount}, ${state}, getdate(), ${createUser})`

//   res.status(200).json(data)
// }


import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function getServerSideProps(req, res) {
  const data = await prisma.$queryRaw`SELECT * FROM Time`
  res.status(200).json(data)
}
