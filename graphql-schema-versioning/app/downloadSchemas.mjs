import { exec } from 'child_process'
import axios from 'axios'
import { timeStamp } from './schemas/timestamp.mjs'

const SCHEMA_URL = 'http://localhost/graphql/management/schema-versions'

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
    url: SCHEMA_URL,
    headers: {
      'X-Client-ID': '8ead87c8288f3352831f4735453ceaea',
      'X-Client-Secret': '415bcc65-d87a-3c30-89fa-97d469946171',
    },
    data: {
      query: graphqlSchemaQuery,
    },
    redirect: 'follow',
  }).then((res) => (schemas = res.data.data.versions.items))

  parseSchemaURLS(schemas)
}

fetchSchemas(SCHEMA_URL)
