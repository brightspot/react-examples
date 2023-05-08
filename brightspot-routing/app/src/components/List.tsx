import { Link } from 'react-router-dom'
import { Maybe, Article } from '../generated'
import { findPermalink } from '../utils/utils'

type Props = {
  articles: Maybe<Article>[]
}

const List = ({ articles }: Props) => (
  <section className="cardList-section">
    {articles &&
      articles.map((article, i) => (
        <Link key={i} to={findPermalink(article?.directoryData)}>
          <div className="list-item" data-first={i === 0 ? true : null}>
            {article?.section?.name && (
              <p className="cardList-pageName">{article?.section?.name}</p>
            )}
            <h2 className="cardList-articleHeadline">{article?.headline}</h2>
          </div>
        </Link>
      ))}
  </section>
)

export default List
