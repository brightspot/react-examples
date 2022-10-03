import './App.css'
import fetchGraphQL from './fetchGraphQL'
import { useState, useEffect, Suspense } from 'react'
import { graphql } from 'babel-plugin-relay/macro'
import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery,
} from 'react-relay/hooks'
import RelayEnvironment from './RelayEnvironment'

const SpqQuery = graphql`
  query AppGetItemQuery($title: String = "test") {
    SpqItem(model: { title: $title }) {
      body
      title
    }
  }
`
// Immediately load the query as our app starts. For a real app, we'd move this
// into our routing configuration, preloading data as we transition to new routes.
const preloadedQuery = loadQuery(RelayEnvironment, SpqQuery, {
  /* query variables */
})

// Inner component that reads the preloaded query results via `usePreloadedQuery()`.
// This works as follows:
// - If the query has completed, it returns the results of the query.
// - If the query is still pending, it "suspends" (indicates to React that the
//   component isn't ready to render yet). This will show the nearest <Suspense>
//   fallback.
// - If the query failed, it throws the failure error. For simplicity we aren't
//   handling the failure case here.

function App(props: any) {
  // const [title, setTitle] = useState<string>()
  const data = usePreloadedQuery(SpqQuery, props.preloadedQuery)

  // useEffect(() => {
  //   console.log({title })
  //   let isMounted = true
  //   fetchGraphQL(`
  //   query GetItem($title: String="test") {
  //     SpqItem(model: {title: $title}) {
  //       body
  //       title
  //     }
  //   }
  //   `).then((res) => {
  //     if(!isMounted) {
  //       return
  //     }
  //     const data = res.data
  //     console.log(data.SpqItem.title)
  //     setTitle(data.SpqItem.title)
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  //   return () => {
  //     isMounted = false
  //   }
  // }, [title])
  console.log({ data })
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello from static persisted queries</p>
      </header>
    </div>
  )
}

// The above component needs to know how to access the Relay environment, and we
// need to specify a fallback in case it suspends:
// - <RelayEnvironmentProvider> tells child components how to talk to the current
//   Relay Environment instance
// - <Suspense> specifies a fallback in case a child suspends.
function AppRoot(props: any) {
  console.log({ props })
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={'Loading...'}>
        <App preloadedQuery={preloadedQuery} />
      </Suspense>
    </RelayEnvironmentProvider>
  )
}

export default AppRoot
