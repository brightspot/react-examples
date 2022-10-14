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

// export interface MarkedTextPostOrderVisitor<M extends N, T extends N, N> {
//   visitText: {
//     (text: String): T
//   }
//   visitMark: {
//     (mark: Mark | null, children: Array<N>): M
//   }
// }

export interface VisitMark {
  (mark: Mark | null, children: Array<String>): any
}
