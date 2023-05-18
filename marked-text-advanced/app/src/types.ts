import { MarkData } from '@brightspot/marked-text'

export interface RteHtmlElement extends MarkData {
  name: string
  attributes: { name: string; value: string }[]
}
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

export interface LinkRichTextElement extends MarkData {
  href: string
  target: string
}
