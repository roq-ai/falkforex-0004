import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { forexTraderValidationSchema } from 'validationSchema/forex-traders';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.forex_trader
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getForexTraderById();
    case 'PUT':
      return updateForexTraderById();
    case 'DELETE':
      return deleteForexTraderById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getForexTraderById() {
    const data = await prisma.forex_trader.findFirst(convertQueryToPrismaUtil(req.query, 'forex_trader'));
    return res.status(200).json(data);
  }

  async function updateForexTraderById() {
    await forexTraderValidationSchema.validate(req.body);
    const data = await prisma.forex_trader.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteForexTraderById() {
    const data = await prisma.forex_trader.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
