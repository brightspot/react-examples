import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../../lib/apollo-client'
import {
  CreateAndUpdateNoteDocument,
  CreateAndUpdateNoteMutation,
} from '../../../../generated/graphql'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateAndUpdateNoteMutation>
) {
  try {
    let editVariables: any = { toolUser: req.body.toolUser }

    if (req.body.title) {
      editVariables.title = req.body.title
    }
    if (req.body.description) {
      editVariables.description = req.body.description
    }
    // id generated on creation

    const { data } = await client.mutate({
      mutation: CreateAndUpdateNoteDocument,
      fetchPolicy: 'no-cache',
      variables: editVariables,
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
