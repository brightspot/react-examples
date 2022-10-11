import fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config()

const spqMappingFile = fs.readFileSync(
  './persisted-query-ids/server.json',
  'utf8'
)

const headers = new Headers()

headers.append('X-Client-ID', process.env.MAPPING_CLIENT_ID)
headers.append('X-Client-Secret', process.env.MAPPING_CLIENT_SECRET)

let version = new Date().toISOString()

const graphqlMappingMutation = JSON.stringify({
  query: `mutation postMapping($version: String, $spqMappingFile: String) {
        brightspot_example_static_persisted_queries_SpqProtocolSave(
          diffs: {brightspot_example_static_persisted_queries_SpqProtocolDiff: {version: $version, spqMappingFile: $spqMappingFile}}
        ) {
          version
          spqMappingFile
        }
      }`,
  variables: { version, spqMappingFile },
})

const requestOptions = {
  method: 'POST',
  headers: headers,
  body: graphqlMappingMutation,
}

await fetch(process.env.MAPPING_URL, requestOptions)
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
