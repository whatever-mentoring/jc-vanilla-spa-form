import { DefaultProps, VirtualDOM, VirtualNode } from '../vtu/types'

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-namespace */
declare global {
  module JSX {
    type IntrinsicElements = {
      [elemName in keyof HTMLElementTagNameMap]: Record<string, unknown>
    }
    type Element = VirtualDOM | null | undefined
  }
}

export type Component<T extends DefaultProps = DefaultProps> = (
  props: T,
) => JSX.Element

export const jsx = {
  toVDOM(
    component: keyof HTMLElementTagNameMap | Component,
    props: Record<string, unknown> | null,
    ...children: (VirtualDOM | VirtualNode)[]
  ): JSX.Element {
    if (typeof component === 'function') {
      return component({ ...props, children })
    }

    return {
      node: {
        tag: component,
        props,
        children: children.flat(Infinity).map((v) => {
          if (!checkIsVirtualNode(v as VirtualDOM | VirtualNode)) {
            return { node: v } as VirtualDOM
          }
          return v
        }) as VirtualDOM[],
      },
    }
  },
}

const checkIsVirtualNode = (
  obj: VirtualDOM | VirtualNode,
): obj is VirtualDOM => {
  if (Array.isArray(obj)) {
    return false
  }
  if (typeof obj === 'object' && obj != null && 'node' in obj) {
    return true
  }

  return false
}
