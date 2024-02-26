import { VirtualDOM, TextNode } from '../types'

export function checkIsTextNode(element: VirtualDOM): element is TextNode {
  if (Array.isArray(element)) {
    return true
  }

  if (typeof element === 'object' && element != null && element.tag) {
    return false
  }

  return true
}
