import _ from 'lodash'
import { checkIsTextNode } from './utils/checkIsTextNode'
import { VirtualDOM } from './types'

const createDOM = (node: VirtualDOM): HTMLElement | Text => {
  if (checkIsTextNode(node)) {
    if (typeof node === 'object') {
      return document.createTextNode(JSON.stringify(node))
    }
    return document.createTextNode(node.toString())
  }

  const element = document.createElement(node.tag)

  if (node.props) {
    for (const key in node.props) {
      if (key.startsWith('data-')) {
        const dataKey = _.camelCase(key.slice(5))
        element.dataset[dataKey] = node.props[key] as string
      } else {
        ;(element as any)[key] = node.props[key]
      }
    }
  }

  node.children?.forEach((child) => {
    element.append(createDOM(child))
  })

  return element
}

export default createDOM
