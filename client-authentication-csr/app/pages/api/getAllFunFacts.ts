import { NextApiRequest, NextApiResponse } from 'next'
import QueryHandler from '../../lib/queryHandler'
import getAllFunFactsQuery from '../../components/queries/getAllFunFactsQuery'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const queryHandler = new QueryHandler(getAllFunFactsQuery)
  await queryHandler.handle(req, res)
}
