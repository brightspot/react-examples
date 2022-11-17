import { RteMarkData, RteMarkedText } from '../brightspot-marked-text/types'

export interface ExternalContentRichTextElement extends RteMarkData {
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

export interface ImageRichTextElement extends RteMarkData {
  fileUrl?: string
  alt?: string
  image?: Entries
  caption?: string
  credit?: string
  withBorder?: string
  withBackground?: string
  stretched?: string
}

interface Entries {
  entries: Entry[]
}

interface Entry {
  key: string
  value: string
}
