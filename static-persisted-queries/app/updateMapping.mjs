import fs from 'fs'
import * as dotenv from 'dotenv'


dotenv.config()

const { version } = JSON.parse(fs.readFileSync('./package.json'))

const spqMappingFile = fs.readFileSync(
  './persisted-query-ids/server.json',
  'utf8'
)

const headers = new Headers()

headers.append('X-Client-ID', process.env.MAPPING_CLIENT_ID)
headers.append('X-Client-Secret', process.env.MAPPING_CLIENT_SECRET)

const mappingQueryForId = JSON.stringify({
  query: `query GetMappingFileId($arguments: [String], $predicate: String!) {
    brightspot_example_static_persisted_queries_SpqProtocolQuery(
      where: {predicate: $predicate, arguments: $arguments}
    ) {
      items {
        _id
      }
    }
  }
  `,
  variables: { predicate: "version = ?", arguments: version }
})


const mappingMutation = (id) => JSON.stringify({
  query: `mutation postMapping($version: String, $spqMappingFile: String, $id: DiffId) {
        brightspot_example_static_persisted_queries_SpqProtocolSave(
          diffs: {brightspot_example_static_persisted_queries_SpqProtocolDiff: {version: $version, spqMappingFile: $spqMappingFile}}
          id: $id
        ) {
          version
          spqMappingFile
        }
      }`,
  variables: { id: id, version, spqMappingFile },
})

fetch(process.env.MAPPING_URL, {
  method: 'POST',
  headers: headers,
  body: mappingQueryForId
}).then((res) => res.json())
.then((res) =>  {
  const id = res?.data?.brightspot_example_static_persisted_queries_SpqProtocolQuery?.items[0]?._id
  return fetch(process.env.MAPPING_URL, {
    method: 'POST',
    headers: headers,
    body: mappingMutation(id)
  })
}
).then((res) => {
  if(res.ok) {
    return res.json()
  }
}). then((res) => console.log(res))
.catch((err) => console.log(err))
