import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Page } from '../../generated/graphql'

interface Props {
  page: Page
}

const PageView: NextPage<Props> = ({ page }) => {

  const router = useRouter()
  const { pagePath } = router.query

  return (
    <div>
      {page.Article_page_connection?.items.map((item, index) => 
        <a href={`${process.env.NEXT_PUBLIC_HOST}/${pagePath}${item.url}`} key={index}>
          <h2>{item.headline}</h2>
        </a>
      )}
    </div>
  )
}

export default PageView
