import { RteHtmlElement } from '../brightspot-marked-text/types'
import { ImageRichTextElement } from './CustomRichTextTypes'

export interface TagElProps {
  markData: RteHtmlElement
  children: Array<React.ReactElement>
}

export interface TextComponentProps {
  text: string
}

export interface IframeProps {
  children: Array<string | React.ReactElement | JSX.Element>
  attributes: { name: string; value: string }[]
}

export interface ConvertedElementProps {
  element: string | React.ReactElement
}

export interface ImageRichTextElementProps {
  markData: ImageRichTextElement
}

export interface RenderedComponentProps {
  Component: React.ReactElement | JSX.Element
}
