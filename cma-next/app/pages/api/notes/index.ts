import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../lib/apollo-client'
import GET_NOTES from '../../../components/Navbar/GetNotesQuery'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Cache-Control', 'no-store')
  try {
    let query
    if (Object.keys(req.body).length === 0) {
      query = '*'
    } else {
      query = req.body
    }
    const { data } = await client.query({
      query: GET_NOTES,
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
