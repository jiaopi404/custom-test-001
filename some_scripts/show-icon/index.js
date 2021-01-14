const fs = require('fs');
const path = require('path');

start('icon').then(res => {
});

async function start (fileName) {
  try {
    let content = await fileReader(path.resolve(__dirname, './content/icon.scss')); // 001-list.html
    // 创建正则.icon-wand:before {content: "\e600"}
    const regexp = /.([a-z-]+)[^\r\t\n]+/g
    let regResult = regexp.exec(content);
    const iconList = []
    while (regResult) {
      iconList.push(regResult[1]);
      regResult = regexp.exec(content);
    }
    const _tmpHtml = htmlBuilder(iconList)
    await fileWriter(fileName, _tmpHtml)
  } catch (err) {
    console.log(err)
  }
}

function fileWriter (fileName, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName + '.xml', data, 'utf8', (err, result) => {
      if (err) {
        reject(err);
      }
      resolve();
    })
  })
}

function htmlBuilder (obj) {
  return obj.reduce((prev, item) => {
    return prev + `
    <div>
      <span>icon名字：${item}</span>
      <i class="${item}"></i>
    </div>`
  }, '');
}

function fileReader (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8',  (err, content) => {
      if (err) {
        reject(err);
      }
      resolve(content);
    });
  })
}
