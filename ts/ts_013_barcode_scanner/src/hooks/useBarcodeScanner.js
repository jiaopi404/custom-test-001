const BARCODE_SCANNER_GAP_TIME = 30; // 单位 毫秒

const useBarcodeScanner = (cb) => {
  let callback = cb || (() => { }); // callback

  let _isRunning = false;

  let lastTime, nextTime;

  let lastCode, nextCode;
  let code = '';

  function keydownHandler (e) {
    // console.log('code is: ', e);
    nextCode = e.keyCode;

    if (nextCode === 16 || nextCode === 18) {
      // shift alt 跳过
      return;
    }

    if (nextCode === 13) {
      // enter 事件
      if (code.length < 3) {
        // 手动输入的事件不会让code的长度大于2
        return;
      }

      callback(code); // 做别的操作

      // 结束
      code = '';
      lastCode = '';
      lastTime = '';
      return;
    }

    nextTime = +new Date();
    if (!lastTime && !lastCode) {
      // 上次记录时间 和 按键为 空
      code += e.key;
    }

    if (lastCode && lastTime) {
      if (nextTime - lastTime > BARCODE_SCANNER_GAP_TIME) {
        // 说明是用户输入或者是第一位，重置为第一位
        code = e.key;
      } else {
        code += e.key;
      }
    }

    lastCode = nextCode;
    lastTime = nextTime;
  }

  const start = () => {
    if (_isRunning) {
      return;
    }
    document.addEventListener('keydown', keydownHandler)
    _isRunning = true;
  };

  const stop = () => {
    document.removeEventListener('keydown', keydownHandler)
    _isRunning = false;
  };

  return {
    start,
    stop
  }
}

