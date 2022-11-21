import { RteHtmlElement, RteMark } from '../brightspot-marked-text/types'
import ExternalContentRichTextComponent from './ExternalContentRichTextComponent'
import {
  HtmlRichTextComponent,
  IframeComponent,
  ImgComponent,
  LineBreakComponent,
  LinkTagComponent,
} from './HtmlRichTextComponents'
import { ImageRichTextComponent } from './ImageRichTextComponent'

let keyCount = 0

const TypeComponentHandler = (
  mark: RteMark,
  children: Array<React.ReactElement>
) => {
  if (mark?.data.__typename === 'RteHtmlElement') {
    return RichTextHandler(mark, children)
  } else if (mark?.data?.__typename === 'ExternalContentRichTextElement') {
    return externalContentHandler(mark)
  } else if (mark?.data?.__typename === 'ImageRichTextElement') {
    return imageRichTextHandler(mark)
  } else return <span>Undefined RichText Element</span>
}

const RichTextHandler = (
  mark: RteMark,
  children: Array<React.ReactElement>
) => {
  keyCount++
  const markData = mark.data as RteHtmlElement
  const { name, attributes } = markData

  if (name === 'script') return <span></span> // do nothing with script tags
  if (name === 'br') return <LineBreakComponent key={`${name}-${keyCount}`} />
  if (name === 'iframe')
    return (
      <IframeComponent
        key={`${name}-${keyCount}`}
        children={children}
        attributes={attributes}
      />
    )
  if (name === 'a')
    return (
      <LinkTagComponent
        key={`${name}-${keyCount}`}
        children={children}
        attributes={attributes}
      />
    )
  if (name === 'img')
    return <ImgComponent key={`${name}-${keyCount}`} markData={markData} />

  return (
    <HtmlRichTextComponent
      key={`${name}-${keyCount}`}
      markData={markData}
      children={children}
    />
  )
}

const externalContentHandler = (mark: RteMark) => {
  keyCount++
  return (
    <ExternalContentRichTextComponent
      key={`${mark.data.__typename}-${keyCount}`}
      mark={mark}
    />
  )
}

const imageRichTextHandler = (mark: RteMark) => {
  keyCount++
  return (
    <ImageRichTextComponent
      key={`${mark.data.__typename}-${keyCount}`}
      markData={mark.data}
    />
  )
}

export default TypeComponentHandler
