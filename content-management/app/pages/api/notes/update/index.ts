import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../../lib/apollo-client'
import {
  CreateAndUpdateNoteDocument,
  CreateAndUpdateNoteMutation,
} from '../../../../generated/graphql'

type Variables = {
  toolUser: string
  title?: string
  description?: string
  id: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateAndUpdateNoteMutation>
) {
  try {
    const { data } = await client.mutate({
      mutation: CreateAndUpdateNoteDocument,
      fetchPolicy: 'no-cache',
      variables: req.body,
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
