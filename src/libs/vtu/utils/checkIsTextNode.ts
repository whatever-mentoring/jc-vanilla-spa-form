import { VirtualDOM, TextNode } from '../types'

export const checkIsTextNode = (element: VirtualDOM): element is TextNode => {
  if (Array.isArray(element)) {
    return true
  }

  if (typeof element === 'object' && element != null && element.tag) {
    return false
  }

  return true
}
