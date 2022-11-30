import MarkedTextPostOrderTraversal from './MarkedTextPostOrderTraversal'
import { MarkedText, MarkedTextVisitor } from './types'

/**
 * Function called to create an array of {@link N} given the MarkedText and visitor implementation {@link MarkedTextVisitor}.
 * @param markedText - Nonnull.
 * @param visitor Nonnull.
 * @returns An array of items based on the visitor implementation
 */
export function markedTextTraversal<M extends T, T extends N, N>(
  text: MarkedText,
  visitor: MarkedTextVisitor<M, T, N>
): N[] {
  return new MarkedTextPostOrderTraversal(text, visitor).traverse()
}
