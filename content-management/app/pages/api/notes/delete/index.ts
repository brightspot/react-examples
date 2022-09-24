import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../../lib/apollo-client'
import {
  DeleteNoteDocument,
  DeleteNoteMutation,
} from '../../../../generated/graphql'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeleteNoteMutation>
) {
  try {
    const { data } = await client.mutate({
      mutation: DeleteNoteDocument,
      fetchPolicy: 'no-cache',
      variables: {
        id: req.body,
      },
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
