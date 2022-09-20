import { Link } from 'react-router-dom'
import { useGetAllTagsAndArticlesQuery } from '../generated'

import Banner from './Banner'
import CardList from './CardList'

const Home = () => {
  const { data, error, loading } = useGetAllTagsAndArticlesQuery()

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
