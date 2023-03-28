import { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../lib/client'
import GetTextBad from '../../queries/GetTextBad'
import { TextData } from '../../lib/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TextData | any>
) {
  try {
    const text = Array.isArray(req.query.text)
      ? req.query.text[0]
      : req.query.text

    const { data, errors, error } = await client.query({
      query: GetTextBad(text || ''),
    })

    if (data) {
      res.status(200).json(data)
    } else if (errors) {
      res.status(200).json({ errors: errors })
    } else if (error) {
      res.status(200).json({ errors: [error] })
    } else {
      throw new Error('no data, errors, or error returned from query')
    }
  } catch (err: any) {
    res.status(500).json(err)
  }
}
