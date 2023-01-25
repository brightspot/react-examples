import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

// const convertRelativePathsToFullPaths = async (paths: string[]) => {

//   let directoryIds: string[] = []
//   let resources: string[] = []

//   paths.forEach((path) => {
//     let parts = path.split('/')
//     directoryIds.push(parts[0])
//     resources.push(parts[1])
//   })

//   let fullPaths: string[] = []
//   let directories = await convertDirectoryIdsToPaths(directoryIds)

//   resources.forEach((resource, index) => {
//     fullPaths.push(directories[index] + resource)
//   })
  
//   return fullPaths
// }

// const convertDirectoryIdsToPaths = async (directories: string[]) => {
//   const paths: string[] = []

//   for (let directory of directories) {
//     await fetch(`${process.env.REST_MANAGEMENT_ENDPOINT}/contents/${directory}`, {
//       method: 'GET',
//       headers: {
//         'X-Client-Id': `${process.env.CLIENT_ID}`,
//         'X-Client-Secret': `${process.env.CLIENT_SECRET}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((response) => paths.push(response.result.path))
//   }

//   return paths
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {

//   fs.writeFile('req.json', JSON.stringify(req.body, null, 4), (err) => {
//     if (err) {
//       console.log(err)
//     }
//   })

//   let relativePaths: string[] = req.body.data.values['cms.directory.paths']

//   let fullPaths = await convertRelativePathsToFullPaths(relativePaths)

//   console.log(fullPaths)
//   for (const path of fullPaths) {
//     try {
//       await res.revalidate('/')
//       await res.revalidate(path)
//       console.log('revalidated')
//       return res.json({ revalidated: true })
//     } catch (err) {
//       console.log(err)
//       return res.status(500).send('Error revalidating')
//     }
//   }

//   console.log('didnt actually revalidate')
//   return res.json({ revalidated: true })
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  fs.writeFile('req.json', JSON.stringify(req.body, null, 4), (err) => {
    if (err) {
      console.log(err)
    }
  })

  let paths: string[] = req.body.data.paths || []

  for (const path of paths) {
    try {
      await res.revalidate('/')
      await res.revalidate(path)
    } catch (err) {
      return res.status(500).send('Error revalidating')
    }
  }

  return res.json({ revalidated: true })
}
