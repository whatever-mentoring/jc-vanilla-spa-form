export interface VirtualDOMNode {
  tag: keyof HTMLElementTagNameMap
  props?: Record<string, unknown>
  children?: VirtualDOM[]
}

export type TextNode = string | number | Array<unknown> | undefined | null
export type VirtualDOM = VirtualDOMNode | TextNode

export interface DefaultProps {
  children?: VirtualDOMNode[]
}

export interface PageProps extends DefaultProps {
  pageParams?: string[]
}
