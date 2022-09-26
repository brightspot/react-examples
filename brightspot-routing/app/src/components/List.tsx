import { Link } from 'react-router-dom'
import { Section } from '../generated'

type Props = {
  section: Section
}

const List = ({ section }: Props) => {
  return (
    <section className="cardList-section">
      {section.articles &&
        section.articles.map((article, i) => (
          <Link key={i} to={`${section.path}${article?.path}`}>
            <div className="list-item" data-first={i === 0 ? true : null}>
              {article?.section?.name && (
                <p className="cardList-pageName">{article?.section?.name}</p>
              )}
              <h2 className="cardList-articleHeadline">{article?.headline}</h2>
            </div>
          </Link>
        ))}
    </section>
  )
}

export default List
