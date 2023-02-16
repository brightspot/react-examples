import { Link } from 'react-router-dom'

import { Article } from '../generated'

type PartialArticle = Omit<Article, 'body'> | null
type Props = {
  articles: PartialArticle[]
}

const List = ({ articles }: Props) => {
  return (
    <section className="cardList-section">
      {articles?.map((article, i: number) => (
        <Link
          key={i}
          to={`/sections/${article?.section?.slug}/${article?.slug}`}
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
