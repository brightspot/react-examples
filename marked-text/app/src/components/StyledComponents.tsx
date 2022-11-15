import React from 'react'
import { RteHtmlElement, RteMark } from '../brightspot-marked-text/types'
import {
  ExternalContentRichTextElement,
  ImageRichTextElement,
} from './CustomRichTextTypes'

interface TagElProps {
  tag: string
  children: Array<string | React.ReactElement | JSX.Element>
  attributes: { name: string; value: string }[]
}

interface TextComponentProps {
  text: string
}

interface IframeProps {
  children: Array<string | React.ReactElement | JSX.Element>
  attributes: { name: string; value: string }[]
}

interface ConvertedElementProps {
  element: string | React.ReactElement
}

interface ImageRichTextElementProps {
  src: string
  alt: string
  caption: string
  credit: string
}

interface RenderedComponentProps {
  Component: React.ReactElement | JSX.Element
}

const TypeComponentHandler = (
  mark: RteMark,
  children: Array<React.ReactElement>
) => {
  if (mark?.data.__typename === 'RteHtmlElement') {
    const { name, attributes } = mark.data as RteHtmlElement
    return (
      <TagComponent
        key={`${name}-${children.length}`}
        tag={name}
        children={children}
        attributes={attributes}
      />
    )
  }
  if (mark?.data?.__typename === 'ExternalContentRichTextElement') {
    const { markedHtml, type } = mark.data as ExternalContentRichTextElement
    const { marks } = markedHtml
    const htmlMark = marks[0]?.data as RteHtmlElement
    if (type === 'video') {
      return (
        <IframeComponent children={children} attributes={htmlMark.attributes} />
      )
    } else {
      return <span>ExternalContentRichTextElement</span>
    }
  }
  if (mark?.data?.__typename === 'ImageRichTextElement') {
    const { fileUrl, alt, caption, credit } = mark.data as ImageRichTextElement
    return (
      <ImageRichTextElementComponent
        key={alt}
        src={fileUrl}
        alt={alt}
        caption={caption}
        credit={credit}
      />
    )
  }
  return <span>Undefined Custom Rich Text Element</span>
}

const ImageRichTextElementComponent = ({
  src,
  alt,
  credit,
  caption,
}: ImageRichTextElementProps) => (
  <div className="image-rte-container">
    <img src={src} alt={alt} />
    <p>{caption}</p>
    <span>{credit}</span>
  </div>
)

const TextComponent = ({ text }: TextComponentProps) => <span>{text}</span>

const TagComponent = ({ tag, children, attributes }: TagElProps) => {
  if (tag === 'br') return <LineBreakComponent />
  if (tag === 'iframe')
    return <IframeComponent children={children} attributes={attributes} />
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

const LineBreakComponent = () => <br />

const IframeComponent = ({ children, attributes }: IframeProps) => {
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

const ConvertedElement = ({ element }: ConvertedElementProps) => <>{element}</>

const RenderedComponent = ({ Component }: RenderedComponentProps) => Component

export { TextComponent, RenderedComponent, TypeComponentHandler }
