import type { NextPage } from "next";
import styles from '../../styles/Home.module.css'
import { Page } from '../../generated/graphql'

interface Props {
    page: Page
}


const PageView: NextPage<Props> = () => {
    return  (
        <div className={styles.grid}>
            <h1>Page</h1>
        </div>
    )
}

export default PageView