import { Link } from 'react-router-dom'
import { useGetAllTagsAndArticlesQuery } from '../generated'
import CardList from './CardList'

const Home = () => {
  const { data, error, loading } = useGetAllTagsAndArticlesQuery()

  if (error) console.log(error.message)
  if (loading) return <div className="loading">loading...</div>

  if (!data?.Articles)
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
        {data?.Tags?.tags?.map((tag, i) => (
          <Link className="home-tags" key={i} to={`/${tag?.id}`}>
            {tag?.category}
          </Link>
        ))}
      </div>
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
