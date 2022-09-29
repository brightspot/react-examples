import { Link } from 'react-router-dom'

import { Article, Maybe } from '../generated'

type Props = {
  articles: Maybe<Array<Maybe<Article>>>
}

const List = ({ articles }: Props) => {
  return (
    <section className="cardList-section">
      {articles?.map((article, i: number) => (
        <Link
          key={i}
          to={
            article?.section?.id
              ? `/${article?.section?.id}/${article?.slug}`
              : `/${article?.id}`
          }
        >
          <div className="list-item" data-first={i === 0 ? true : null}>
            {article?.section?.name && (
              <span className="cardList-pageName">
                {article?.section?.name}
              </span>
            )}
            <h4 className="cardList-articleHeadline">{article?.headline}</h4>
          </div>
        </Link>
      ))}
    </section>
  )
}

export default List
