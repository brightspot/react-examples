import * as dotenv from 'dotenv'
import axios from 'axios'
import { diff } from '@graphql-inspector/core'
import { loadSchema } from '@graphql-tools/load'
import { UrlLoader } from '@graphql-tools/url-loader'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

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
      where: { predicate: "endpoint/getLabel = ?", arguments: "Movie Endpoint" }
      sorts: { order: descending, options: "timestamp" }
    ) {
      items {
        schema {
          publicUrl
        }
      }
    }
  }
`

// Receives latest schema to compare against schema saved in ./schemas/originalSchema.graphql
const compareSchemas = async (latestSchema) => {
  const newSchema = await loadSchema(latestSchema.schema.publicUrl, {
    loaders: [new UrlLoader()],
  })
  const originalSchema = await loadSchema('./schemas/originalSchema.graphql', {
    loaders: [new GraphQLFileLoader()],
  })

  const changes = diff(originalSchema, newSchema)

  changes.then((change) => console.log(change))
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
  }).then((res) => compareSchemas(res.data.data.versions.items[0]))
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
