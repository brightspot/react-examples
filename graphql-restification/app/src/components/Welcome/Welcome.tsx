import { Article } from '../../generated/graphql'
interface Props {
  article: Article | undefined
}

const HelloWorldComponent = ({ article }: Props) => {
  if (!article) return <div>Something Went Wrong...</div>
  const { headline, subheadline } = article

  return (
    <div className="hello-world">
      <h1>{headline}</h1>
      <h2>{subheadline}</h2>
    </div>
  )
}

export default HelloWorldComponent
