import type { NextPage } from 'next'
import { Page } from '../../generated/graphql'
import BannerComponent from '../Banner/BannerComponent'
import ContainerComponent from '../Container/ContainerComponent'
import DuoComponent from '../Duo/DuoComponent'
import ListComponent from '../List/ListComponent'

interface Props {
  page: Page
}

const PageComponent: NextPage<Props> = ({ page }) => {
  return (
    <div>
      <BannerComponent name={page.name} />
      <ContainerComponent>
        <DuoComponent
          articles={page.Article_page_connection?.items.slice(0, 2) || []}
        />
        <ListComponent
          articles={page.Article_page_connection?.items.slice(2, 6) || []}
        />
      </ContainerComponent>
    </div>
  )
}

export default PageComponent
