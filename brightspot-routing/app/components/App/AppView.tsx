import type { NextPage } from 'next'
import { App } from '../../generated/graphql'
import Container from '../Container/Container'
import DuoView from '../Duo/DuoView'
import SectionView from '../Section/SectionView'
import ListView from '../List/ListView'
import Navbar from '../Navbar/Navbar'
import { Article } from '../../generated/graphql'

interface Props {
  app: App
}

const AppView: NextPage<Props> = ({ app }) => {
  const randPageIndex = Math.floor(
    Math.random() *
      (app.Page_app_connection?.items.length
        ? app.Page_app_connection.items.length
        : 0)
  )
  const allArticles: Article[] = []

  app.Page_app_connection?.items.forEach((item) => {
    if (item.Article_page_connection?.items) {
      allArticles.push(...item.Article_page_connection.items)
    }
  })

  allArticles.sort(
    (a, b) => b.cms_content?.publishDate - a.cms_content?.publishDate
  )

  return (
    <div>
      <Navbar pages={app.Page_app_connection?.items || []} />
      <Container>
        <DuoView articles={allArticles.slice(0, 2)} />
        <ListView articles={allArticles.slice(2, 6)} />
        <SectionView page={app.Page_app_connection?.items[randPageIndex]} />
      </Container>
    </div>
  )
}

export default AppView
