import { FaDog, FaCat, FaStar, FaArrowRight } from 'react-icons/fa'
import { FiCircle } from 'react-icons/fi'
import { AnimalData } from '../App'

interface Props {
  data: AnimalData
  buttonStyle: string
}

interface LiProps {
  bulletStyle: string | null
}

const LiSpan = ({ bulletStyle }: LiProps) => {
  return (
    <span className="liIcon">
      {bulletStyle === 'bullet-cat' ? (
        <FaCat />
      ) : bulletStyle === 'bullet-dog' ? (
        <FaDog />
      ) : bulletStyle === 'bullet-circle' ? (
        <FiCircle />
      ) : bulletStyle === 'bullet-star' ? (
        <FaStar />
      ) : (
        <FaArrowRight />
      )}
    </span>
  )
}

const Card = ({ data, buttonStyle }: Props) => {
  return (
    <div className="card">
      <h3 className="cardTitle">{data?.name}</h3>
      <ul>
        <li>
          <LiSpan bulletStyle={data?._style?.bulletStyle} />
          UserName: {data.userName}
        </li>
        <li>
          {' '}
          <LiSpan bulletStyle={data?._style?.bulletStyle} />
          Color: {data.color}
        </li>
        <li>
          {' '}
          <LiSpan bulletStyle={data?._style?.bulletStyle} />
          Gender: {data.gender}
        </li>
        <li>
          {' '}
          <LiSpan bulletStyle={data?._style?.bulletStyle} />
          Breed: {data.breed}
        </li>
        <li>
          <LiSpan bulletStyle={data?._style?.bulletStyle} />
          Age: {data.age}
        </li>
      </ul>
      <a href={`#${data?.userName}`}>
        <button data-button={buttonStyle} className="cardButton">
          Select
        </button>
      </a>
    </div>
  )
}

export default Card
