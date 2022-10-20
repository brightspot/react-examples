export interface MarkedText {
  text: string
  marks: Array<Mark>
}

export interface Mark {
  __typename: string
  name: string
  start: number
  end: number
  descendants: number
}

export interface VisitMark {
  (mark: Mark | null, children: Array<String>, index: number): any
}
