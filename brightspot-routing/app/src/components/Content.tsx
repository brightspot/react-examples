import { Navigate, useParams } from 'react-router-dom'

import { DirectoryData, Maybe, useGetContentQuery } from '../generated'

import NotFound from './NotFound'
import SectionComponent from './Section'
import ArticleComponent from './Article'

const currentPathIsRedirect = (
  currentPath: string,
  directoryData?: Maybe<DirectoryData>
): boolean => {
  return (
    directoryData?.paths?.some(
      (e) =>
        e?.path === currentPath &&
        (e.type === 'Redirect (Permanent)' || e.type === 'Redirect (Temporary)')
    ) || false
  )
}

const Content = () => {
  const parameters = useParams()

  let currentPath = ''
  Object.values(parameters).forEach(
    (parameter) => (currentPath += `/${parameter}`)
  )

  const { data, error, loading } = useGetContentQuery({
    variables: {
      path: currentPath,
    },
  })

  if (error) console.log(error.message)
  if (loading) return <div className="loading">loading...</div>

  if (data?.Section) {
    if (currentPathIsRedirect(currentPath, data.Section.directoryData)) {
      return <Navigate to={data.Section.path || '/'} />
    }
    return <SectionComponent section={data.Section} />
  }

  if (data?.Article) {
    if (currentPathIsRedirect(currentPath, data.Article.directoryData)) {
      return <Navigate to={data.Article.path || '/'} />
    }
    return <ArticleComponent article={data.Article} />
  }

  return <NotFound />
}

export default Content
