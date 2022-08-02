import type { NextPage } from 'next'
import { Article } from '../../generated/graphql'

interface Props {
    article: Article
}

const ArticleView: NextPage<Props> = ({ article }) => {
  return (
    <div>
      <h2>{article.headline}</h2>
      <p>{article.body}</p>
    </div>
  )
}

export default ArticleView
