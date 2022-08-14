import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../lib/apollo-client'
import { getSession } from 'next-auth/react'
import HELLO_WORLD_DELETE from '../../../components/NoteCard/DeleteNote'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // This is an example of how to protect api routes (by user role, etc)
  const session = await getSession({ req: req })

  if (!session) {
    res.status(401).json({ message: 'not authenticated' })
    return
  }

  try {
    const { data } = await client.mutate({
      mutation: HELLO_WORLD_DELETE,
      fetchPolicy: 'no-cache',
      variables: {
        id: req.body.id,
      },
    })
    res.status(200).json(data)
  } catch (error: any) {
    res.status(400).json(error)
  }
}
