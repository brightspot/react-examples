import { RteMarkData, RteMarkedText } from '../brightspot-marked-text/types'

export interface ExternalContentRichTextElement extends RteMarkData {
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

export interface ImageRichTextElement extends RteMarkData {
  fileUrl: string
  alt: string
  withBorder: string
  withBackground: string
  stretched: string
}
