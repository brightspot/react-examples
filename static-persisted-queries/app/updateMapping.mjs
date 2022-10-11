import spqMappingFile from './persisted-query-ids/server.json' assert { type: 'json' }

const headers = new Headers()

headers.append('X-Client-ID', '00000183c460d406a797c7f697a50000')
headers.append('X-Client-Secret', 'onPW16FyC1WKer0gTulkWrP4vpRaKiuD6Z14LyJ')

let name = 'v1'

// TODO: finish this logic that posts the newly generated version of whitelist mapping to the CMA Mapping Endpoint.
const graphqlMappingMutation = JSON.stringify({
  query: `mutation postMapping($name: String, $spqMappingFile: String) {
        brightspot_example_static_persisted_queries_SpqProtocolSave(
          diffs: {brightspot_example_static_persisted_queries_SpqProtocolDiff: {name: $name, spqMappingFile: $spqMappingFile}}
        ) {
          name
          spqMappingFile
        }
      }`,
  variables: { name, spqMappingFile },
})

console.log(graphqlMappingMutation)
const requestOptions = {
  method: 'POST',
  headers: headers,
  body: graphqlMappingMutation,
}

await fetch('http://localhost/graphql/management/mapping', requestOptions)
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
