import { MarkedText, Mark, VisitMark } from './types'

const markedText = (markedText: MarkedText, visitMark: VisitMark) => {
  let postOrder = new MarkedTextPostOrderTraversal(markedText, visitMark)

  return postOrder.traverse()
}

// const visitMark = (mark: Mark | null, children: Array<String>): String => {
//   if (mark === null) return ''
//   let builder = ''
//   builder += buildMarkStart(mark)
//   children.forEach((child) => {
//     builder += child
//   })
//   builder += buildMarkEnd(mark)
//   return builder
// }

// const buildMarkStart = (mark: Mark): String => `<${mark.name}>`

// const buildMarkEnd = (mark: Mark): String => `</${mark.name}>`

class MarkedTextPostOrderTraversal {
  markedText: MarkedText
  visitor: VisitMark

  constructor(markedText: MarkedText, visitor: VisitMark) {
    this.markedText = markedText
    this.visitor = visitor
  }

  traverse() {
    return this.traversePostOrder(this.rebuildTree())
  }

  rebuildTree = (): MarkNode => {
    let root: MarkNode = new MarkNode(this.markedText, null, 0)

    let markNodes: Array<MarkNode> = []

    markNodes.push(root)

    let index: number = 1
    let marks = this.markedText.marks

    marks.forEach((mark: Mark) => {
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
      let transformedMark = this.visitor(markNode.getMark(), output)

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
  mark: Mark | null
  index: number
  children: Array<MarkNode>
  markedText: MarkedText

  constructor(
    markedText: MarkedText,
    mark: Mark | null = null,
    index: number,
    children: Array<MarkNode> = []
  ) {
    this.mark = mark
    this.index = index
    this.children = children
    this.markedText = markedText
  }

  getMark(): Mark | null {
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