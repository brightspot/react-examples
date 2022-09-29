import { Link } from 'react-router-dom'
import { Article, Maybe } from '../generated'

type Props = {
  articles: Maybe<Array<Maybe<Article>>>
}

const CardList = ({ articles }: Props) => {
  return (
    <section className="cardList-section">
      <div className="cardList-grid">
        {articles?.map((article, i: number) => (
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
              <h4 className="cardList-articleHeadline">{article?.headline}</h4>
              <span className="cardList-pageName">
                {article?.section?.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CardList
