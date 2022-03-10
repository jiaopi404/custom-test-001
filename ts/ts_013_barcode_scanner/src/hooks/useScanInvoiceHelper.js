const invoicePattenMap = new Map();

function defaultPostProcessor (result) {
  return result[1]; // 返回第一个匹配组
}

function airTicketPostProcessor (result) {
  return result[1] + result[2];
}

// invoicePattenMap.set('定额发票', /a/); // 识别不到
// invoicePattenMap.set('出租车发票', /a/); // 出租车汽车看能否区分
invoicePattenMap.set('汽车票', { pattern: /^[0-9\[\]]+\*[0-9]+\*[0-9-]+\*[0-9]+\*[0-9]+?([0-9]{8})\*[0-9-]+\*[0-9-]+$/, postProcessor: defaultPostProcessor });
invoicePattenMap.set('火车票', { pattern: /^[0-9]{2}([0-9]{6})[0-9]{100,}$/, postProcessor: defaultPostProcessor });
invoicePattenMap.set('行程单', { pattern: /^([0-9]{10}) ([0-9])$/, postProcessor: airTicketPostProcessor });
invoicePattenMap.set('增值税发票', { pattern: /^\d{2},\d{2},\d{12},(\d{8}),[0-9.]+,\d{8},\d+,?([A-Z0-9]+)?,?$/, postProcessor: defaultPostProcessor });
// 要不要加个类型 中央非税收入统一票据
invoicePattenMap.set('中央非税收入统一票据', { pattern: /^[A-Za-z0-9-]{8},[0-9.]+,[0-9]+,([0-9]+),[0-9a-zA-Z]+,\S+?,\S+$/, postProcessor: defaultPostProcessor });

// 增值税
// 01,10,012002000511,50882910,98.92,20210611,09381683543665015560,3455,
// 01,10,053002000111,43015774,11.46,20210601,62617612421049856846,6ECA,
// 01,10,061002001111,56771062,149.56,20200727,03686002923663481834,AB09,
// 01,10,021021900111,13247931,21.19,20200508,81377003612894115313,FA2E,
// 01,10,061002001211,98764863,989.11,20210416,67957175862824766569,83E1,
// 01,10,061001901211,80057927,37.42,20210608,60959125523664096777,7395
// 01,10,061001901211,80061189,37.44,20210608,53388419880423283039,1E09
// 01,10,061001901211,35620652,40.00,20210608,53633291764158113285,E601
// 01,10,061002001111,61416165,83.10,20210608,07067742697457466680,7160,
// 01,10,061002001111,61416166,112.50,20210608,00443872348951474212,DE6E,
// 01,10,063001900111,11260135,60.00,20210608,79990236182188870425,38E7
// 01,10,061001901211,81108418,27.84,20210608,56704645341677383067,F91F
// 01,10,061001901211,80061596,39.00,20210608,57710180441666726262,09AD
// 01,10,037002000211,99315047,78.00,20210608,49664895051380254168,5CD8
// 01,10,061001605111,60789035,54.00,20210608,04086270191081591718,6E26,
// 01,10,061002001311,16064207,170.20,20210608,11275774227764043598,02A1,
// 01,10,061001901211,35620651,40.00,20210608,61118428240895537387,C7C5
// 01,10,063001900111,11457606,60.20,20210608,46502880981582586961,4DBE
// 01,10,034052000111,04205879,74.84,20210608,81042376372749863395,84DE,
// 01,10,061001901111,70528322,96.30,20210608,00008488216586704986
// 01,10,061001901211,57704009,814.00,20210608,14312830644941671245
// 01,10,021021900111,13247931,21.19,20200508,81377003612894115313,FA2E,
// 01,10,053002000111,(43015774),11.46,20210601,62617612421049856846,6ECA,



// 中央非税收入统一票据
// CZ-EI-00,1.1.0,00010120,0022571656,d951b9,20211220,90.00

// 火车票
// 000189931503886654508946908913424353701818063770159011146216875006418473122594733941628339815299275921117977220611526371205057096079207215825529
// 000189931503886654508946908913424353701818063770159011146216875006418473122594733941628339815299275921117977220611526371205057096079207215825529
// 020479880634908485676605739556384023238977303490615835975030757138635067427424139631717878374003425129640590800223699819166069117608028413549849
// // C047988
// 020479880634908485676605739556384023238977303490615835975030757138635067427424139631717878374003425129640590800223699819166069117608028413549849
// // Axxx
// 000293491080834726272176436294652481682031496444292551507147228084591066420589408132351118107198158668235385427722705120768086058224932879700723
// // N
// 130160820919531316509428089127428600609609956368078789115819040314433010707320948903758171074019793611237626028664177512893218114536033740356800
// // K
// 100723530962609091766762336558974132727124103673669084847235392369066482725566583864168648945100300893100474788262582999223147660033020705739683




// 陕西客运机打发票
// 51650521445086552648[2019]1005547813*470105086554177519655150000*5068254177478134679806090001-11240000*47010508654633049899161002019200*4701050865478134989906995790*516505298354218465675417752977475315215846567503885086548861459915417754982*541775498251889483562019504101254466
// 53196521445086552648413942019413951003347813*47010508655417751965500000047069*5068254177478134679836710001-41710000*47010508654633049899161001919200*4701050865478134989939048518*5319653748601014982550865488615417752977542245321447531521585417754982*54177549825188948356201950410754466

// 51650521445086552648[2019]1000447813*470105086554177519654215000*5068254177478134679821995001-26210000*47010508654633049899161001919200*4701050865478134989926146268*516505298354218465675417752977475315215846567503885086548861459915417754982*54177549825188948356201950410454466
// 51650521445086552648[2019]1005547813*470105086554177519655150000*5068254177478134679806090001-11240000*47010508654633049899161002019200*4701050865478134989906995790*516505298354218465675417752977475315215846567503885086548861459915417754982*541775498251889483562019504101254466
// // 19071428
// 5298352144539474706250865526482019465541001747813*470105086554177519652000000*5068254177478134679817862626-19862625*47010508654633049899161011940110*4701050865478134989919071428*51650529836240653445490944831654177529775422453214545125140647531521585417754982*541775498251889483562019504101254466



// 出租车 目前发现只有陕西的有
// 45478521445086552648201950410465541006347813*4701050865541775196510000048877*5068254177478134679878830001-88830000*47010508654633049899161002018100*4701050865478134989978903442*5165052983501064780545234513715417752977542245321447531521585417754982*541775498251889483562019504101254466
// 52983521445086552648418962019418971001847813*4701050865541775196590000000*5068254177478134679800000001-90000000*47010508654633049899161001918104*4701050865478134989963937083*529834523446554539475417752130459915417754982*54177549825188948356201950410754466
// 52983521445086552648418962019418971001847813*4701050865541775196590000000*5068254177478134679800000001-90000000*47010508654633049899161001918104*4701050865478134989963937087*529834523446554539475417752130459915417754982*54177549825188948356201950410754466
// 5319652144508655264820195041046554147813*470105086554177519652200048877*5068254177478134679800000001-02200000*47010508654633049899161001918100*4701050865478134989901016666*5165052983501064780545234513715417752977542245321447531521585417754982*54177549825188948356201950410154466
// 45478521445086552648201950410465541006347813*4701050865541775196510000048877*5068254177478134679878830001-88830000*47010508654633049899161002018100*4701050865478134989978903442*5165052983501064780545234513715417752977542245321447531521585417754982*541775498251889483562019504101254466

// const p = /^[0-9\[\]]+\*[0-9]+\*[0-9-]+\*[0-9]+\*[0-9]+?([0-9]{8})\*[0-9-]+\*[0-9-]+$/

// 机票
// 1369825422 0
// 1369825425 3




const useScanInvoiceHelper = (str) => {
  const invoiceInfo = { invoiceCode: '', invoiceType: '' }

  const getIfValidInvoice = () => {
    for (let [key, value] of invoicePattenMap.entries()) {
      const { pattern, postProcessor } = value;

      const res = pattern.exec(str);

      if (res) {
        invoiceInfo.invoiceCode = postProcessor(res);
        invoiceInfo.invoiceType = key;
        return true;
      }
    }
    return false;
  }

  const getInvoiceInfo = () => {
    return invoiceInfo;
  }

  return {
    getIfValidInvoice,
    getInvoiceInfo
  }
}