import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { client } from '../lib/client'
import Head from 'next/head'
import Header from '../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Images example with Brightspot" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="https://www.brightspot.com/favicon-32x32.png" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
