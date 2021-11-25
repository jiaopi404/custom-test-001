interface QueryAndResultI {
  uuid: string;
  params: Omit<HqlQueryDtoI, "localPaginationUuid">;
  result: any[];
}
const cacheQueryAndResult: QueryAndResultI[] = [];
/**
 * 本地分页逻辑：
 * 1. 如果单纯切换分页，不进行重新获取，获取缓存的值
 * 2. 如果查询条件改变，进行重新获取
 * @param params 查询参数
 * @param api 请求的 api
 * @returns {localPaginationApi}
 */
export const useLxLocalPagination = (
  params: HqlQueryDtoI,
  api: (...args) => Promise<any>
) => {
  async function localPaginationApi() {
    if (!params.localPaginationUuid) {
      // 非本地分页
      return await api(params);
    }
    // 以下 本地分页
    const _uuid = params.localPaginationUuid;
    const _cachedId = cacheQueryAndResult.findIndex(
      (item) => item.uuid === _uuid
    );
    const _params = omit(params, "localPaginationUuid");
    if (_cachedId === -1) {
      // 表示第一次
      const _result = await api(_params);
      cacheQueryAndResult.push({
        uuid: _uuid,
        params: _params,
        result: _result,
      });
      return _result;
    } else {
      // 非第一次，看是否需要重新获取接口
      const { params: cachedParams, result: cachedResult } =
        cacheQueryAndResult[_cachedId];
      // 比较 params 和 cachedParams
      if (
        isEqual(
          omit(_params.hqlPageAndSortSumDto, "page"),
          omit(cachedParams.hqlPageAndSortSumDto, "page")
        )
      ) {
        // 表明是在切换分页，不重新获取数据
        return cachedResult;
      } else {
        // 表示重新请求
        const _result = await api(_params);
        // cacheQueryAndResult.push({
        //   uuid: _uuid,
        //   params: _params,
        //   result: _result,
        // });
        cacheQueryAndResult[_cachedId].params = _params;
        cacheQueryAndResult[_cachedId].result = _result;
        return _result;
      }
    }
  }
  return {
    localPaginationApi,
  };
};
