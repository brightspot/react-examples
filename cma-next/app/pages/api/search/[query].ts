import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../lib/apollo-client'
import SEARCH from '../../../components/Navbar/Search'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { query } = req.query
    const { data } = await client.query({
      query: SEARCH,
      fetchPolicy: 'no-cache',
      variables: {
        arguments: query,
      },
    })
    res.status(200).json(data)
  } catch (error: any) {
    res.status(400).json(error.message)
  }
}
