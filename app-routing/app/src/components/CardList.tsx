import { Link, useSearchParams } from 'react-router-dom'
import { Article } from '../generated'


type PartArticle = Omit<Article, 'body'> | null

type Props = {
  articles: PartArticle[]
}

const CardList = ({ articles }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const showTrendingArticles = searchParams.get('trending') ==='true'


  return (
    <section className="cardList-section">
      <button onClick={() => setSearchParams({ trending: 'true' })}>Click for trending</button>
      <button onClick={() => setSearchParams({})}>Click for All</button>
      <div className="cardList-grid">
        {articles?.map((article: PartArticle, i: number) => {
          return (
            <Link key={i} to={`/${article?.section?.id}/${article?.id}`}>
             {/* <Link key={i} to={`/articles/${article?.slug}`} state={{id: 12345}}> */}
              <div className="cardList-item" data-trending={showTrendingArticles && article?.tags ? true : null}>
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
