import {
  MarkedText,
  MarkedTextFunction,
  Mark,
  RichTextMark,
  VisitMark,
} from './types'

const markedText: MarkedTextFunction = (markedText, visitMark) => {
  let traverseOrder

  traverseOrder = new MarkedTextPostOrderTraversal(markedText, visitMark)

  return traverseOrder.traverse()
}

/**
 * A post-order tree traversal algorithm executed against {@link MarkedText} using a {@link VisitMark}
 * for callbacks.
 */
class MarkedTextPostOrderTraversal {
  /**
   * Creates a new post order traversal algorithm for the given MarkedText and Visitor implementation.
   *
   * @param markedText
   * @param visitor
   */
  constructor(public markedText: MarkedText, public visitor: VisitMark) {}

  /**
   * Performs a post-order traversal of MarkedText, using a Visitor function to issue callbacks, and returns
   * a List of transformed root nodes.
   */
  traverse() {
    return this.traversePostOrder(this.rebuildTree())
  }

  rebuildTree = (): MarkNode => {
    let root: MarkNode = new MarkNode(this.markedText, null, 0)

    let markNodes: Array<MarkNode> = []

    markNodes.push(root)

    let index: number = 1
    let marks = this.markedText.marks

    marks.forEach((mark: Mark | RichTextMark) => {
      markNodes.push(new MarkNode(this.markedText, mark, index))
      index++
    })

    markNodes.forEach((markNode: MarkNode) => {
      markNode.getChildren().push(...this.findChildren(markNode, markNodes))
    })

    return root
  }

  traversePostOrder = (markNode: MarkNode) => {
    let currentIndex: number = markNode.getStart()

    let output: any = []

    markNode.getChildren().forEach((child: MarkNode) => {
      let childStart: number = child.getStart()

      if (currentIndex < childStart) {
        output.push(this.markedText.text.substring(currentIndex, childStart))
      }
      // This is where the post order is being created.
      output.push(...this.traversePostOrder(child))

      currentIndex = child.getEnd()
    })

    if (currentIndex < markNode.getEnd()) {
      output.push(
        this.markedText.text.substring(currentIndex, markNode.getEnd())
      )
    }

    if (markNode.isRoot()) {
      return output
    } else {
      let transformedMark = this.visitor(
        markNode.getMark(),
        output,
        markNode.getIndex()
      )

      if (transformedMark != null) {
        return [transformedMark]
      } else {
        return []
      }
    }
  }

  findChildren = (
    markNode: MarkNode,
    markNodes: Array<MarkNode>
  ): Array<MarkNode> => {
    let children: Array<MarkNode> = []

    let markIndex = markNode.getIndex()
    let markDescendants = markNode.getDescendants()

    let nextIndex = markIndex + 1

    while (markDescendants > 0) {
      let child: MarkNode = markNodes[nextIndex]
      children.push(child)
      markDescendants -= child.getDescendants() + 1
      nextIndex += child.getDescendants() + 1
    }

    return children
  }
}

class MarkNode {
  constructor(
    public markedText: MarkedText,
    public mark: Mark | RichTextMark | null = null,
    public index: number,
    public children: Array<MarkNode> = []
  ) {}

  getMark(): Mark | RichTextMark | null {
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

  getChildren(): Array<MarkNode> {
    return this.children
  }

  isRoot(): boolean {
    return this.mark == null
  }
}

export { markedText }
