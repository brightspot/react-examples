import { Mark, MarkedText } from './types'

/** Converted {@link Mark} */
export default class MarkNode {
  constructor(
    private markedText: MarkedText,
    private mark: Mark,
    private index: number,
    private children: MarkNode[] = []
  ) {}

  getMark(): Mark {
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

  getDescendantsCount(): number {
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
