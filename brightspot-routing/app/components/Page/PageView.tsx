import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Page } from '../../generated/graphql'
import BannerView from '../Banner/BannerView'
import Container from '../Container/Container'
import DuoView from '../Duo/DuoView'
import ListView from '../List/ListView'

interface Props {
  page: Page
}

const PageView: NextPage<Props> = ({ page }) => {
  return (
    <div>
      <BannerView name={page.name} />
      <Container>
        <DuoView
          articles={page.Article_page_connection?.items.slice(0, 2) || []}
        />
        <ListView
          articles={page.Article_page_connection?.items.slice(2, 6) || []}
        />
      </Container>
    </div>
  )
}

export default PageView
