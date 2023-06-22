import './App.css'
import { RiEmotionHappyLine } from 'react-icons/ri'
import { useQuery } from '@apollo/client'
import GET_ARTICLES from './queries/GetArticles'

type ArticleData = {
  headline?: string
  body?: string
  slug: string
  _style: {
    showHappyFace?: boolean
    happyFaceColor?: string
  }
}

type Theme = {
  alignment?: string
  bodyFont?: string
  primaryColor?: string
  primaryTextColor?: string
  secondaryColor?: string
  secondaryTextColor?: string
}

function App() {
  const { loading, error, data } = useQuery(GET_ARTICLES)

  if (loading) return <div>Loading...</div>
  if (error) return <div>There was an error fetching data: {error.message}</div>

  const articleData = data?.ThemingArticles?.themingArticles
  const themeData: Theme = data?._Theme

  const root = document.querySelector('html')
  if (root) {
    root.style.setProperty('--primaryColor', themeData?.primaryColor || '#fff')
    root.style.setProperty(
      '--secondaryColor',
      themeData?.secondaryColor || '#f1eced'
    )
    root.style.setProperty(
      '--primaryTextColor',
      themeData?.primaryTextColor || '#000'
    )
    root.style.setProperty(
      '--secondaryTextColor',
      themeData?.secondaryTextColor || '#000'
    )
    root.style.setProperty('--font', themeData?.bodyFont || 'sans-serif')
  }

  return (
    <div className="App">
      <header>
        <h1 className="title" data-alignment={themeData?.alignment}>
          Brightspot Theming
        </h1>
      </header>
      <section>
        <ul>
          {articleData.map((article: ArticleData) => (
            <li key={article.slug}>
              {article._style?.showHappyFace && (
                <RiEmotionHappyLine
                  style={
                    {
                      '--happyFaceColor': article._style?.happyFaceColor,
                    } as React.CSSProperties
                  }
                />
              )}
              <h3>{article?.headline}</h3>
              <p>{article?.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default App
