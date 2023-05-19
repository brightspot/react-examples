import { MarkData } from '@brightspot/marked-text'

export type HtmlRichTextElement = MarkData & {
  name: string
  attributes: HtmlAttribute[]
}

export type HtmlAttribute = {
  name: string
  value: string
}

export type ImageRichTextElement = MarkData & {
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

export type LinkRichTextElement = MarkData & {
  href: string
  target: string
}
