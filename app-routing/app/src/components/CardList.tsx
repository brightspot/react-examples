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
            <Link key={i} to={`/articles/${article?.slug}`}>
              <div className="cardList-item">
                <div className="cardList-textContainer">
                  <p className="cardList-pageName">{article?.section?.name}</p>
                  <h2 className="cardList-articleHeadline">
                    {article?.headline}
                  </h2>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default CardList
