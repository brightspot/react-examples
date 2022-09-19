import { useGetAllArticlesQuery, useGetAllTagsQuery } from '../generated'

import Banner from './Banner'
import CardList from './CardList'
import { Link } from 'react-router-dom'

const Home = () => {
  const {
    data: articlesData,
    error: articlesError,
    loading: articlesLoading,
  } = useGetAllArticlesQuery()
  const { data: tagsData, error: tagsError } = useGetAllTagsQuery()

  if (articlesError) console.log(articlesError.message)
  if (tagsError) console.log(tagsError.message)
  if (!articlesData?.Articles && !articlesLoading)
    return (
      <div className="message">
        <h3>No data... 🤔</h3>
      </div>
    )

  return (
    <>
      <Banner name="News At a Glance" />
      {tagsData?.Tags?.tags?.map((tag, i) => {
        return (
          <Link className="home-tags" key={i} to={`/${tag?.id}`}>
            {tag?.category}
          </Link>
        )
      })}
      <div className="container">
        {articlesData?.Articles?.articles && (
          <>
            <CardList articles={articlesData?.Articles?.articles} />
          </>
        )}
      </div>
    </>
  )
}

export default Home
