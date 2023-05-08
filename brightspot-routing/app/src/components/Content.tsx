import { Navigate, useParams } from 'react-router-dom'

import { useGetContentQuery } from '../generated'

import { findPermalink, isRedirect } from '../utils/utils'
import NotFound from './NotFound'
import SectionComponent from './Section'
import ArticleComponent from './Article'

const Content = () => {
  const parameters = useParams()

  let urlPath = '/' + Object.values(parameters)

  const { data, error, loading } = useGetContentQuery({
    variables: {
      path: urlPath,
    },
  })

  if (error) console.log(error.message)
  if (loading) return <div className="loading">loading...</div>

  if (data?.Section) {
    if (isRedirect(urlPath, data.Section.directoryData)) {
      return <Navigate to={findPermalink(data.Section.directoryData)} />
    }
    return <SectionComponent section={data.Section} />
  }

  if (data?.Article) {
    if (isRedirect(urlPath, data.Article.directoryData)) {
      return <Navigate to={findPermalink(data.Article.directoryData)} />
    }
    return <ArticleComponent article={data.Article} />
  }

  return <NotFound />
}

export default Content
