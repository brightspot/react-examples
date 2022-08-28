import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../../lib/apollo-client'
import { CREATE_AND_UPDATE_NOTE } from '../../../../queries'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
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
      mutation: CREATE_AND_UPDATE_NOTE,
      fetchPolicy: 'no-cache',
      variables: editVariables,
    })
    res.status(200).json(data)
  } catch (error: any) {
    if (error.message.includes(`Variable 'toolUser' has an invalid value`)) {
      return res
        .status(401)
        .json({ error: 'verify Username exists in Brightspot CMS' })
    } else {
      return res.status(400).json({ error: error.mesage })
    }
  }
}
