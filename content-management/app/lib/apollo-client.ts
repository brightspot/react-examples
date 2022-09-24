import { ApolloClient, InMemoryCache } from '@apollo/client'

/* Key Points 🔑: 
1. Check the Network tab when a network request is made. Notice that the client Id and client secret are not shown
*/

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache(),
  headers: {
    'X-Client-ID': process.env.GRAPHQL_CLIENT_ID!,
    'X-Client-Secret': process.env.GRAPHQL_CLIENT_SECRET!,
  },
})

export default client
