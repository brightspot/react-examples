import { Link } from 'react-router-dom'
import { Article, Maybe } from '../generated'

type Props = {
  sectionPath?: string | null
  articles: Maybe<Array<Maybe<Article>>>
}

const List = ({ sectionPath, articles }: Props) => {
  return (
    <section className="cardList-section">
      {articles &&
        articles.map((article, i) => {
          return (
            <Link key={i} to={`${sectionPath}${article?.path}`}>
              <div className="list-item" data-first={i === 0 ? true : null}>
                {article?.section?.name && (
                  <p className="cardList-pageName">{article?.section?.name}</p>
                )}
                <h2 className="cardList-articleHeadline">
                  {article?.headline}
                </h2>
              </div>
            </Link>
          )
        })}
    </section>
  )
}

export default List
