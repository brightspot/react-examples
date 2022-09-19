import { useGetAllArticlesQuery } from '../generated'
import { useContext } from 'react'
import { RoutingContext } from './RoutingContext'
import useSessionStorage from './useSessionStorage'

import Banner from './Banner'
import CardList from './CardList'

const Home = () => {
  const { data, error, loading } = useGetAllArticlesQuery()
  const context = useContext(RoutingContext)
  const [user, setUser] = useSessionStorage<string>('user', '')

  if (error) console.log(error.message)
  if (!data?.Articles && !loading)
    return (
      <div className="message">
        <h3>No data... 🤔</h3>
      </div>
    )
console.log('logged in as ', user)
  return (
    <>
      <Banner name="News At a Glance" />
      <button onClick={() => context?.setRoutingOption(1)}>routing 1</button>
      <button onClick={() => context?.setRoutingOption(2)}>routing 2</button>
      <button onClick={() => setUser('Brightspot User') }>Login</button>
      <button onClick={() => setUser('') }>Log Out</button>
      <div className="container">
        {data?.Articles?.articles && (
          <>
            <CardList articles={data?.Articles?.articles} />
          </>
        )}
      </div>
    </>
  )
}

export default Home
