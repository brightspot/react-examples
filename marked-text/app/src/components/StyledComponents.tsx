import React from 'react'
import {
  RteHtmlElement,
  RteMark,
  RteMarkData,
  RteMarkedText,
} from '../brightspot-marked-text/types'

interface TagElProps {
  tag: string
  children: Array<string | React.ReactElement | JSX.Element>
  attributes: { name: string; value: string }[]
}

interface TextComponentProps {
  text: string
}

interface ConvertedElementProps {
  element: string | React.ReactElement
}

interface ExternalContentRichTextMarkProps {
  children: Array<string | React.ReactElement>
  data: RteMarkData
}

interface RenderedComponentProps {
  Component: React.ReactElement | JSX.Element
}

interface ExternalContentRichTextElement extends RteMarkData {
  type: string
  version: string
  title: string
  authorName: string
  authorUrl: string
  providerName: string
  providerUrl: string
  thumbnailUrl: string
  thumbnailWidth: number
  thumbnailHeight: number
  markedHtml: RteMarkedText
}

const TypeComponentHandler = (
  mark: RteMark,
  children: Array<React.ReactElement>
) => {
  if (mark?.data.__typename === 'RteHtmlElement') {
    const { name, attributes } = mark.data as RteHtmlElement
    return RteHtmlMarkRenderer(name, children, attributes)
  }
  if (mark?.data?.__typename === 'ExternalContentRichTextElement') {
    const { markedHtml, type } = mark.data as ExternalContentRichTextElement
    if (type === 'video') {
      return RteExternalContentRenderer(markedHtml, type, children)
    } else {
      return <span></span>
    }
  }
  return <span></span>
}

const RteHtmlMarkRenderer = (
  name: string,
  children: Array<string | React.ReactElement | JSX.Element>,
  attributes: { name: string; value: string }[]
) => {
  return <TagComponent tag={name} children={children} attributes={attributes} />
}

const RteExternalContentRenderer = (
  markedHtml: RteMarkedText,
  type: string,
  children: Array<string | React.ReactElement | JSX.Element>
) => {
  const { name, attributes } = markedHtml.marks[0] as unknown as RteHtmlElement
  return <TagComponent tag={name} children={children} attributes={attributes} />
}

const TextComponent = ({ text }: TextComponentProps) => <span>{text}</span>

const RteHtmlElementComponent = ({ tag, children, attributes }: TagElProps) => {
  if (tag === 'br') return <LineBreakComponent />
  if (tag === 'iframe')
    return (
      <IframeComponent tag={tag} children={children} attributes={attributes} />
    )
  const Tag = `${tag}` as React.ElementType
  return (
    <Tag
      className={attributes.map((entry) =>
        entry.name === 'class' ? entry.value : null
      )}
    >
      {children.map((child, index) => (
        <ConvertedElement key={index} element={child} />
      ))}
    </Tag>
  )
}
const TagComponent = ({ tag, children, attributes }: TagElProps) => {
  if (tag === 'br') return <LineBreakComponent />
  if (tag === 'iframe')
    return (
      <IframeComponent tag={tag} children={children} attributes={attributes} />
    )
  const Tag = `${tag}` as React.ElementType
  return (
    <Tag
      className={attributes.map((entry) =>
        entry.name === 'class' ? entry.value : null
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

const IframeComponent = ({ children, attributes }: TagElProps) => {
  const SRC = attributes.filter((entry) => entry.name === 'src')[0].value
  const WIDTH = attributes.filter((entry) => entry.name === 'width')[0].value
  const HEIGHT = attributes.filter((entry) => entry.name === 'height')[0].value
  const ALLOW = attributes.filter((entry) => entry.name === 'allow')[0].value
  return (
    <iframe title={SRC} src={SRC} width={WIDTH} height={HEIGHT} allow={ALLOW}>
      {children.map((child, index) => (
        <ConvertedElement key={index} element={child} />
      ))}
    </iframe>
  )
}

const ConvertedElement = ({ element }: ConvertedElementProps) => {
  return <>{element}</>
}

const ExternalContent = ({ data }: ExternalContentRichTextMarkProps) => {}

const RenderedComponent = ({ Component }: RenderedComponentProps) => {
  return Component
}

export {
  TagComponent,
  TextComponent,
  ExternalContent,
  RenderedComponent,
  RteHtmlElementComponent,
  TypeComponentHandler,
}
