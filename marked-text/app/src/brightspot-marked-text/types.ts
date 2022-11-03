export interface RteMarkedText {
  text: string
  marks: RteMark[]
}

export interface RteMark {
  start: number
  end: number
  descendants: number
  data: RteHtmlElement
}

export interface RteHtmlElement {
  __typename: string
  name: string
  attributes: Attributes[]
}

interface Attributes {
  name: string
  value: string
}
export interface VisitMark {
  (mark: RteMark | null, children: string[], index: number): any
}

export interface MarkedTextFunction {
  (markedText: RteMarkedText, visitMark: VisitMark): any
}
