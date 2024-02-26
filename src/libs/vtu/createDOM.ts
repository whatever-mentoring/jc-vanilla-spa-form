import _ from 'lodash'
import { checkIsTextNode } from './utils/checkIsTextNode'
import { VirtualDOM } from './types'

const createDOM = (VDOM: VirtualDOM): HTMLElement | Text => {
  const { node } = VDOM

  if (checkIsTextNode(node)) {
    if (Array.isArray(node)) {
      return document.createTextNode(node.toString())
    }
    if (typeof node === 'object' && node !== null) {
      return document.createTextNode(JSON.stringify(node))
    }
    return document.createTextNode(node ? node.toString() : '')
  }

  const element = document.createElement(node.tag)

  if (node.props) {
    for (const key in node.props) {
      if (key.startsWith('data-')) {
        const dataKey = _.camelCase(key.slice(5))
        element.dataset[dataKey] = node.props[key] as string
        continue
      }

      if (key.startsWith('on') || key === 'className' || key === 'checked') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-extra-semi
        ;(element as any)[key] = node.props[key]
        continue
      }

      element.setAttribute(key, node.props[key] as string)
    }
  }

  node.children?.forEach((child) => {
    if (child) {
      element.append(createDOM(child))
    }
  })

  return element
}

export default createDOM
