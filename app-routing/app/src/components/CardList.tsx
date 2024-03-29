import { Link } from 'react-router-dom'
import { Article } from '../generated'

type PartialArticle = Omit<Article, 'body'> | null

type Props = {
  articles: PartialArticle[]
}

const CardList = ({ articles }: Props) => (
  <section className="cardList-section">
    <div className="cardList-grid">
      {articles?.map((article, i: number) => (
        <Link
          className="cardList-link"
          key={i}
          to={`/sections/${article?.section?.slug}/${article?.slug}`}
        >
          <div className="cardList-item">
            <h4 className="cardList-articleHeadline">{article?.headline}</h4>
            <span className="cardList-pageName">{article?.section?.name}</span>
          </div>
        </Link>
      ))}
    </div>
  </section>
)

export default CardList
