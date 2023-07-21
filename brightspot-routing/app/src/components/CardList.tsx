import { Link } from 'react-router-dom'
import { AllArticles } from '../generated'
import { findPermalink } from '../utils/utils'

type Props = {
  allArticles: AllArticles
}

const CardList = ({ allArticles }: Props) => (
  <section className="cardList-section">
    <div className="cardList-grid">
      {allArticles.articles?.map((article, i) => (
        <Link
          className="cardList-link"
          key={i}
          to={findPermalink(article?.paths)}
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
