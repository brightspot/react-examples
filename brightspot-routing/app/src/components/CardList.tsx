import { Link } from 'react-router-dom'
import { Articles } from '../generated'

type Props = {
  articles: Articles
}

const CardList = ({ articles }: Props) => (
  <section className="cardList-section">
    <div className="cardList-grid">
      {articles.articles?.map((article, i) => (
        <Link
          className="cardList-link"
          key={i}
          to={`${article?.section?.path}${article?.path}`}
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
