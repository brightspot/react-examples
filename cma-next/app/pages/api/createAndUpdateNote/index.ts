import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../lib/apollo-client'
import { getSession } from 'next-auth/react'
import CREATE_AND_UPDATE_NOTE from '../../../components/CreateNote/CreateAndUpdateNoteQuery'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // This is an example of how to protect api routes
  const session = await getSession({ req: req })

  if (!session) {
    res.status(401).json({ message: 'not authenticated' })
    return
  }

  try {
    let editVariables: any = { toolUser: req.body.toolUser }

    if (req.body.title) {
      editVariables.title = req.body.title
    }
    if (req.body.text) {
      editVariables.text = req.body.text
    }
    if (req.body.id) {
      editVariables.id = req.body.id
    }
    const { data } = await client.mutate({
      mutation: CREATE_AND_UPDATE_NOTE,
      fetchPolicy: 'no-cache',
      variables: editVariables,
    })
    res.status(200).json(data)
  } catch (error: any) {
    console.error(error.message)
    res.status(400).json(error.message)
  }
}
