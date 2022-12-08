import MarkNode from './MarkNode'
import { Mark, MarkedText, MarkedTextVisitor } from './types'
/**
 * A post-order tree traversal algorithm executed against {@link MarkedText} using {@link MarkedTextVisitor}
 * for callbacks.
 */
export default class MarkedTextPostOrderTraversal<M extends N, T extends N, N> {
  constructor(
    private markedText: MarkedText,
    private visitor: MarkedTextVisitor<M, T, N>
  ) {}

  /**
   * Performs a post-order traversal of MarkedText, using a MarkedTextVisitor function to issue callbacks, and returns
   * an array of transformed root nodes.
   */
  traverse() {
    return this.traversePostOrder(this.rebuildTree())
  }

  /** Rebuilds tree for traversal */
  rebuildTree(): MarkNode {
    const { markedText } = this

    const root: MarkNode = new MarkNode(markedText, null, 0)

    const markNodes: MarkNode[] = []

    markNodes.push(root)

    const marks = markedText.marks

    marks.forEach((mark: Mark, index) => {
      markNodes.push(new MarkNode(markedText, mark, ++index))
    })

    markNodes.forEach((markNode: MarkNode) => {
      markNode.getChildren().push(...this.findChildren(markNode, markNodes))
    })

    return root
  }

  traversePostOrder(markNode: MarkNode): N[] {
    const { markedText, visitor } = this

    let currentIndex: number = markNode.getStart()

    const output: N[] = []

    markNode.getChildren().forEach((child: MarkNode) => {
      const childStart: number = child.getStart()

      if (currentIndex < childStart) {
        const transformedText: T = visitor.visitText(
          markedText.text.substring(currentIndex, childStart)
        )

        if (transformedText) {
          output.push(transformedText)
        }
      }

      output.push(...this.traversePostOrder(child))

      currentIndex = child.getEnd()
    })

    if (currentIndex < markNode.getEnd()) {
      const transformedText: T = visitor.visitText(
        markedText.text.substring(currentIndex, markNode.getEnd())
      )

      if (transformedText) {
        output.push(transformedText)
      }
    }

    if (markNode.isRoot()) {
      return output
    } else {
      const transformedMark: M = visitor.visitMark(markNode.getMark(), output)

      if (transformedMark) {
        return [transformedMark]
      } else {
        return []
      }
    }
  }

  /** Locate descendants/children of {@link MarkNode} */
  findChildren(markNode: MarkNode, markNodes: MarkNode[]): MarkNode[] {
    const children: MarkNode[] = []

    const markIndex = markNode.getIndex()
    let markDescendantsCount = markNode.getDescendantsCount()

    let nextIndex = markIndex + 1

    while (markDescendantsCount > 0) {
      const child: MarkNode = markNodes[nextIndex]
      children.push(child)
      markDescendantsCount -= child.getDescendantsCount() + 1
      nextIndex += child.getDescendantsCount() + 1
    }

    return children
  }
}
