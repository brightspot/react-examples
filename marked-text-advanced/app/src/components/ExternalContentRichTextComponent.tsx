import { markedTextTraversal } from '../brightspot-marked-text/index'
import { Mark, MarkData, MarkedText } from '../brightspot-marked-text/types'
import ReactComponent from './ReactComponent'
import TextComponent from './TextComponent'
import TypeComponentHandler from './TypeComponentHandler'

interface ExternalContentRichTextElement extends MarkData {
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
  markedHtml?: MarkedText
}

const ExternalContentRichTextComponent = ({ mark }: { mark: Mark }) => {
  const { markedHtml, type, title } =
    mark.data as ExternalContentRichTextElement

  const markedText = markedHtml as MarkedText

  let visitorHandler = {
    visitText: (text: string) => <TextComponent key={text} text={text} />,
    visitMark: (mark: Mark, children: Array<React.ReactElement>): any =>
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
