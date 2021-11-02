import { Recordable } from '@/components/about/types/form'

/**
 * 组件名字的 枚举
 */
export enum BasicTableColumnComp {
  TableColumnAnchor = 'TableColumnAnchor',
  TableColumnPlainText = 'TableColumnPlainText'
}

/**
 * 列组件的事件
 */
export enum BasicTableColumnEvent {
  ANCHOR_CLICK = 'anchor-click' // anchor 组件点击
}

/**
 * 列的配置属性
 */
export type BasicTableColumnProps = {
  title: string
  prop: string
  width?: string | undefined // 与 minWidth 异或关系
  minWidth?: string | undefined
  component: BasicTableColumnComp
  compProps?: Recordable
  sort?: boolean
  realProp?: symbol
  formatter?(value: any): any
  fixed?: boolean
}

/**
 * 传入表格的 column 配置
 */
export type BasicTableColumn = {
  column: BasicTableColumnProps,
  config?: BasicTableColumnProps
}
