import type { NextApiRequest, NextApiResponse } from 'next'
import client from 'helpers/apollo-client'
import {
  DeleteNoteDocument,
  DeleteNoteMutation,
  DeleteNoteMutationVariables,
} from 'generated/graphql'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeleteNoteMutation>
) {
  try {
    const deleteVariables: DeleteNoteMutationVariables = { id: req.body }
    console.log({ deleteVariables }) // added to clearly display variables used in query
    const { data } = await client.mutate({
      mutation: DeleteNoteDocument,
      fetchPolicy: 'no-cache',
      variables: deleteVariables,
    })
    res.status(200).json(data)
  } catch (error: any) {
    if (error.networkError) {
      res.status(error.networkError.statusCode).json(error.message)
    } else {
      res.status(400).json(error.message)
    }
  }
}
