import { Link } from 'react-router-dom'

import { Article } from '../generated'
import { findPermalink } from '../utils/utils'

type Props = {
  article: Article
}

const ArticleComponent = ({ article }: Props) => {
  let publishDate = new Date(article.publishDate || 0)

  return (
    <div className="container">
      <h1 className="article-headline">{article.headline}</h1>
      <span className="article-datePublished">
        {publishDate.toDateString() + ' - ' + publishDate.toTimeString()}
      </span>
      <br />
      <Link to={findPermalink(article.section?.paths)}>
        <p className="article-sectionName">{article.section?.name}</p>
      </Link>
      <p className="article-body">{article.body}</p>
    </div>
  )
}

export default ArticleComponent
