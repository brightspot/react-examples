import { exec } from 'child_process'
import axios from 'axios'

const SCHEMA_URL = 'http://localhost/graphql/management/schema-versions'

const graphqlSchemaQuery = `
    query Schemas {
      versions: com_psddev_graphql_GraphQLSchemaVersionQuery(
        where: { predicate: "endpoint/getLabel = ?", arguments: "Schema Versioning Movie Endpoint" }
        sorts: { order: descending, options: "timestamp" }
        limit: 2
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

const downloadSchemas = async (schemaUrls) => {
  await schemaUrls.forEach((schema) => {
    exec(
      `curl ${schema} -o  ./schemas/${schema.match(/movie-endpoint(.*)/g)[0]}`
    )
  })
}

const parseSchemaURLS = (schemas) => {
  const schemaUrls = schemas.map((schema) => schema.schema.publicUrl)
  downloadSchemas(schemaUrls)
}

const fetchSchemas = async (url) => {
  let schemas
  await axios({
    method: 'post',
    url: SCHEMA_URL,
    headers: {
      'X-Client-ID': '49b4fa3b444e34498db8d9199d7861f7',
      'X-Client-Secret': '1b1b957c-04cc-362c-810f-695862b9e96a',
    },
    data: {
      query: graphqlSchemaQuery,
    },
    redirect: 'follow',
  }).then((res) => (schemas = res.data.data.versions.items))

  parseSchemaURLS(schemas)
}

fetchSchemas(SCHEMA_URL)
