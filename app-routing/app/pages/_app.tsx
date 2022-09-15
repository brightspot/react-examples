import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { client } from '../lib/client'
import LayoutPage from '../components/LayoutPage'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <LayoutPage>
        <Component {...pageProps} />
      </LayoutPage>
    </ApolloProvider>
  )
}

export default MyApp
