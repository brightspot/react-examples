import { HtmlElement } from '../brightspot-marked-text/types'

const ConvertedElement = ({ element }: { element: React.ReactElement }) => (
  <>{element}</>
)

const getAttrValue = (
  attribute: string,
  attributes: { name: string; value: string }[] | undefined
) => {
  if (attributes === undefined) return undefined
  const attr = attributes.filter((entry) => entry.name === attribute)

  return attr.length > 0 ? attr[0].value : undefined
}

const HtmlRichTextComponent = ({
  markData,
  children,
}: {
  markData: HtmlElement
  children: React.ReactElement[]
}) => {
  const { name, attributes } = markData
  const Tag = `${name}` as React.ElementType
  return (
    <Tag
      className={attributes.map((entry) =>
        entry.name === 'class' ? entry.value : null
      )}
    >
      {children}
    </Tag>
  )
}

const IframeComponent = ({
  children,
  attributes,
}: {
  children: React.ReactElement[]
  attributes: { name: string; value: string }[]
}) => {
  return (
    <iframe
      title={getAttrValue('src', attributes)}
      src={getAttrValue('src', attributes)}
      width={getAttrValue('width', attributes)}
      height={getAttrValue('height', attributes)}
      allow={getAttrValue('allow', attributes)}
    >
      {children.map((child, index) => (
        <ConvertedElement key={index} element={child} />
      ))}
    </iframe>
  )
}

const ImgComponent = ({ markData }: { markData: HtmlElement }) => {
  const { name, attributes } = markData
  return (
    <img
      key={`${name}-${getAttrValue('alt', attributes)}`}
      src={getAttrValue('src', attributes)}
      width={getAttrValue('width', attributes)}
      height={getAttrValue('height', attributes)}
      alt={getAttrValue('alt', attributes)}
    />
  )
}

const LineBreakComponent = () => <br />

const LinkTagComponent = ({
  children,
  attributes,
}: {
  children: React.ReactElement[]
  attributes: { name: string; value: string }[]
}) => {
  const HREF = attributes.filter((entry) => entry.name === 'href')[0].value
  const TITLE = attributes.filter((entry) => entry.name === 'title')[0].value
  return (
    <a href={HREF} title={TITLE}>
      {children}
    </a>
  )
}

export {
  HtmlRichTextComponent,
  LineBreakComponent,
  LinkTagComponent,
  ImgComponent,
  IframeComponent,
}
