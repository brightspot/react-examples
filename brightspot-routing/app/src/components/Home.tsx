import { useGetAllArticlesQuery } from '../generated'

import CardList from './CardList'

const Home = () => {
  const { data, error } = useGetAllArticlesQuery()

  if (error) console.log(error.message)

  return (
    <>
      <div className="home-title">
        <h1>Welcome to News</h1>
      </div>
      <div className="container">
        {data?.AllArticles && (
          <>
            <CardList allArticles={data?.AllArticles} />
          </>
        )}
      </div>
    </>
  )
}

export default Home
