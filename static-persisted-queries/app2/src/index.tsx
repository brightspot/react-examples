import ReactDOM from 'react-dom/client'
import App from './App'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from '@apollo/client'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
// import { print } from 'graphql/language/printer'
// import  crypto from 'crypto'
// import sha256 from 'crypto-js/sha256'
import { sha256 } from 'crypto-hash'

// const getHash = function (document: any) {
//   // return crypto.createHash('sha256').update(JSON.stringify(print(document))).digest('hex')
//   const coolHash =  sha256(JSON.stringify(print(document))).toString()
//   console.log({ document, coolHash })
//   return coolHash
// }
// console.log()
// const link = process.env.REACT_APP_PERSISTED_QUERIES
//   ? createPersistedQueryLink({ useGETForHashedQueries: true, generateHash: (document) => getHash(document)}).concat(createHttpLink({
//     uri: process.env.REACT_APP_GRAPHQL_URL
//   }))
//   : createHttpLink({
//     uri: process.env.REACT_APP_GRAPHQL_URL
//   })
const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URL })

const persistedQueriesLink = createPersistedQueryLink({ sha256 })
console.log(persistedQueriesLink)
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: persistedQueriesLink.concat(httpLink),
})
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
