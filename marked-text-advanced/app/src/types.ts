import { MarkData, MarkedText } from '@brightspot/marked-text'

export interface ImageRichTextElement extends MarkData {
  fileUrl?: string
  alt?: string
  image: {
    entries: {
      key: string
      value: string
    }[]
  }
  caption?: string
  credit?: string
  withBorder?: string
  withBackground?: string
  stretched?: string
}

export interface ExternalContentRichTextElement extends MarkData {
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
