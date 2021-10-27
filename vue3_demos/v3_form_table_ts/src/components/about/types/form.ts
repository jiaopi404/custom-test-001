import { FormRulesMap } from 'element-plus/lib/components/form/src/form.type'

export declare type Recordable<T = any> = Record<string, T>

// 表单值 的 类型
export type FormDataValue = string | number | number[] | string[] | Recordable[]

/**
 * FormData 类型
 */
export interface FormData {
  [propName: string]: FormDataValue
}

export type FormRules = FormRulesMap

export interface FormOptions {
  [propName: string]: Array<number>
}

export type FormInfo = {
  formData: FormData
  formRules?: FormRules
  formOptions?: FormOptions
}
