function pathPraser() {
  // console.log("document: ", document.location);
  const queryData = getQueryStrings();
  const res = fileInfoGetter(queryData);
  return res;
}

function getQueryStrings() {
  var data = {};
  var parameter =
    window.location.search.length > 0 ? window.location.search.substring(1) : 0;
  if (parameter != 0) {
    var arg = parameter.split("&");
    for (var i = 0; i < arg.length; i++) {
      var name = decodeURIComponent(arg[i].split("=")[0]);
      var value = decodeURIComponent(arg[i].split("=")[1]);
      data[name] = value;
    }
  } else {
    data = null;
  }
  return data;
}

function fileInfoGetter(queryData) {
  // const extPattern = //
  const res = {
    url: "", // url
    key: "", // 根据 url 中的文件名获取 md5 加密的 key
    fileType: "", // 判断那种文件
    documentType: "", // word, cell, slide
    title: "",
  };
  let realFileName;
  let extName;
  // url
  if (queryData.url) {
    res.url = queryData.url;
    // realFileName
    const realFilePattern = /([a-zA-Z0-9]+(\.[a-zA-Z0-9]+))$/;
    const realFileMatchResult = res.url.match(realFilePattern);
    if (realFileMatchResult) {
      realFileName = realFileMatchResult[1];
      extName = realFileMatchResult[2];
      // key
      res.key = md5(realFileName);
      // fileType and documentType
      const documentTypeAndFileType = getDocumentTypeAndFileType(extName);
      res.fileType = documentTypeAndFileType
        ? documentTypeAndFileType.fileType
        : "";
      res.documentType = documentTypeAndFileType
        ? documentTypeAndFileType.documentType
        : "";
    }
  }
  // title: fileName
  if (queryData.fileName) {
    res.title = queryData.fileName || realFileName || "文件名称";
  }
  // documentType and fileType
  return res;
}

/**
 * 根据拓展名获取 fileType 和 documentType
 * @param {*} ext
 * @returns
 */
function getDocumentTypeAndFileType(ext) {
  // let fileType;
  // let documentType;

  const documentTypeMap = {
    word: [".doc", ".docx", ".pdf"], // 还支持 pdf html txt 等
    cell: [".xls", ".xlsx"],
    slide: [".ppt", ".pptx"],
  };

  for (let key in documentTypeMap) {
    const extList = documentTypeMap[key];
    if (extList.indexOf(ext) > -1) {
      const fileType = ext.substring(1);
      const documentType = key;
      return {
        fileType,
        documentType,
      };
    }
  }
  return null;
}
