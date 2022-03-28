var maxConsecutiveAnswers = function (answerKey, k) {
  // special assues
  if (answerKey.length === 1) {
    return 1;
  }

  const T = 'T'
  const F = 'F'

  let K = k;

  // slippy window
  let start = 0;
  let end = 0;

  let changePoint = 0;

  let result = 1;
  while (start < answerKey.length) {
    // 再来一个终结条件
    if (answerKey.length - start <= result) {
      break;
    }
    const startChar = answerKey[start];

    let ifChange = false;
    while (end < answerKey.length) {
      end++;
      if (end === answerKey.length) {
        result = Math.max(end - start, result);
        // console.log(answerKey.substring(start, end), '1')
        break;
      }
      const nextChar = answerKey[end];
      if (nextChar === startChar) {
        continue;
      }
      if (!ifChange) {
        ifChange = true;
        changePoint = end;
      }
      if (!K) {
        result = Math.max(end - start, result);
        // console.log(answerKey.substring(start, end), '2')
        break;
      } else {
        K--;
      }
    }
    end = start;
    K = k - 1;
    while (end < answerKey.length) {
      end++;
      if (end === answerKey.length) {
        result = Math.max(end - start, result);
        // console.log(answerKey.substring(start, end), '3')
        break;
      }
      const nextChar = answerKey[end];
      if (nextChar === startChar) {
        if (!K || K === -1) {
          result = Math.max(end - start, result);
          // console.log(answerKey.substring(start, end), '4')
          break;
        } else {
          K--;
        }
      }
      if (!ifChange) {
        ifChange = true;
        changePoint = end;
      }
    }

    // start = changePoint ? changePoint : answerKey.length;
    start += result;
    end = start;

    K = k;

    changePoint = 0;
  }
  return result;
};

// // console.log(maxConsecutiveAnswers('TTFF', 2));
// // console.log(maxConsecutiveAnswers('TFFT', 1));
// // console.log(maxConsecutiveAnswers('TTFTTFTT', 1));
// console.log(maxConsecutiveAnswers('FFFTTFTTFT', 3));