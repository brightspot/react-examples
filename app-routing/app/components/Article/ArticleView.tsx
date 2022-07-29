import type { NextPage } from 'next';
import styles from '../../styles/Home.module.css'
// import { Article } from '../../generated/graphql'

interface Props {
    // article: Article
    article: string
}

const ArticleView: NextPage<Props> = ({ article }) => {
    return  (
        <div className={styles.card}>
            <h1>Article</h1>
        </div>
    )
}

export default ArticleView