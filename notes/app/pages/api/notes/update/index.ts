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
    let editVariables: Variables = {
      toolUser: req.body.toolUser,
      id: req.body.id,
    }

    if (!editVariables.toolUser) {
      res.status(401).json('userName required')
    }
    if (!editVariables.id) {
      res.status(400).json('id not included with network request 🤔')
    }
    if (req.body.title) {
      editVariables.title = req.body.title
    }
    if (req.body.description) {
      editVariables.description = req.body.description
    }

    const { data } = await client.mutate({
      mutation: CREATE_AND_UPDATE_NOTE,
      fetchPolicy: 'no-cache',
      variables: editVariables,
    })
    res.status(200).json(data)
  } catch (error: any) {
    res.status(400).json({ error: error.mesage })
  }
}
