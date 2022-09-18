import { Link } from 'react-router-dom'
import { Article } from '../generated'

type PartArticle = Omit<Article, 'body'> | null

type Props = {
  articles: PartArticle[]
}

const List = ({ articles }: Props) => {
  return (
    <section className="cardList-section">
      {articles?.map((article: PartArticle, i: number) => {
        console.log({ article })
        return (
          <Link key={i} to={`/${article?.section?.id}/${article?.id}`}>
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
