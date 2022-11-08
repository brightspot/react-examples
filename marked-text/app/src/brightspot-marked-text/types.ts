/** MarkedText created from a rich text field. */
export interface RteMarkedText {
  text: string
  marks: RteMark[]
}

/**
 * A single Mark created from an element within a rich text field.
 */
export interface RteMark {
  /** The start index of the mark. */
  start: number
  /** The end index of the mark. */
  end: number
  /** The number of descendants within the mark. */
  descendants: number
  /**
   * The metadata associated with the mark.
   */
  data: RteMarkData
}

export interface RteMarkData {
  __typename: string
}

/** An HTML element. */
export interface RteHtmlElement extends RteMarkData {
  /** The element name. */
  name: string
  /** The element's attributes. */
  attributes: Attribute[]
}

/** An HTML attribute. */
interface Attribute {
  name: string
  value: string
}

/** Object containing two visitor callback functions, {@link visitText} which will accept a string and {@link visitMark} which takes in two arguments, {@link RteMark} and it's children in an array */
export interface RteMarkedTextVisitor<M extends N, T extends N, N> {
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
  visitMark(mark: RteMark, children: N[]): M
}

/**
 * Function called to create an array of {@link N} given the MarkedText and visitor implementation {@link RteMarkedTextVisitor}.
 * @param markedText - Nonnull.
 * @param visitor Nonnull.
 * @returns An array of items based on the visitor implementation
 */
export interface RteMarkedTextTraversal {
  <M extends N, T extends N, N>(
    /** MarkedText created from a rich text field. */
    markedText: RteMarkedText,
    /** Object containing two visitor callback functions, {@link visitText} which will accept a string and {@link visitMark} which takes in two arguments, {@link RteMark} and it's children in an array */
    visitor: RteMarkedTextVisitor<M, T, N>
  ): N[]
}
