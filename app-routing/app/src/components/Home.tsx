import { useGetAllArticlesQuery } from '../generated'
import { useContext } from 'react'
import { RoutingContext } from './RoutingContext'

import Banner from './Banner'
import CardList from './CardList'

const Home = () => {
  const { data, error, loading } = useGetAllArticlesQuery()
  const context = useContext(RoutingContext)

  if (error) console.log(error.message)
  if (!data?.Articles && !loading)
    return (
      <div className="message">
        <h3>No data... 🤔</h3>
      </div>
    )

  return (
    <>
      <Banner name="News At a Glance" />
      <button onClick={() => context?.setRoutingOption(1)}>routing 1</button>
      <button onClick={() => context?.setRoutingOption(2)}>routing 2</button>
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
