import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../lib/apollo-client'
import { GET_NOTES } from '../../../queries'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Cache-Control', 'no-store')
  try {
    const { data } = await client.query({
      query: GET_NOTES,
      fetchPolicy: 'no-cache',
      variables: {
        arguments: req.query.q || '*',
        offset: req.query.offset,
        predicate: req.query.p ? 'not _id matches ?' : undefined,
      },
    })
    res.status(200).json(data)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}