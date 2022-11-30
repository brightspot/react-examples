/** MarkedText created from a rich text field. */
export type MarkedText = {
  text: string
  marks: Mark[]
}

/**
 * A single Mark created from an element within a rich text field.
 */
export type Mark = {
  /** The start index of the mark. */
  start: number
  /** The end index of the mark. */
  end: number
  /** The number of descendants within the mark. */
  descendants: number
  /**
   * The metadata associated with the mark.
   */
  data: MarkData
}

export type MarkData = {
  __typename: string
}

/**
 * Visitor callback object for a post order {@link https://en.wikipedia.org/wiki/Tree_traversal#Post-order,_LRN"} tree
 * traversal of MarkedText.
 *
 * Object will contain two visitor callback functions, {@link visitText} which will be passed a string and {@link visitMark} which will be passed {@link Mark} and it's {@link children} in an array
 *
 * @param M The type that a Mark is transformed into.
 * @param T The type that text is transformed into.
 * @param N The common super type for transformed Marks and text
 */
export type MarkedTextVisitor<M extends N, T extends N, N> = {
  /**
   * Called when text is reached. Text will always be a leaf node of the tree. Implementations can transform the text
   * into an object of type {@link T} and return it. If the {@link text} has a parent Mark, the transformed text will
   * be returned as array item when the parent {@link visitMark( mark, children)} mark is visited. If null is returned, it
   * will be omitted from the result.
   *
   * @param text Nonnull.
   * @returns The transformed text.
   */
  visitText(text: string): T

  /**
   * Called when a Mark is reached. Because this is a post-order traversal, the {@link children} array contains the already
   * visited and transformed text and Mark nodes. Implementations can transform the {@link mark} and {@link children}
   * into an object of type {@link M} and return it. If the {@link mark} has a parent Mark, the transformed Mark will
   * be returned as a an array item when the parent mark is visited. If null is returned, it will be omitted from the
   * result.
   *
   * @param mark Nonnull.
   * @param children Nonnull.
   * @return The transformed Mark.
   */
  visitMark(mark: Mark, children: N[]): M
}

/** An HTML element. */
export interface HtmlElement extends MarkData {
  /** The element name. */
  name: string
  /** The element's attributes. */
  attributes: Attribute[]
}

/** An HTML attribute. */
type Attribute = {
  name: string
  value: string
}
