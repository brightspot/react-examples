import type { NextApiRequest, NextApiResponse } from 'next'
import client from 'helpers/apollo-client'
import {
  GetNotesQuery,
  GetNotesDocument,
  GetNotesQueryVariables,
} from 'generated/graphql'

/* Key Points 🔑: 
1. arguments: default to all notes ('*') unless using search 
2. offset: 0 to show the first batch of notes, and increases by limit value for (ex: if limit is 2, offset is: 0, 2, 4...)
3. predicate: default to all in /query/GetNotes.graphql unless a Note _id is specified, then the query returns every Note except Note with specified _id (used for NoteCard when Note is deleted)
*/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetNotesQuery>
) {
  res.setHeader('Cache-Control', 'no-store')
  try {
    const getNotesVariables: GetNotesQueryVariables = {
      arguments: req.query.q || '*',
      offset: req.query.offset,
      predicate: req.query.p ? 'not _id matches ?' : undefined,
    }
    const { data } = await client.query({
      query: GetNotesDocument,
      fetchPolicy: 'no-cache',
      variables: getNotesVariables,
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
