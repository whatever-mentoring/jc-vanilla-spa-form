import { checkIsSameVDOM } from './utils/checkIsSameVDOM'
import createDOM from './createDOM'
import { VirtualDOM } from './types'
import { checkIsTextNode } from './utils/checkIsTextNode'

export default function updateDOM(
  $parent: ChildNode,
  oldVDOM?: VirtualDOM,
  newVDOM?: VirtualDOM,
  idx = 0,
) {
  if (newVDOM == undefined) {
    if (oldVDOM != undefined) {
      $parent.removeChild($parent.childNodes[idx])
      return true
    }
    return false
  }

  if (oldVDOM == undefined) {
    $parent.appendChild(createDOM(newVDOM))
    return false
  }

  if (!checkIsSameVDOM(oldVDOM, newVDOM)) {
    $parent.replaceChild(createDOM(newVDOM), $parent.childNodes[idx])
    return false
  }

  const { node: newNode } = newVDOM
  const { node: oldNode } = oldVDOM
  if (!checkIsTextNode(newNode) && !checkIsTextNode(oldNode)) {
    const length = Math.max(
      newNode.children?.length ?? 0,
      oldNode.children?.length ?? 0,
    )
    let nodeDeleteCnt = 0
    for (let i = 0; i < length; i++) {
      const isNodeDeleted = updateDOM(
        $parent?.childNodes[idx],
        oldNode.children?.[i],
        newNode.children?.[i],
        i - nodeDeleteCnt,
      )
      if (isNodeDeleted) {
        nodeDeleteCnt++
      }
    }
  }

  return false
}
