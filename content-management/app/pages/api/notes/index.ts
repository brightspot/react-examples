import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../lib/apollo-client'
import { GetNotesQuery, GetNotesDocument } from '../../../generated/graphql'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetNotesQuery>
) {
  res.setHeader('Cache-Control', 'no-store')
  try {
    const { data } = await client.query({
      query: GetNotesDocument,
      fetchPolicy: 'no-cache',
      variables: {
        arguments: req.query.q || '*',
        offset: req.query.offset,
        predicate: req.query.p ? 'not _id matches ?' : undefined,
      },
    })
    res.status(200).json(data)
  } catch (error: any) {
    if (error.networkError) {
      res.status(error.networkError.statusCode).json(error.message)
    } else {
      res.status(500).json(error.message)
    }
  }
}
