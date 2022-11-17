import React from 'react'
import { markedTextTraversal } from '../brightspot-marked-text/marked-text'
import {
  RteHtmlElement,
  RteMark,
  RteMarkedText,
} from '../brightspot-marked-text/types'
import {
  ExternalContentRichTextElement,
  ImageRichTextElement,
} from './CustomRichTextTypes'
import {
  TagElProps,
  TextComponentProps,
  IframeProps,
  ConvertedElementProps,
  ImageRichTextElementProps,
  RenderedComponentProps,
} from './StyledComponentProps'

const TypeComponentHandler = (
  mark: RteMark,
  children: Array<React.ReactElement>
) => {
  if (mark?.data.__typename === 'RteHtmlElement') {
    const markData = mark.data as RteHtmlElement
    const { name } = markData
    return (
      <HtmlComponent
        key={`${name}-${children.length}`}
        markData={markData}
        children={children}
      />
    )
  }
  if (mark?.data?.__typename === 'ExternalContentRichTextElement') {
    const { markedHtml, type, title } =
      mark.data as ExternalContentRichTextElement

    const markedText = markedHtml as RteMarkedText
    const textHandler = (text: string) => {
      return <TextComponent key={text} text={text} />
    }
    const componentHandler = (
      mark: RteMark,
      children: Array<React.ReactElement>
    ): any => TypeComponentHandler(mark, children)
    let visitorHandler = {
      visitText: textHandler,
      visitMark: componentHandler,
    }
    if (type === 'video') {
      const markedWithinMark = markedTextTraversal(markedText, visitorHandler)
      return (
        <RenderedComponent
          key={`${type}-${title}`}
          Component={markedWithinMark[0]}
        />
      )
    }
    if (type === 'rich') {
      const markedWithinMark = markedTextTraversal(markedText, visitorHandler)
      return (
        <RenderedComponent
          key={`${type}-${title}`}
          Component={markedWithinMark[0]}
        />
      )
    }
    if (type === 'photo' || type === 'link') {
      visitorHandler.visitMark = PhotoLinkComponent
      const markedWithinMark = markedTextTraversal(markedText, visitorHandler)
      return (
        <RenderedComponent
          key={`${type}-${title}`}
          Component={markedWithinMark[0]}
        />
      )
    }
  }
  if (mark?.data?.__typename === 'ImageRichTextElement') {
    const markData = mark.data as ImageRichTextElement
    return <ImageRichTextElementComponent markData={markData} />
  }
  return <span>Undefined Custom Rich Text Element</span>
}

const TextComponent = ({ text }: TextComponentProps) => <span>{text}</span>

const HtmlComponent = ({ markData, children }: TagElProps) => {
  const { name, attributes } = markData
  if (name === 'script') return <span></span>
  if (name === 'br') return <LineBreakComponent />
  if (name === 'iframe')
    return <IframeComponent children={children} attributes={attributes} />
  const Tag = `${name}` as React.ElementType
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
  const hasWidth = attributes.filter((entry) => entry.name === 'width')
  const WIDTH = hasWidth.length > 0 ? hasWidth[0].value : undefined
  const HEIGHT = attributes.filter((entry) => entry.name === 'height')[0].value
  const hasAllow = attributes.filter((entry) => entry.name === 'allow')
  const ALLOW = hasAllow.length > 0 ? hasAllow[0].value : undefined
  return (
    <iframe title={SRC} src={SRC} width={WIDTH} height={HEIGHT} allow={ALLOW}>
      {children.map((child, index) => (
        <ConvertedElement key={index} element={child} />
      ))}
    </iframe>
  )
}

const ImageRichTextElementComponent = ({
  markData,
}: ImageRichTextElementProps) => {
  const { caption, credit, alt, image } = markData
  const SRC = image?.entries.filter((entry) => entry.key === 'src')[0].value
  const WIDTH = image?.entries.filter((entry) => entry.key === 'width')[0].value
  const HEIGHT = image?.entries.filter((entry) => entry.key === 'height')[0]
    .value
  return (
    <span className="image-rte-container">
      <img
        className="image"
        src={SRC}
        alt={alt}
        width={WIDTH}
        height={HEIGHT}
      />
      <span className="caption">{caption}</span>
      <span className="credit">{credit}</span>
    </span>
  )
}

const PhotoLinkComponent = (mark: RteMark, children: any[]) => {
  const { name, attributes } = mark.data as RteHtmlElement

  if (name === 'script') return null // do nothing with script tags
  if (name === 'a') {
    const HREF = attributes.filter((entry) => entry.name === 'href')[0].value
    const TITLE = attributes.filter((entry) => entry.name === 'title')[0].value
    return (
      <a href={HREF} title={TITLE}>
        {children}
      </a>
    )
  }
  if (name === 'img') {
    const SRC = attributes.filter((entry) => entry.name === 'src')[0].value
    const WIDTH = attributes.filter((entry) => entry.name === 'width')[0].value
    const HEIGHT = attributes.filter((entry) => entry.name === 'height')[0]
      .value
    const ALT = attributes.filter((entry) => entry.name === 'alt')[0].value
    return (
      <img
        key={`${name}-${ALT}`}
        src={SRC}
        width={WIDTH}
        height={HEIGHT}
        alt={ALT}
      />
    )
  }
}

const ConvertedElement = ({ element }: ConvertedElementProps) => <>{element}</>

const RenderedComponent = ({ Component }: RenderedComponentProps) => Component

export { TextComponent, RenderedComponent, TypeComponentHandler }
