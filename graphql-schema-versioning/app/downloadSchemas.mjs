import * as dotenv from 'dotenv'
import { exec } from 'child_process'
import axios from 'axios'
import { timeStamp } from './schemas/timestamp.mjs'

dotenv.config()

const MOVIES_URL = process.env.MOVIES_URL
const SCHEMA_URL = process.env.GRAPHQL_SCHEMA_URL

const allMoviesQuery = `
  query Movies {
    AllMovies {
      movies {
        title
      }
    }
  }
`

const graphqlSchemaQuery = `
  query Schemas {
    versions: com_psddev_graphql_GraphQLSchemaVersionQuery(
      where: { predicate: "endpoint/getLabel = ?", arguments: "Schema Versioning Movie Endpoint" }
      sorts: { order: descending, options: "timestamp" }
    ) {
      items {
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

const schemaLoadAndFetch = async (moviesURL, schemaURL) => {
  await axios({
    method: 'post',
    url: moviesURL,
    data: {
      query: allMoviesQuery,
    },
    redirect: 'follow',
  }).then((res) => console.log(res.data.data))
  fetchSchemas(schemaURL)
}

schemaLoadAndFetch(MOVIES_URL, SCHEMA_URL)
