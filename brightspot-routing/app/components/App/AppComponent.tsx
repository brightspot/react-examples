import type { NextPage } from 'next'
import { App } from '../../generated/graphql'
import ContainerComponent from '../Container/ContainerComponent'
import DuoComponent from '../Duo/DuoComponent'
import SectionComponent from '../Section/SectionComponent'
import ListComponent from '../List/ListComponent'
import NavbarComponent from '../Navbar/NavbarComponent'
import { Article } from '../../generated/graphql'

interface Props {
  app: App
}

const AppComponent: NextPage<Props> = ({ app }) => {
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
      <NavbarComponent pages={app.Page_app_connection?.items || []} />
      <ContainerComponent>
        <DuoComponent articles={allArticles.slice(0, 2)} />
        <ListComponent articles={allArticles.slice(2, 6)} />
        <SectionComponent
          page={app.Page_app_connection?.items[randPageIndex]}
        />
      </ContainerComponent>
    </div>
  )
}

export default AppComponent
