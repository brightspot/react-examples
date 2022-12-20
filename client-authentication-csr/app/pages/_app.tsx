import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Client Authentication CSR</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="CSR Client Authentication example with Brightspot"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="https://www.brightspot.com/favicon-32x32.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
