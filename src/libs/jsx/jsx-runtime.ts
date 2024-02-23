import { DefaultProps, VirtualDOMNode } from '../vtu/types'

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-namespace */
declare global {
  module JSX {
    type IntrinsicElements = {
      [elemName in keyof HTMLElementTagNameMap]: Record<string, unknown>
    }
    interface Element {
      tag: keyof HTMLElementTagNameMap
      props: Record<string, unknown>
      children: VirtualDOMNode[]
    }
  }
}

export type Component<T extends DefaultProps = DefaultProps> = (
  props: T,
) => JSX.Element

export const jsx = {
  toVDOM(
    component: string | Component,
    props: Record<string, unknown> | null,
    ...children: VirtualDOMNode[]
  ) {
    if (typeof component === 'function') {
      return component({ ...props, children })
    }
    return {
      tag: component,
      props,
      children: children.flat(Infinity),
    }
  },
}
