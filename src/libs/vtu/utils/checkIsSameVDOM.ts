import { VirtualDOM } from '../types'
import { checkIsTextNode } from './checkIsTextNode'

export function checkIsSameVDOM(current: VirtualDOM, future: VirtualDOM) {
  const { node: currentNode } = current
  const { node: futureNode } = future

  if (checkIsTextNode(currentNode)) {
    if (checkIsTextNode(futureNode)) {
      return currentNode === futureNode
    }

    return false
  }

  if (checkIsTextNode(futureNode)) {
    return false
  }

  if (currentNode.tag !== futureNode.tag) {
    return false
  }

  return true
}
