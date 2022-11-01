import * as dotenv from 'dotenv'
import { exec } from 'child_process'
import axios from 'axios'
import { timeStamp } from './schemas/timestamp.mjs'

dotenv.config()

const SCHEMA_URL = process.env.GRAPHQL_SCHEMA_URL

const graphqlSchemaQuery = `
    query Schemas {
      versions: com_psddev_graphql_GraphQLSchemaVersionQuery(
        where: { predicate: "endpoint/getLabel = ?", arguments: "Schema Versioning Movie Endpoint" }
        sorts: { order: descending, options: "timestamp" }
      ) {
        items {
          _id
          _type
          endpoint {
            _id
          }
          release
          schemaHash
          timestamp
          schema {
            publicUrl
          }
        }
      }
    }
  `

const downloadSchemas = async (schemasToDownload) => {
  await schemasToDownload.forEach((schema) => {
    exec(`curl ${schema.schema.publicUrl} > ./schemas/${schema.name}.graphql`)
  })
}

const parseSchemaURLS = (schemas) => {
  const schemasCopy = JSON.parse(JSON.stringify(schemas))
  const codegenSchema = schemasCopy.filter(
    (schema) => schema.timestamp <= timeStamp
  )[0]
  codegenSchema.name = 'codegenSchema'

  const mostRecentSchema = schemas[0]
  mostRecentSchema.name = 'newSchema'

  const schemasToDownload = [mostRecentSchema, codegenSchema]
  downloadSchemas(schemasToDownload)
}

const fetchSchemas = async (url) => {
  let schemas
  await axios({
    method: 'post',
    url: url,
    headers: {
      'X-Client-ID': process.env.GRAPHQL_SCHEMA_KEY,
      'X-Client-Secret': process.env.GRAPHQL_SCHEMA_SECRET,
    },
    data: {
      query: graphqlSchemaQuery,
    },
    redirect: 'follow',
  }).then((res) => (schemas = res.data.data.versions.items))

  parseSchemaURLS(schemas)
}

fetchSchemas(SCHEMA_URL)
