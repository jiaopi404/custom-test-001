import { defHttp } from '/@/utils/http/axios';

enum Api {
  TREE_OPTIONS_LIST = '/tree/getDemoOptions',
  TEST_GET_TREE = ''
}

/**
 * @description: Get sample options value
 */
export const treeOptionsListApi = (params?: Recordable) =>
  defHttp.get<Recordable[]>({ url: Api.TREE_OPTIONS_LIST, params });

export const getTreeList = () =>
  defHttp.post<Recordable[]>({ url: '/budget/dep/getDepTreeList', data: 1 }, { isReturnNativeResponse: true })
