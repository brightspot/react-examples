import { useState } from 'react'

import { Article } from '../../generated'
import { debounce, getArticle } from '../../utils/utils'

interface ContainerData {
  article?: Article | undefined
  errors?: string[]
}

const ArticleComponent = () => {
  const [data, setData] = useState<ContainerData>()

  const handleOnChange = (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    return debounce(() => getArticle(e?.target?.value, setData), 1000)()
  }

  return (
    <div className="article">
      This will make a GET Request with Parameters
      <h1>{data?.article?.headline}</h1>
      <h2>{data?.article?.subheadline}</h2>
      {data?.errors?.map((error, i) => (
        <p className="error" key={i}>
          {error}
        </p>
      ))}
      <div className="input-wrapper">
        <label htmlFor="path">Enter Article Path:</label>
        <input required name="path" onChange={handleOnChange} />
      </div>
    </div>
  )
}

export default ArticleComponent
