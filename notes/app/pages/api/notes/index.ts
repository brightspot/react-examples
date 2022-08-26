import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../lib/apollo-client'
import { GET_NOTES } from '../../../queries'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Cache-Control', 'no-store')
  console.log('req.query', req.query)
  try {
    const { data } = await client.query({
      query: GET_NOTES,
      fetchPolicy: 'no-cache',
      variables: {
        arguments: req.query.q || '*',
        offset: req.query.offset,
      },
    })
    res.status(200).json(data)
  } catch (error: any) {
    if (error.message) {
      console.log('there is an error.message ', error.message)
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json(error)
    }
  }
}
