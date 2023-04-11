import { DocumentNode } from 'graphql'
import { client } from './client'
import { NextApiRequest, NextApiResponse } from 'next'

export default class QueryHandler {
  query: DocumentNode

  constructor(query: DocumentNode) {
    this.query = query
  }

  async handle(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const { data, errors } = await client.query({
        query: this.query,
        variables: req.query,
      })

      if (errors) throw new Error()

      res.status(200).json(data)
    } catch (error: any) {
      if (error.networkError) {
        res.status(error.networkError.statusCode).json(error.message)
      }

      res.status(500).json(error.message)
    }
  }
}
