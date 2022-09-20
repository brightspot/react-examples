import HelloWorldArticle from './HelloWorldArticle'
import Article from './ArticleComponent'
import ArticlePost from './ArticlePost'

const ArticleContainer = () => {
  return (
    <div className="article-container">
      <HelloWorldArticle />
      <Article />
      <ArticlePost />
    </div>
  )
}

export default ArticleContainer
