const useScanApprovalHelper = (str) => {
  let rmbData = null;

  const getIfValidApproval = async () => {
    const pattern = /rpx=\S+?ids=([0-9]+)/g;

    const result = pattern.exec(str)

    if (!result) {
      return Promise.reject(false)
    }

    const rmbId = result[1];
    // TODO: 获取 rmb 对象，进行业务验证
    rmbData = rmbId;
    return Promise.resolve(true);
  }

  // https://api.joriving.com/report/mobileJsp/mbReport.jsp?rpx=rmbReimburse/rmbReimburse.rpx&ids=82


  const getRmbData = () => {
    return rmbData;
  }

  return {
    getIfValidApproval,
    getRmbData,
  }
}