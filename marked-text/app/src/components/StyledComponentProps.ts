export interface TagElProps {
  tag: string
  children: Array<string | React.ReactElement | JSX.Element>
  attributes: { name: string; value: string }[]
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
  src: string
  alt: string
  caption: string
  credit: string
}

export interface RenderedComponentProps {
  Component: React.ReactElement | JSX.Element
}
