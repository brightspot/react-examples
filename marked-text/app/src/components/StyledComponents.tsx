interface TagElProps {
  typeName: String
  tag: String
  children: Array<String | React.ReactElement>
}

interface ConvertedElementProps {
  element: String | React.ReactElement
}

const TagComponent = ({ typeName, tag, children }: TagElProps) => {
  if (typeName === 'RichTextMark') return <span></span>
  if (tag === 'br') return <LineBreakComponent />
  const Tag = `${tag}` as React.ElementType
  return (
    <Tag>
      {children.map((child, index) => (
        <ConvertedElement key={index} element={child} />
      ))}
    </Tag>
  )
}

const LineBreakComponent = () => {
  return <br />
}

const ConvertedElement = ({ element }: ConvertedElementProps) => {
  return <>{element}</>
}

export default TagComponent
