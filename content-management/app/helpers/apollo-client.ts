import { ApolloClient, InMemoryCache } from '@apollo/client'

/* Key Point 🔑: 
1. These environment variables are securely hidden since the application makes network call with API Routes
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
