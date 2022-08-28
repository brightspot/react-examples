import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../../lib/apollo-client'
import { CREATE_AND_UPDATE_NOTE } from '../../../../queries'

type Variables = {
  toolUser: string
  title?: string
  description?: string
  id: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_AND_UPDATE_NOTE,
      fetchPolicy: 'no-cache',
      variables: req.body,
    })
    res.status(200).json(data)
  } catch (error: any) {
    console.log('error ', error.message)
    return res.status(400).json({ error: error.message })
  }
}
