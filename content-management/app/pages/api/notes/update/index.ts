import type { NextApiRequest, NextApiResponse } from 'next'
import client from 'helpers/apollo-client'
import {
  CreateAndUpdateNoteDocument,
  CreateAndUpdateNoteMutation,
  CreateAndUpdateNoteMutationVariables,
} from 'generated/graphql'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateAndUpdateNoteMutation>
) {
  try {
    const updateVariables: CreateAndUpdateNoteMutationVariables = req.body
    const { data } = await client.mutate({
      mutation: CreateAndUpdateNoteDocument,
      fetchPolicy: 'no-cache',
      variables: updateVariables,
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
