import { FaDog, FaCat, FaArrowCircleUp } from 'react-icons/fa'
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
      <span>
        <FaArrowCircleUp className="iconSpan" />
        <a href="#intro">Back to top</a>
      </span>
      <div className="animalDescription">
        <p>{data?.description}</p>
      </div>
    </section>
  )
}

export default Section
