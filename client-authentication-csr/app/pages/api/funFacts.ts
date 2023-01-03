import { gql } from '@apollo/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../lib/client'

export interface Data {
  AllFunFacts?: {
    funFacts?: { text: string }[]
  }
}

const GetAllFunFactsQuery = gql`
  query AllFunFacts {
    AllFunFacts {
      funFacts {
        text
      }
    }
  }
`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | any>
) {
  try {
    const { data, errors } = await client.query({
      query: GetAllFunFactsQuery,
    })

    if (errors) throw new Error

    res.status(200).json(data)
  } catch (error: any) {
    if (error.networkError) {
      res.status(error.networkError.statusCode).json(error.message)
    }

    res.status(500).json(error.message)
  }
}
