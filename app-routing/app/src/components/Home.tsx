import { Link } from 'react-router-dom'
import { useGetAllTagsAndArticlesQuery } from '../generated'
import CardList from './CardList'

const Home = () => {
  const { data, error, loading } = useGetAllTagsAndArticlesQuery()

  if (loading) return <div className="loading">loading...</div>

  if (error)
    return <div className="message">An error occurred: {error?.message}</div>

  if (!data?.AllArticles)
    return (
      <div className="message">
        <h3>No data... 🤔</h3>
      </div>
    )

  return (
    <>
      <div className="home-title">
        <h1>Welcome to News</h1>
      </div>
      <div className="home-tagsContainer">
        {data?.AllTags?.tags?.map((tag, i) => (
          <Link className="home-tags" key={i} to={`/tags/${tag?.slug}`}>
            {tag?.category}
          </Link>
        ))}
      </div>
      <div className="container">
        {data?.AllArticles?.articles && (
          <>
            <CardList articles={data?.AllArticles?.articles} />
          </>
        )}
      </div>
    </>
  )
}

export default Home
