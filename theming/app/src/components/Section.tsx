import { FaDog, FaCat } from 'react-icons/fa'
import { AnimalData } from '../App'

interface Props {
  data: AnimalData
}

const Section = ({ data }: Props) => {
  return (
    <section className="animalSection" id={data?.userName}>
      <div className="sectionTitle">
        {data?._viewTemplate === '/cat' ? <FaCat /> : <FaDog />}

        <h2>{`About ${data?.name}`}</h2>
      </div>
      <a href="#intro">Back to top</a>
      <p>{data?.description}</p>
    </section>
  )
}

export default Section
