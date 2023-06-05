import './App.css'
import { useQuery } from '@apollo/client'
import GET_ARTICLES from './queries/GetArticles'

function App() {
  const { loading, error, data } = useQuery(GET_ARTICLES)

  if (loading) return <div>Loading...</div>
  if (error)
    return <div>There was an error fetching the data: {error.message}</div>

  const articleData = data?.ThemingArticles?.themingArticles
  const themeData = data?._Theme

  const root = document.querySelector('html')
  root?.style.setProperty('--primaryColor', themeData?.primaryColor)
  root?.style.setProperty('--secondaryColor', themeData?.secondaryColor)
  root?.style.setProperty('--primaryTextColor', themeData?.primaryTextColor)
  root?.style.setProperty('--secondaryTextColor', themeData?.secondaryTextColor)
  root?.style.setProperty('--font', themeData?.bodyFont)

  console.log({ articleData, themeData })
  return (
    <div className="App">
      <h1>Brightspot Theming</h1>
    </div>
  )
}

export default App
