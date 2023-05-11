import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  fs.writeFile('debug_req.json', JSON.stringify(req.body, null, 4), (err) => {
    if (err) {
      console.log(err)
    }
  })

  let paths: any[] = req.body.data.paths || []
  let referencePaths: any[] = req.body.data.referencePaths || []

  await res.revalidate('/')

  for (const directoryPath of paths) {
    try {
      await res.revalidate(directoryPath.path)
    } catch (err) {
      console.log(err)
    }
  }

  for (const referencePath of referencePaths) {
    try {
      await res.revalidate(referencePath.path)
    } catch (err) {
      console.log(err)
    }
  }

  return res.json({ revalidated: true })
}
