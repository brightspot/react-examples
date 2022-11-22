import {
  RteMarkedText,
  RteMarkedTextVisitor,
  RteMark,
  RteMarkedTextTraversal,
} from './types'

/**
 * Function called to create an array of {@link N} given the MarkedText and visitor implementation {@link RteMarkedTextVisitor}.
 * @param markedText - Nonnull.
 * @param visitor Nonnull.
 * @returns An array of items based on the visitor implementation
 */
const markedTextTraversal: RteMarkedTextTraversal = (markedText, visitor) => {
  const traverseOrder = new MarkedTextPostOrderTraversal(markedText, visitor)

  return traverseOrder.traverse()
}

/**
 * A post-order tree traversal algorithm executed against {@link RteMarkedText} using {@link RteMarkedTextVisitor}
 * for callbacks.
 */
class MarkedTextPostOrderTraversal<M extends N, T extends N, N> {
  constructor(
    private markedText: RteMarkedText,
    private visitor: RteMarkedTextVisitor<M, T, N>
  ) {}

  /**
   * Performs a post-order traversal of RteMarkedText, using a RteMarkedTextVisitor function to issue callbacks, and returns
   * an array of transformed root nodes.
   */
  traverse() {
    return this.traversePostOrder(this.rebuildTree())
  }

  /** Rebuilds tree for traversal */
  rebuildTree = (): MarkNode => {
    const { markedText, findChildren } = this

    const root: MarkNode = new MarkNode(markedText, null as any, 0)

    const markNodes: MarkNode[] = []

    markNodes.push(root)

    let index = 1
    const marks = markedText.marks

    marks.forEach((mark: RteMark) => {
      markNodes.push(new MarkNode(markedText, mark, index))
      index++
    })

    markNodes.forEach((markNode: MarkNode) => {
      markNode.getChildren().push(...findChildren(markNode, markNodes))
    })

    return root
  }

  traversePostOrder = (markNode: MarkNode) => {
    const { markedText, visitor, traversePostOrder } = this

    let currentIndex: number = markNode.getStart()

    const output: N[] = []

    markNode.getChildren().forEach((child: MarkNode) => {
      const childStart: number = child.getStart()

      if (currentIndex < childStart) {
        const transformedText: T = visitor.visitText(
          markedText.text.substring(currentIndex, childStart)
        )

        if (transformedText != null) {
          output.push(transformedText)
        }
      }

      output.push(...traversePostOrder(child))

      currentIndex = child.getEnd()
    })

    if (currentIndex < markNode.getEnd()) {
      const transformedText: T = visitor.visitText(
        markedText.text.substring(currentIndex, markNode.getEnd())
      )

      if (transformedText != null) {
        output.push(transformedText)
      }
    }

    if (markNode.isRoot()) {
      return output
    } else {
      const transformedMark: M = visitor.visitMark(markNode.getMark(), output)

      if (transformedMark != null) {
        return [transformedMark]
      } else {
        return []
      }
    }
  }

  /** Locate descendants/children of {@link MarkNode} */
  findChildren = (markNode: MarkNode, markNodes: MarkNode[]): MarkNode[] => {
    const children: MarkNode[] = []

    const markIndex = markNode.getIndex()
    let markDescendants = markNode.getDescendants()

    let nextIndex = markIndex + 1

    while (markDescendants > 0) {
      const child: MarkNode = markNodes[nextIndex]
      children.push(child)
      markDescendants -= child.getDescendants() + 1
      nextIndex += child.getDescendants() + 1
    }

    return children
  }
}

/** Converted {@link RteMark} */
class MarkNode {
  constructor(
    private markedText: RteMarkedText,
    private mark: RteMark,
    private index: number,
    private children: MarkNode[] = []
  ) {}

  getMark(): RteMark {
    return this.mark
  }

  getIndex(): number {
    return this.index
  }

  getStart(): number {
    return this.mark != null ? this.mark.start : 0
  }

  getEnd(): number {
    return this.mark != null ? this.mark.end : this.markedText.text.length
  }

  getDescendants(): number {
    return this.mark != null
      ? this.mark.descendants
      : this.markedText.marks.length
  }

  getChildren(): MarkNode[] {
    return this.children
  }

  isRoot(): boolean {
    return this.mark == null
  }
}

export { markedTextTraversal }
