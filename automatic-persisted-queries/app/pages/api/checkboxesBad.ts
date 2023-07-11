import { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../lib/client'
import GetCheckboxesBad from '../../queries/GetCheckboxesBad'
import { CheckboxesData } from '../../lib/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckboxesData | any>
) {
  const checkboxes = () => {
    if (Array.isArray(req.query.checkboxes)) {
      return req.query.checkboxes[0]
    } else {
      return req.query.checkboxes
    }
  }

  try {
    const checkboxesArg = checkboxes()
    if (checkboxesArg) {
      const { data, errors, error } = await client.query({
        query: GetCheckboxesBad(checkboxesArg),
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
    } else {
      res.status(200).json({ errors: ['no checkboxes selected'] })
    }
  } catch (err: any) {
    res.status(500).json(err)
  }
}
