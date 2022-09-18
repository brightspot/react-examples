import { Link, useSearchParams, useLocation } from 'react-router-dom'
import { Article } from '../generated'
import { useContext } from 'react'
import { RoutingContext } from './RoutingContext'

type PartArticle = Omit<Article, 'body'> | null

type Props = {
  articles: PartArticle[]
}

const CardList = ({ articles }: Props) => {
  const location = useLocation() // used to return current pathname if no routing option provided
  const context = useContext(RoutingContext)

  const [searchParams, setSearchParams] = useSearchParams()
  const showTrendingArticles = searchParams.get('trending') === 'true'

  const linkPath = (id: string, slug: string) => {
    if (context?.routingOption === 1) {
      return `${id}`
    } else if (context?.routingOption === 2) {
      return `${slug}`
    } else {
      console.log('no routing option provided for section')
      return location.pathname
    }
  }

  return (
    <section className="cardList-section">
      <button onClick={() => setSearchParams({ trending: 'true' })}>
        Click for trending
      </button>
      <button onClick={() => setSearchParams({})}>Click for All</button>
      <div className="cardList-grid">
        {articles?.map((article: PartArticle, i: number) => {
          return (
            <Link
              key={i}
              to={linkPath(
                `/${article?.section?.id}/${article?.id}`,
                `/section/${article?.section?.slug}/article/${article?.slug}`
              )}
            >
              <div
                className="cardList-item"
                data-trending={
                  showTrendingArticles && article?.tags ? true : null
                }
              >
                <div className="cardList-textContainer">
                  <p className="cardList-pageName">{article?.section?.name}</p>
                  <h2 className="cardList-articleHeadline">
                    {article?.headline}
                  </h2>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default CardList
