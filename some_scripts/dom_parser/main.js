const DomParser = require('dom-parser');
const fs = require('fs');

const parser = new DomParser();

start('001-list').then(res => {
  console.log('good is: ')
});

async function start (fileName) {
  try {
    let result = await getResult('./html-files/' + fileName + '.html'); // 001-list.html
    // 处理右边class
    result = result.map(item => {
      item.right.className = item.right.className.split(' ').filter(innerItem => innerItem !== 'common-list__list-item__left').join(' ');
      return item
    });
    const _tmpHtml = htmlBuilder(result)
    await fileWriter(fileName, _tmpHtml)
  } catch (err) {
    console.log(err)
  }
}

function fileWriter (fileName, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile('./html-files/' + fileName + '-output.html', data, 'utf8', (err, result) => {
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
    <comp-info-item-collapse
      label="${item.left.label}"
    >
      <text slot="content1"${item.right.event ? ` @click="${item.right.event}"` : ''}${item.right.className ? ` class="${item.right.className}"` : ''}>${item.right.content}</text>
      <text slot="content2"${item.right.event ? ` @click="${item.right.event}"` : ''}${item.right.className ? ` class="${item.right.className}"` : ''}>${item.right.content}</text>
    </comp-info-item-collapse>`
  }, '');
}

function getResult (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path,'utf8',  (err, html) => {
      if (err) {
        reject(err);
      }
      const dom = parser.parseFromString(html);
      const result = getContentFromDom(dom);
      resolve(result);
    });
  })
}

function getContentFromDom (dom) {
  const listItems = dom.getElementsByClassName('common-list__list-item');
  return listItems.map(_listItem => {
    const _item = {};
    _listItem.childNodes.forEach(node => {
      if (node.nodeType !== 1) {
        return;
      }
      if (node.getAttribute('class') === 'common-list__list-item__left') { // 左边
        _item.left = {};
        _item.left.label = node.innerHTML;
        return
      }
      if (/common-list__list-item__right/.test(node.getAttribute('class'))) { // 右边
        _item.right = {};
        _item.right.className = node.getAttribute('class');
        _item.right.event = node.getAttribute('name') || '';
        _item.right.content = node.innerHTML;
        return
      }
      _item.others = _item.others || [];
      _item.others.push({
        className: node.getAttribute('class'),
        event: node.getAttribute('name'),
        content: node.innerHTML
      })
    });
    return _item;
  });
}
