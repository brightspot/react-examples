import { NextApiRequest, NextApiResponse } from 'next'
import QueryHandler from '../../lib/queryHandler'
import getFunFactByIdQuery from '../../components/queries/getFunFactById'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const queryHandler = new QueryHandler(getFunFactByIdQuery)
  await queryHandler.handle(req, res)
}
