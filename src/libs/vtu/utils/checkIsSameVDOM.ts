import { VirtualDOM } from '../types'
import { checkIsTextNode } from './checkIsTextNode'
import shallowEqual from './shallowEquals'

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

  if (!shallowEqual(currentNode.props, futureNode.props)) {
    return false
  }

  return true
}
