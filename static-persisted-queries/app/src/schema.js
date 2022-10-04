import fetch from 'node-fetch'
import { readFileSync, writeFile } from 'fs'
// import { createHash } from 'crypto'
import { sha256 } from 'crypto-hash'
// import { print } from 'graphql/language/printer'

// const schemaQuery = readFileSync('./src/graphql/ItemQuery.graphql', 'utf-8')
// const schemaQuery = print()
// console.log('SCHEMA QUERY', schemaQuery)
// const schemaHash = createHash('sha256').update(JSON.stringify(schemaQuery)).digest('hex')
const schemaHash = await sha256(
  'query GetItem($title: String = "hello") {\n  SpqItem(model: {title: $title}) {\n    title\n    body\n    __typename\n  }\n}'
)
const fetchBody = JSON.stringify({
  variables: {},
  extensions: {
    persistedQuery: {
      sha256Hash: schemaHash,
    },
  },
})

console.log({ fetchBody })
fetch('http://localhost/graphql/delivery/spq', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: fetchBody,
})
  .then((result) => result.json())
  .then((result) => {
    // here we're filtering out any type information unrelated to unions or interfaces
    // const filteredData = result.data.__schema.types.filter(
    //   type => type.possibleTypes !== null
    // )
    // result.data.__schema.types = filteredData
    console.log(' in the final RESULT PHASE', result)
    writeFile(
      './src/fragmentTypes.json',
      JSON.stringify(result.data),
      (err) => {
        if (err) {
          console.error('Error writing fragmentTypes file', err)
        } else {
          console.log('Fragment types successfully extracted!')
        }
      }
    )
    console.log('RESULT ~ ~', result)
  })
  .catch((error) => {
    console.error(
      'Error retrieving schema. Check that your environment.js variables and Brightspot GraphQL settings are configured properly...',
      error
    )
  })
