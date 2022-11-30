import { HtmlElement, Mark } from '../brightspot-marked-text/types'
import {
  HtmlRichTextComponent,
  IframeComponent,
  ImgComponent,
  LineBreakComponent,
  LinkTagComponent,
} from './HtmlRichTextComponents'

let keyCount = 0

const TypeComponentHandler = (
  mark: Mark,
  children: Array<React.ReactElement>
) => {
  if (mark?.data.__typename === 'RteHtmlElement') {
    return RichTextHandler(mark, children)
  } else return <span>Undefined RichText Element</span>
}

const RichTextHandler = (mark: Mark, children: Array<React.ReactElement>) => {
  keyCount++
  const markData = mark.data as HtmlElement
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

export default TypeComponentHandler
