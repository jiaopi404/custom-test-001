window.onload = function () {
  const { start, stop } = useBarcodeScanner(async (code) => {
    console.log('hello code:');
    console.log(code);
    alert('扫描到了！')

    // const { getIfValidApproval, getRmbData } = useScanApprovalHelper(code);
    // const ifValid = await getIfValidApproval();
    // if (!ifValid) {
    //   alert('不是预算审批单');
    //   console.log('rmb data: ', getRmbData());
    // }
    // const rmbData = getRmbData();

    const { getIfValidInvoice, getInvoiceInfo } = useScanInvoiceHelper(code);
    if (!getIfValidInvoice()) {
      alert('不识别的发票');
      return;
    }
    const invoiceInfo = getInvoiceInfo()
    console.log('invoice info: ', getInvoiceInfo())
    alert(`发票类型：${invoiceInfo.invoiceType}，发票号码：${invoiceInfo.invoiceCode}！`)
  });

  document.querySelector('#start-btn').addEventListener('click', () => {
    start();
  })
  document.querySelector('#stop-btn').addEventListener('click', () => {
    stop();
  })
}