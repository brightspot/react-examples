import ReactDOM from 'react-dom/client'
import App from './App'
// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
// import { createUploadLink } from "apollo-upload-client"

// const link = createUploadLink({
//   uri: process.env.REACT_APP_GRAPHQL_URL ?? '',
//   headers: {
//     'X-Client-ID': '00000183d3c1d2e9a1afdbf752850000',
//     'X-Client-Secret': 'FVeSGlSJAFwqixC4h3qHoqICNlBgecjAI2djAhd'
//   }
// })

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link,
// })

const root = ReactDOM.createRoot(document.getElementById('root')) //  as HTMLElement
root.render(
  // <ApolloProvider client={client}>
    <App />
  // </ApolloProvider>
)


