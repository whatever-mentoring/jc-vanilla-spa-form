import { checkIsSameVDOM } from './utils/checkIsSameVDOM'
import createDOM from './createDOM'
import { VirtualDOM } from './types'
import { checkIsTextNode } from './utils/checkIsTextNode'

export default function updateDOM(
  $parent: ChildNode,
  oldNode?: VirtualDOM,
  newNode?: VirtualDOM,
  idx = 0,
) {
  if (newNode == null) {
    if (oldNode != null) {
      $parent.removeChild($parent.childNodes[idx])
      return true
    }
    return false
  }

  if (oldNode == null) {
    $parent.appendChild(createDOM(newNode))
    return false
  }

  if (
    oldNode != null &&
    newNode != null &&
    !checkIsSameVDOM(oldNode, newNode)
  ) {
    $parent.replaceChild(createDOM(newNode), $parent.childNodes[idx])
    return false
  }

  if (!checkIsTextNode(newNode) && !checkIsTextNode(oldNode)) {
    const length = Math.max(
      newNode.children?.length ?? 0,
      oldNode.children?.length ?? 0,
    )
    let nodeDeleteCnt = 0
    for (let i = 0; i < length; i++) {
      const result = updateDOM(
        $parent?.childNodes[idx],
        oldNode.children?.[i],
        newNode.children?.[i],
        i - nodeDeleteCnt,
      )
      if (result) {
        nodeDeleteCnt++
      }
    }
  }

  return false
}
