import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../../lib/apollo-client'
import { DELETE_NOTE } from '../../../../queries'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = await client.mutate({
      mutation: DELETE_NOTE,
      fetchPolicy: 'no-cache',
      variables: {
        id: req.body,
      },
    })
    res.status(200).json(data)
  } catch (error: any) {
    res.status(400).json(error)
  }
}
