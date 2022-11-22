import { markedTextTraversal } from '../brightspot-marked-text/marked-text'
import {
  RteMark,
  RteMarkData,
  RteMarkedText,
} from '../brightspot-marked-text/types'
import ReactComponent from './ReactComponent'
import TextComponent from './TextComponent'
import TypeComponentHandler from './TypeComponentHandler'

interface ExternalContentRichTextElement extends RteMarkData {
  type?: string
  version?: string
  title?: string
  authorName?: string
  authorUrl?: string
  providerName?: string
  providerUrl?: string
  originalUrl?: string
  thumbnailUrl?: string
  thumbnailWidth?: number
  thumbnailHeight?: number
  markedHtml?: RteMarkedText
}

const ExternalContentRichTextComponent = ({ mark }: { mark: RteMark }) => {
  const { markedHtml, type, title } =
    mark.data as ExternalContentRichTextElement

  const markedText = markedHtml as RteMarkedText

  let visitorHandler = {
    visitText: (text: string) => <TextComponent key={text} text={text} />,
    visitMark: (mark: RteMark, children: Array<React.ReactElement>): any =>
      TypeComponentHandler(mark, children),
  }
  const markedWithinMark = markedTextTraversal(markedText, visitorHandler)
  return (
    <div className="external-rich-text-video">
      <h3>{title}</h3>
      <h3>Type of Rich Text Element: {type}</h3>
      {markedWithinMark.map((Component, index: number) => {
        return <ReactComponent key={index} Component={Component} />
      })}
    </div>
  )
}

export default ExternalContentRichTextComponent
