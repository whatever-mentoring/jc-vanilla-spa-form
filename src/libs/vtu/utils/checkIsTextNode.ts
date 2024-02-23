import { VirtualDOM, TextNode } from '../types'

export const checkIsTextNode = (element: VirtualDOM): element is TextNode => {
  if (Array.isArray(element)) {
    return true
  }

  if (
    typeof element === 'string' ||
    typeof element === 'number' ||
    typeof element === 'undefined' ||
    (typeof element === 'object' && element == null)
  ) {
    return true
  }

  if (!element.tag) {
    return true
  }

  return false
}
