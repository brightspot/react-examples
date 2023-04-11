import { NextApiRequest, NextApiResponse } from 'next'
import QueryHandler from '../../lib/queryHandler'
import getFunFactByPathQuery from '../../components/queries/getFunFactByPathQuery'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const queryHandler = new QueryHandler(getFunFactByPathQuery)
  await queryHandler.handle(req, res)
}
