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

/**
 * Query used to retrieve schema versions for 'Schema Versioning Movie Endpoint'
 * in descending order with the latest schema first.
 **/
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

// Receives schema objects array to open each url and save the file
const downloadSchemas = async (schemasToDownload) => {
  await schemasToDownload.forEach((schema) => {
    exec(`curl ${schema.schema.publicUrl} > ./schemas/${schema.name}.graphql`)
  })
}

/**
 * Receives all schemas and finds the two required.
 * The latest schema and the latest available when codegen was executed (these can be the same)
 **/
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
  }).then((res) => parseSchemaURLS(res.data.data.versions.items))
}

const schemaLoadAndFetch = async (moviesURL, schemaURL) => {
  await axios({
    method: 'post',
    url: moviesURL,
    data: {
      query: allMoviesQuery,
    },
    redirect: 'follow',
  })
  fetchSchemas(schemaURL)
}

schemaLoadAndFetch(MOVIES_URL, SCHEMA_URL)
