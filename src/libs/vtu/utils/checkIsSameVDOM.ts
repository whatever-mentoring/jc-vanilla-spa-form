import { VirtualDOM } from '../types'
import { checkIsTextNode } from './checkIsTextNode'
import shallowEqual from './shallowEquals'

export function checkIsSameVDOM(current: VirtualDOM, future: VirtualDOM) {
  if (checkIsTextNode(current)) {
    if (checkIsTextNode(future)) {
      return current === future
    }

    return false
  }

  if (checkIsTextNode(future)) {
    return false
  }

  if (current.tag !== future.tag) {
    return false
  }

  if (!shallowEqual(current.props, future.props)) {
    return false
  }

  return true
}
