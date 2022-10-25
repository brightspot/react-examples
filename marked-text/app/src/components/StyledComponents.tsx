interface TagElProps {
  typeName: String
  tag: String
  children: Array<String | React.ReactElement>
  attributes: { entries: [{ key: string; value: string }] }
}

interface ConvertedElementProps {
  element: String | React.ReactElement
}

const TagComponent = ({ typeName, tag, children, attributes }: TagElProps) => {
  // This example is only using HTML Marks
  if (typeName === 'RichTextMark') return <span></span>
  if (tag === 'br') return <LineBreakComponent />
  const Tag = `${tag}` as React.ElementType
  return (
    <Tag
      className={attributes.entries.map((entry) =>
        entry.key === 'class' ? entry.value : null
      )}
    >
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
