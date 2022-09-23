import { Link } from 'react-router-dom'
import { Article } from '../generated'

type PartArticle = Omit<Article, 'body'> | null

type Props = {
  articles: PartArticle[]
}

const CardList = ({ articles }: Props) => {
  return (
    <section className="cardList-section">
      <div className="cardList-grid">
        {articles?.map((article: PartArticle, i: number) => {
          return (
            <Link
              className="cardList-link"
              key={i}
              to={
                article?.section?.id
                  ? `/${article?.section?.id}/${article?.slug}`
                  : `/${article?.id}`
              }
            >
              <div className="cardList-item">
                <h4 className="cardList-articleHeadline">
                  {article?.headline}
                </h4>
                <span className="cardList-pageName">
                  {article?.section?.name}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default CardList
