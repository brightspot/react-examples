import { useState, useEffect, useCallback } from 'react'
import { fetchArticle, ArticleResponse } from '../../api'
import MarkedTextComponent from '../MarkedText/MarkedTextComponent'

const Article = () => {
  const [article, setArticle] = useState<ArticleResponse>()

  const fetchArticleData = useCallback(
    async () => await fetchArticle(setArticle),
    []
  )

  useEffect(() => {
    fetchArticleData()
  }, [fetchArticleData])

  return (
    <div className="marked-text-container Article">
      <h1 className="headline">{article?.articleData?.headline}</h1>
      <MarkedTextComponent markedText={article?.articleData?.body} />
    </div>
  )
}
export default Article
