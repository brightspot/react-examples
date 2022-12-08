import { ExternalContentRichTextElement } from '../types'
import MarkedTextComponent from './MarkedTextComponent'

const ExternalContentRichTextComponent = ({
  markData,
}: {
  markData: ExternalContentRichTextElement
}) => {
  const { markedHtml, type, title } = markData

  return (
    <div className="external-rich-text-video">
      <h3>{title}</h3>
      <h3>Type of Rich Text Element: {type}</h3>
      {markedHtml && <MarkedTextComponent markedText={markedHtml} />}
    </div>
  )
}

export default ExternalContentRichTextComponent
