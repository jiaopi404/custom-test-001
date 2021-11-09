import LxBasicQueryInput from '/@/components/LianXingBasic/src/LxBasicQuery/LxBasicQueryItem/LxBasicQueryInput.vue'
import LxBasicQuerySelect from '/@/components/LianXingBasic/src/LxBasicQuery/LxBasicQueryItem/LxBasicQuerySelect.vue'

export const LxBasicQueryComps = {
  LxBasicQueryInput, // 输入框
  LxBasicQuerySelect, // 下拉框
}

export enum QueryItemCompEnum {
  INPUT = 'LxBasicQueryInput',
  SELECT = 'LxBasicQuerySelect'
}

export default {
  ...LxBasicQueryComps
}
