import { Section } from '../generated'

import Banner from './Banner'
import List from './List'

type Props = {
  section: Section
}

const SectionComponent = ({ section }: Props) => (
  <>
    <Banner name={`Section: ${section?.name}`} />
    <div className="container">
      {section.articles && <List articles={section.articles} />}
    </div>
  </>
)

export default SectionComponent
