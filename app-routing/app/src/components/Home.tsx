import { useGetAllArticlesQuery } from '../generated'
import Banner from './Banner'
import CardList from './CardList'

const Home = () => {
  const { data, error, loading } = useGetAllArticlesQuery()

  if (error) console.log(error.message)
  if (!data?.Articles && !loading)
    return (
      <div className="message">
        <h3>No data... 🤔</h3>
      </div>
    )
  console.log({ data })

  return (
    <>
      <Banner name="News At a Glance" />
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
