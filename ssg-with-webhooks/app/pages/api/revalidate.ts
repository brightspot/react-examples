import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

type Path = {
  path: string
  siteUrls?: string[]
  type: string
  _id: string
  _type: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (process.env.NEXT_PUBLIC_DEBUG) {
    fs.writeFile('debug_req.json', JSON.stringify(req.body, null, 4), (err) => {
      if (err) {
        console.log(err)
      }
    })
  }

  let paths: Path[] = req.body.data.paths || []

  paths = paths.filter((path) =>
    path.siteUrls?.some(
      (siteUrl) => siteUrl === process.env.NEXT_PUBLIC_BSP_SITE_URL
    )
  )
  
  for (const directoryPath of paths) {
    try {
      await res.revalidate(directoryPath.path)
    } catch (err) {
      console.log(err)
    }
  }

  if (paths.length > 0) {
    try {
      await res.revalidate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return res.json({ revalidated: true })
}
