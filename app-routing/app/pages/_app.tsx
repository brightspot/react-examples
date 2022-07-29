import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { client } from '../lib/client'

function MyApp({ Component, pageProps }: AppProps) {
  <ApolloProvider client={client}>
  return <Component {...pageProps} />
  </ApolloProvider>
}

export default MyApp
