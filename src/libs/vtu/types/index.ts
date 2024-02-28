export interface IVirtualDOM {
  tag: keyof HTMLElementTagNameMap
  props: Record<string, unknown> | null
  children?: VirtualDOM[]
}

export type TextNode = string | number | Array<unknown> | undefined | null
export type VirtualNode = IVirtualDOM | TextNode
export type VirtualDOM = {
  node: VirtualNode
}
export interface DefaultProps {
  children?: (VirtualDOM | VirtualNode)[]
}

export interface PageProps extends DefaultProps {
  pageParams?: string[]
}
