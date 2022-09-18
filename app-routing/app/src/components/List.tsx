import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { Article } from '../generated'
import { RoutingContext } from './RoutingContext'

type PartArticle = Omit<Article, 'body'> | null

type Props = {
  articles: PartArticle[]
}

const List = ({ articles }: Props) => {
  const location = useLocation() // used to return current pathname if no routing option provided
  const context = useContext(RoutingContext)

  const linkPath = (id: string, slug: string) => {
    if (context?.routingOption === 1) {
      return `${id}`
    } else if (context?.routingOption === 2) {
      return `/section/${slug}`
    } else {
      console.log('no routing option provided for article')
      return location.pathname
    }
  }

  return (
    <section className="cardList-section">
      {articles?.map((article: PartArticle, i: number) => {
        return (
          <Link
            key={i}
            to={linkPath(
              `/${article?.section?.id}/${article?.id}`,
              `${article?.section?.slug}/article/${article?.slug}`
            )}
          >
            <div className="list-item" data-first={i === 0 ? true : null}>
              {article?.section?.name && (
                <p className="cardList-pageName">{article?.section?.name}</p>
              )}
              <h2 className="cardList-articleHeadline">{article?.headline}</h2>
            </div>
          </Link>
        )
      })}
    </section>
  )
}

export default List
