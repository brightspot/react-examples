import { Link, useSearchParams, useLocation } from 'react-router-dom'
import { Article } from '../generated'
import { useContext } from 'react'
import { RoutingContext } from './RoutingContext'

type PartArticle = Omit<Article, 'body'> | null

type Props = {
  articles: PartArticle[]
}


const CardList = ({ articles }: Props) => {
  const location = useLocation() // used to return current pathname if no routing option provided
  const context = useContext(RoutingContext)
  const [searchParams, setSearchParams] = useSearchParams()

  const linkPath = (id: string, slug: string) => {
    if (context?.routingOption === 1) {
      return `${id}`
    } else if (context?.routingOption === 2) {
      return `${slug}`
    } else {
      console.log('no routing option provided for section')
      return location.pathname
    }
  }

  const filteredArticles = () => {
    if(!searchParams.get('q')) {
      return articles
    }
    return articles.filter(x => searchParams?.get('q') && x?.headline && x?.headline?.toLowerCase().includes(searchParams?.get('q')?.toLowerCase()!))
  }


  return (
    <section className="cardList-section">
        <input placeholder='search headlines' onChange={(e) => setSearchParams({q: e.target?.value})}/>
        
      <div className="cardList-grid">
        {filteredArticles()?.map((article: PartArticle, i: number) => {
          return (
            <Link
              className='cardList-link'
              key={i}
              to={linkPath(
                `/${article?.section?.id}/${article?.id}`,
                `/section/${article?.section?.slug}/article/${article?.slug}`
              )}
            >
              <div
                className="cardList-item"
              >
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
