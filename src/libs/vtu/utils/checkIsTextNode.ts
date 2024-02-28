import { TextNode, VirtualNode } from '../types'

export function checkIsTextNode(element?: VirtualNode): element is TextNode {
  if (Array.isArray(element)) {
    return true
  }

  if (typeof element === 'object' && element !== null && element.tag) {
    return false
  }

  return true
}
