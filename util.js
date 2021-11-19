import * as moment from 'moment';
import additionalBudgetControllerApi from '@/api/project/additionalBudgetControllerApi'
import store from '@/store'
import { $constants } from '@/constants'
import storageListControllerApi from '@/api/project-storage/storage-list-controller-api'
Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};
// 时间戳转化为日期格式
export function formateDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}
// 左边补0函数
function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}
const $util = {
    /**
     * 日期转汉字
     * @param date yyyy-mm-dd
     */
    CNDateString: function(date) {
        var cn = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        var arr = [];
        var YY = date.getFullYear().toString();
        for (var i = 0; i < YY.length; i++) {
            if (cn[YY.charAt(i)]) {
                arr.push(cn[YY.charAt(i)]);
            }
        }
        arr.push(",");
        var MM = date.getMonth() + 1;
        if (MM < 10) {
            arr.push(cn[MM]);
        } else if (MM < 20) {
            if (MM === 10) {
                arr.push("十");
            } else {
                arr.push("十" + cn[MM % 10]);
            }
        }
        arr.push(",");
        var DD = date.getDate();
        if (DD < 10) {
            arr.push(cn[DD]);
        } else if (DD < 20) {
            if (DD === 10) {
                arr.push("十");
            } else {
                arr.push("十" + cn[DD % 10]);
            }
        } else if (DD < 30) {
            if (DD === 20) {
                arr.push("二十");
            } else {
                arr.push("二十" + cn[DD % 10]);
            }

        } else {
            if (DD === 30) {
                arr.push("三十");
            } else {
                arr.push("三十" + cn[DD % 10]);
            }
        }
        return arr.join('').split(",");;
    },

    currentMonthFirst() {
        var date = new Date();
        date.setDate(1);
        return date;
    },
    currentMonthLast() {
        var date = new Date();
        var currentMonth = date.getMonth();
        var nextMonth = ++currentMonth;
        var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        var oneDay = 1000 * 60 * 60 * 24;
        return new Date(nextMonthFirstDay - oneDay);
    },

    //中国标准时间转换为自己想要的格式
    // 用法  Utils.formatChinaTime(dateValue,'yyyy-MM-dd HH:mm:ss')
    formatChinaTime: function(time, format) {
        let t = new Date(time);
        let tf = function(i) {
            return (i < 10 ? '0' : '') + i
        };
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
            switch (a) {
                case 'yyyy':
                    return tf(t.getFullYear());

                case 'MM':
                    return tf(t.getMonth() + 1);

                case 'mm':
                    return tf(t.getMinutes());

                case 'dd':
                    return tf(t.getDate());

                case 'HH':
                    return tf(t.getHours());

                case 'ss':
                    return tf(t.getSeconds());

            }
        })
    },

    /**
     * Cookie储存
     * @param cname 存入的name名
     * @param  cvalue 储存的数据
     * @param  exdays 保存的天数
     */
    setCookie: function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        console.info(cname + "=" + cvalue + "; " + expires);
        document.cookie = cname + "=" + cvalue + "; " + expires;
        console.info(document.cookie);
    },
    /**
     * Cookie获取
     * @param cname 取的name名
     */
    getCookie: function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            console.log(c)
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    /**
     * localStorage储存
     * @param localName 存入的name名
     * @param  data 储存的数据
     */
    localSetData: function(localName, data) { //储存localStorage
        localStorage.setItem(localName, JSON.stringify(data))
    },
    /**
     * localStorage取出
     * @param localName 取出的name名
     */
    localGetData: function(localName) { //取出localStorage
        return JSON.parse(localStorage.getItem(localName));
    },
    /**
     * sessionStorage储存
     * @param sessionName 存入的name名
     * @param  data 储存的数据
     */
    sessionSetData: function(sessionName, data) {
        data.data['realNameURL'] = encodeURI(data.data.realName);
        sessionStorage.setItem(sessionName, JSON.stringify(data))
    },
    /**
     * sessionStorage取出
     * @param sessionName 取出的name名
     */
    sessionGetData: function(sessionName) {
        return JSON.parse(sessionStorage.getItem(sessionName));
    },
    /**
     * 调用弹框
     * @param id 弹框ID
     */
    openPop: function(id) { //打开弹框
        this.index = layer.open({ //弹出数
            type: 1,
            title: false,
            closeBtn: 1,
            area: ['500px', '500px'],
            content: $(id),
        })
    },
    /**
     * 数组切割拼装
     * @param data 需要切割的数组
     * @param index 每条数量
     */
    arraySplice: function(data, index) {
        let num = 0;
        let _data = [];
        for (let i = 0; i < data.length; i++) {
            if (i % index == 0 && i != 0) {
                _data.push(data.slice(num, i));
                num = i;
            }
            if ((i + 1) == data.length) {
                _data.push(data.slice(num, (i + 1)));
            }
        }
        return _data;
    },
    number_chinese(money) {
        if (money === 0 || Number(money) === 0 || !money) {
            return '零元整'
        }
        //  将数字金额转换为大写金额
        var cnNums = new Array(
            "零",
            "壹",
            "贰",
            "叁",
            "肆",
            "伍",
            "陆",
            "柒",
            "捌",
            "玖"
        ); //汉字的数字
        var cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
        var cnIntUnits = new Array("", "万", "亿", "万亿"); //对应整数部分扩展单位
        var cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
        var cnInteger = "整"; //整数金额时后面跟的字符
        var cnIntLast = "元"; //整数完以后的单位
        //最大处理的数字
        var maxNum = 999999999999999.9999;
        var integerNum; //金额整数部分
        var decimalNum; //金额小数部分
        //输出的中文金额字符串
        var chineseStr = "";
        var parts; //分离金额后用的数组，预定义
        if (money == "") {
            return "";
        }

        money = parseFloat(money);
        if (money >= maxNum) {
            //超出最大处理数字
            return "超出最大处理数字";
        }
        if (money == 0) {
            chineseStr = cnNums[0] + cnIntLast + cnInteger;
            return chineseStr;
        }

        //四舍五入保留两位小数,转换为字符串
        money = Math.round(money * 100).toString();
        integerNum = money.substr(0, money.length - 2);
        decimalNum = money.substr(money.length - 2);

        //获取整型部分转换
        if (parseInt(integerNum, 10) > 0) {
            var zeroCount = 0;
            var IntLen = integerNum.length;
            for (var i = 0; i < IntLen; i++) {
                var n = integerNum.substr(i, 1);
                var p = IntLen - i - 1;
                var q = p / 4;
                var m = p % 4;
                if (n == "0") {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        chineseStr += cnNums[0];
                    }
                    //归零
                    zeroCount = 0;
                    chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                }
                if (m == 0 && zeroCount < 4) {
                    chineseStr += cnIntUnits[q];
                }
            }
            chineseStr += cnIntLast;
        }
        //小数部分
        if (decimalNum != "") {
            var decLen = decimalNum.length;
            for (var i = 0; i < decLen; i++) {
                var n = decimalNum.substr(i, 1);
                if (n != "0") {
                    chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                }
            }
        }
        if (chineseStr == "") {
            chineseStr += cnNums[0] + cnIntLast + cnInteger;
        } else if (decimalNum == "" || /^0*$/.test(decimalNum)) {
            chineseStr += cnInteger;
        }
        return chineseStr;
    },
    /**
     * 数字转千分位
     * @param num
     * @param fractionDigits 小数位数
     * @return {string}
     */
    toThousand: function (num, fractionDigits) {
        fractionDigits = fractionDigits || 0
        if (typeof num !== 'number') {
            num = Number(num)
        }
        if (fractionDigits > 0 && num) {
            num = Math.round(num * Math.pow(10, fractionDigits)) / Math.pow(10, fractionDigits)
        }
        const numStr = (num || 0).toString()
        const arr = numStr.split('.')
        let int = arr[0] // 整数部分
        let decimal = arr[1] || 0 // 小数
        // 处理整数
        const pattern = /(?=(?!(\b))(\d{3})+$)/g
        int = int.replace(pattern, ',')
        // 处理小数
        // if fractionDigits = 6 表示万元，小数位数 < 2 时， 格式化到 2 位， 2 - 6 位之间，格式化到 2 - 6 位， 6位以上， 格式化到 6 位
        if (fractionDigits === 6) {
            if (!decimal || decimal.length <= 2) {
                fractionDigits = 2
            } else if (decimal.length <= 6 && decimal.length > 2) {
                fractionDigits = decimal.length
            } else {
                fractionDigits = 6
            }
        }
        decimal = Number('0.' + decimal).toFixed(fractionDigits)
        return decimal === '0' ? int : (int + '.' + decimal.split('.')[1])
    },
    /**
     * 表格排序
     * @param data 需要排序的数据
     * @param sortType(date||number||letter)  需要排序字段的类型
     * @param sortName  排序字段
     * @param sortorder(up||down)  排序顺序
     */
    listSort: function(data, sortType, sortName, sortorder) {
        let sortData = []; //排序后的数组
        switch (sortType) {
            case 'date':
                switch (sortorder) {
                    case 'up':
                        console.info('up')
                        sortData = data.sort(function(a, b) {
                            return Date.parse(b[sortName]) - Date.parse(a[sortName]); //时间正序
                        });
                        break;
                    case 'down':
                        console.info('down')
                        sortData = data.sort(function(a, b) {
                            return Date.parse(a[sortName]) - Date.parse(b[sortName]); //时间倒序
                        });
                        break;
                    default:
                }
                break;
            case 'number':
                switch (sortorder) {
                    case 'up':
                        sortData = data.sort(function(a, b) {
                            return b[sortName] - a[sortName]; //数字正序
                        });
                        break;
                    case 'down':
                        console.info("numberdown")
                        sortData = data.sort(function(a, b) {
                            return a[sortName] - b[sortName]; //数字倒序
                        });
                        break;
                    default:
                }
                break;

            case 'letter':
                switch (sortorder) {
                    case 'up':
                        sortData = data.sort(function(a, b) {
                            return b[sortName].localeCompare(a[sortName]); //字母正序
                        });
                        break;
                    case 'down':
                        sortData = data.sort(function(a, b) {
                            return a[sortName].localeCompare(b[sortName]); //字母倒序
                        });
                        break;
                    default:
                }
                break;
            default:
        }
        return sortData
    },
    /**
     * 输入框验证
     * @param num 需要验证的信息
     */
    verification: {
        PRO_NAME_NO_SPACE_REGEXP: /^[\S][\S\s]*[\S]$|^[\S]$/,
        NO_SPACE_TEXTAREA: /^(?!(\s+$))/,
        USER_CODE_LEG: {
            MAX: 50
        },
        // 编辑器
        EDIT_MAX_LEG_TIP: '请输入1到10000位字符（不允许纯空格）',

        // varchar类型的最大字符个数
        VARCHAR_MAX_LEG_TIP: '请输入1到255位字符（不允许纯空格）',
        VARCHAR_MAX_LEG_TIP_LEG: {
            MAX: 255
        },

        // 邮箱
        EMAIL_TIP: '格式不正确',
        // 邮编
        ZIPCODE_TIP: /^[0-9]{6}$/,
        ZIPCODE_TIP_MESS: '请输入6位数字',

        EMAIL_TIPS: '最大输入90字符',
        EMAIL_REGEXP: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
        EMAI_LEG: {
            MAX: 90
        },
        // 固定电话号码
        TEL_NOEXIT_TIP: '您输入的手机号不存在，请核对后重新输入',
        TEL_TIP: '格式不正确（区号-电话号码）',
        TEL_REGEXP: /(^0(\d{2})[2-9](\d{7})$)|(^0(\d{3})[2-9](\d{6})$|^\d{8}$) |(^0\d{2,3}-\d{7,8}$)|(^\d{7,8}$)/,
        TEL_LANDLINE: /^0\d{2,3}-\d{7,8}$/,
        PHONE_NOEXIT_TIP: '请输入手机号或固定电话',
        // 手机号
        PHONE_TIP: '请输入11位手机号码',
        PHONE_REGEXP: /^1\d{10}$/,
        // 手机验证码:4位数字
        CODE_TIP: '请输入4位数字',
        CODE_REGEXP: /^\d{4}$/,
        // 用户账号：1至20位大小写字母和数字
        ACCOUNT_TIP: '请输入1至20位汉字、大小写字母或数字',
        ACCOUNT_REGEXP: /^[\u4e00-\u9fa5a-zA-Z0-9]{1,20}$/,
        ACCOUNT_LEG: {
            MIN: 1,
            MAX: 20
        },
        // 用户密码：6至20位大小写字母和数字
        PSW_TIP: '字母或数字',
        PSW_REGEXP: /^[a-zA-Z0-9]{6,20}$/,
        PSW_LEG: {
            MIN: 6,
            MAX: 20
        },
        // Code代码
        DIC_CODE_DiGIT_TIP: '只允许1位数字', // author：P.J，remark：一位数字
        DIC_CODE_DiGIT: /^\d{1}$/, // author：P.J，remark：一位数字
        BANK_CODETIP: '只允许2位数字', // author：P.J，remark：2位数字
        BANK_CODE_REGEXP: /^(\d{2})$/, // author：P.J，remark：2位数字
        // 2至6位纯数字
        BANK_CODE_TIP: '只允许2至6位数字', // author：P.J，remark：2到6位数字
        BANK_CODENUM_REGEXP: /^(\d{2,6})$/, // author：P.J，remark：2到6位数字
        // 2至3位纯数字
        BANK_CODE_MSG: '只允许2至3位数字', // author：P.J，remark：2到3位数字
        BANK_CODE_TWO_THREE: /^(\d{2,3})$/, // author：P.J，remark：2到3位数字
        DIC_CODE_TIP: '请输入6至12位字母、数字或短横线（-）',
        DIC_CODE_REGEXP: /^[a-zA-Z\d-]{6,12}$/,
        // “1-12位字母、数字或短横线（-）”校验
        CODE_12_TIP: "请输入1至12位字母、数字或短横线（-）",
        CODE_REGEXP1_12: /^[a-zA-Z\d-]{1,12}$/,
        CODE_LEG1_12: {
            MIN: 1,
            MAX: 12
        },
        // NUMBERS_REGEXP: (/^[\u4E00-\u9FA5][\da-zA-Z]{6}$|(^[A-Z]{2}[A-Z0-9]{7}$)/),
        NUMBERS_REGEXP: /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领军空海北沈兰济南广成]{1}[A-Za-z]{1}[A-Za-z0-9]{4}[A-Za-z0-9挂学警港澳]{1}$|(^[A-Za-z]{2}[A-Za-z0-9]{7}$))/,
        NUMBERS_TIP: '请输入正确的车牌号',
        CODEMAX_TIP: '最大输入12个字符',
        DIC_CODE_LEG: {
            MIN: 1,
            MAX: 12
        },
        // 报账编号
        RMB_CODE_REGEXP: /^[a-zA-Z\d-]{6,20}$/,
        RMB_CODE_TIP: '请输入6至20位字母、数字或短横线（-）',
        RMB_CODE_LEG: {
            MIN: 6,
            MAX: 20
        },
        // 真实姓名:2至16位汉字
        // REALNAME_TIP: '请输入2至16位汉字',
        // REALNAME_REGEXP: /^([\u4e00-\u9fa5]){2,16}$/,
        REALNAME_TIP: '请输入2至25字符',
        REALNAME_REGEXP: /^[\s\S]{2,25}$/,
        REALNAME_CODE_LEG: {
            MIN: 2,
            MAX: 25
        },
        // 身份证号
        ID_CARD_TIP: '格式不正确',
        ID_CARD_REGEXP: /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|30|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/,
        // ID_CARD_REGEXP: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
        // 单位名称：1至50位汉字、大小写字母和数字
        COM_NAME_TIP: '请输入1至50位汉字、大小写字母或数字（不允许输入空格）',
        COM_NAME_REGEXP: /^[\u4e00-\u9fa5A-Za-z0-9]{1,50}$/,
        COM_NAME_LEG: {
            MAX: 50
        },
        // 单位营业执照号
        COM_LIC_TIP: '请输入15至18位数字或大写字母',
        COM_LIC_REGEXP: /^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){7,10}$/,
        // 银行账户：6至22位纯数字
        BANK_NUM_TIP: '请输入6至30位数字',
        BANK_NUM_REGEXP: /^(\d{6,30})$/,
        // 地址：1至100位字符
        ADDRESS_TIP: '最大可输入100个字符',
        ADDRESS_REGEXP: /^[\s\S]{1,100}$/,
        ADDRESS_LEG: {
            MAX: 100
        },
        // 目的地范围：2至50位字符
        DESTINATION_TIP: '请输入2至50汉字、大小写字母或数字',
        DESTINATION_REGEXP: /^[\u4e00-\u9fa5A-Za-z0-9]{2,50}$/,
        DESTINATION_LEG: {
            MAX: 100
        },
        // 标题：1至50位汉字、大小写字母和数字
        TITLE_TIPS: '最大可输入50个字符',
        TITLE_TIP: '请输入汉字、大小写字母或数字',
        TITLE_REGEXP: /^[\u4e00-\u9fa5A-Za-z0-9]{1,50}$/,
        TITLE_LEG: {
            MAX: 50
        },
        MORE_PERSON_TIP: '请输入2至50位汉字（顿号隔开）',
        MORE_PERSON_REGEXP: /^[\u4e00-\u9fa5、]{2,50}$/,
        CON_NAME_REGEXP: /^[\u4e00-\u9fa5A-Za-z0-9]{1,36}$/,
        CON_NAME_LEG: {
            MAX: 36
        },
        // textarea文本框：1至5000位字符
        TEXTAREA_TIP: '请输入1到5000位字符（不允许纯空格）',
        TEXTAREA_TEXTAREAREQ: '必填项',
        TEXTAREA_REGEXP: /^[\s\S]{1,5000}$/,
        TEXTAREA_LEG: {
            MAX: 5000
        },
        SUGGESTION_TIP: '最大可输入90个字符',
        SUGGESTION_REAREQ: '必填项',
        SUGGESTION_REGEXP: /^[\s\S]{1,90}$/,
        SUGGESTION_LEG: {
            MAX: 90
        },
        // 技术参数
        SPEC_TIP: '最大可输入10000个字符',
        SPEC_REGEXP: /^[\s\S]{1,10000}$/,
        SPEC_LEG: {
            MAX: 10000
        },
        // 校验存在
        EXIT_TIP: '已经存在，请重新输入',
        // 最大可输入200个字符
        LONG_NAME_REGEXP200_TIP: '最大可输入200个字符',
        LONG_NAME_REGEXP200: /^([\s\S]){1,200}$/,
        LONG_NAME_LEG200: {
            MAX: 200
        },
        // 校验存在
        EXIT_TIP_SELECT: '已经存在，请重新选择',
        EXIT_TIP_EX: '该专业已绑定，请更换再试',
        // 无效字符
        NOVOLID: '请输入汉字、符号、大小写字母或数字',
        // 日期不能为空
        DATEREQUIRE: '日期不能为空',
        // 时间不能为空
        TIMEREQUIRE: '时间不能为空',
        // 验证中...
        VALIDATE_TIP: '校验中...',
        // 服务器异常
        SERVER_TIP: '服务器校验异常',
        // input 为必填项
        INPUT_REQUIRE: '必填项',
        // select 为必填项
        SELECT_REQUIRE: '必选项',
        // 数字: 正整数
        NUMBER_REGEXP: /^([0-9]*[1-9][0-9]*)$/,
        // 数字
        NUMBER_ALL_REGEXP: /^[0-9]+.?[0-9]*$/,
        // 数字: 正数，小数点不超过两位
        PRICE_REGEXP: /^((([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2}))))$/,
        // 单位注册资金（万）：1至8位正整数（首数字不能为0）
        COM_CAPITAL_TIP: '请输入1至8位数字（首数字不能为0）',
        COM_CAPITAL_REGEXP: /^([1-9](\d{0,7}))$/,
        // 超短名称：1至10位字符
        Small_NAME_REGEXP: /^([\s\S]){1,10}$/,
        Small_NAME_LEG: {
            MIN: 1,
            MAX: 10
        },
        // 车架号长度
        FRAMENUMBER_TIP: '请输入1至100位字符（不允许纯空格）',
        FRAMENUMBER_LEG: {
            MIN: 1,
            MAX: 100
        },
        // 短名称：2至12位字符
        SHORT_NAME_REGEXP: /^([\s\S]){2,12}$/,
        SHORT_NAME_LEG: {
            MIN: 2,
            MAX: 12
        },
        // 链接校验正则
        COMMON_LINK_REGEXP: /^((ht|f)tps?):\/\/[-A-Za-z0-9+&amp;@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&amp;@#\/%=~_|]$/,
        COMMON_LINK_LEG: {
            MIN: 2,
            MAX: 200
        },
        LINK_TIP: '链接格式不正确',
        // 一般中长度名称：2至30位字符
        DISPLACEMENT_TIP: '请输入1至30位字符（不允许纯空格）',
        BRANDTYPE_TIP: '请输入2至30位字符',
        COMMON_NAME_TIP: '请输入2至30位字符（不允许输入空格）',
        COMMON_NAME_REGEXP: /^([\s\S]){2,30}$/,
        COMMON_NAME_LEG: {
            MIN: 2,
            MAX: 30
        },
        // 单位名称：1至50位字符
        DEPARTMENT_NAME_REGEXP: /^([\s\S]){1,50}$/,
        DEPARTMENT_NAME_LEG: {
            MIN: 1,
            MAX: 50
        },
        // 长名称：2至50位
        LONG_NAME_REGEXP: /^([\s\S]){2,50}$/,
        LONG_NAME_LEG: {
            MIN: 2,
            MAX: 50
        },
        // 名称：2至80位
        LONG_NAME_REGEXP2_80: /^([\s\S]){2,80}$/,
        LONG_NAME_LEG2_80: {
            MIN: 2,
            MAX: 80
        },
        // 附加条款名称：2至40位
        CONADD_NAME_REGEXP: /^([\s\S]){2,40}$/,
        CONADD_NAME_LEG: {
            MIN: 2,
            MAX: 40
        },
        // 只能輸入數字
        CONAMOUNT_TIP: '只能输入数字',
        CONAMOUNT: /^[0-9]+([.]{1}[0-9]+)?$/,
        // 支付比例 1到100
        PAY_PERCENT_TIP: '请输入1到100之间的或数字',
        // PAY_PERCENT: /^(([1-9]\d?)|100)$/,
        // 项目名称
        PRO_NAME_TIP: '请输入2至50位字符（不允许纯空格）',
        PRO_NAME_REGEXP: /^[\S][\S\s]{0,48}[\S]$/,
        PRO_SPECIFY_NAME_TIP: '请输入1至50位字符（不允许纯空格）',
        PRO_SPECIFY_NAME_REGEXP: /^[\S][\S\s]{0,48}[\S]$|^[\S]$/,
        // 原预算项目编码
        ORIGIN_PRO_NUMBER_REGEXP: /^[a-zA-Z0-9]{2,50}$/,
        ORIGIN_PRO_NUMBER_TIP: '请输入2到50位字母或数字',
        // 项目编号
        PRO_NUM_TIP: '请输入字母或数字',
        PRO_NUM_REGEXP: /^[a-zA-Z0-9]*$/,
        PRO_NUM_LEG: {
            MIN: 0,
            MAX: 20
        },
        //邮政编码
        COMPLAINTNUM_TIP: '请输入6位数字',
        COMPLAINTNUM_REGEXP: /^[0-9]\d{5}(?!\d)$/,
        // 部门名称
        Depart_NAME_TIP: '请输入2至50位汉字、大小写字母或数字',
        Depart_NAME_REGEXP: /^[\u4e00-\u9fa5A-Za-z0-9]{2,50}$/,
        Depart_NAME_LEG: {
            MIN: 2,
            MAX: 50
        },
        // “1-12位字母、数字或短横线（-）”校验
        CODE_50_TIP: "请输入1至50位字母、数字或短横线（-）",
        CODE_REGEXP1_50: /^[a-zA-Z\d-]{1,50}$/,
        // 金额
        AMOUNT_0_100000_TIP: '请输入0到100,000间的数字',
        AMOUNT_1_100000_TIP: '请输入1到100,000间的数字',
        AMOUNT_0_1000000000_TIP: '请输入0到1,000,000,000间的数字',
        AMOUNT_1_1000000000_TIP: '请输入1到1,000,000,000间的数字',
        // 备注
        REMARK_0_20000_TIP: '请输入0至20000位汉字, 符号, 字母或数字',
        REMARK_1_20000_TIP: '请输入1至20000位汉字, 符号, 字母或数字',
        PRO_NAME_1_50_REGEXP: /^[\S][\S\s]{0,48}[\S]$|^[\S]$/,
        PRO_NAME_1_50_TIP: '请输入1至50位字符（不允许纯空格）',
        PRO_NAME_2_50_REGEXP: /^[\S][\S\s]{0,48}[\S]$/,
        PRO_NAME_2_50_TIP: '请输入2至50位字符（不允许纯空格）',
        PRO_NUMBER_2_50_REGEXP: /^[a-zA-Z0-9]{2,50}$/,
        PRO_NUMBER_2_50_TIP: '请输入2到50位字母或数字',
        INPUT_TIP_GENERATOR: (min, max) => `请输入${min}至${max}位字符（不允许纯空格）`
    }
    ,
    /**
     * 日期对象转换为指定格式的字符串
     * @param inputTime 日期
     * @returns {*|string}
     */

    formatDateTime: function(inputTime) {
        var date = '';
        if (inputTime) {
            date = new Date(inputTime);
        } else {
            date = new Date();
        }
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    },
    // 十进制转二进制
    binary(num, Bits) {
        var resArry = [];
        var xresArry = [];
        var i = 0;
        // 除2取余
        for (; num > 0;) {
            resArry.push(num % 2);
            num = parseInt(num / 2);
            i++;
        }
        // 倒序排列
        for (var j = i - 1; j >= 0; j--) {
            xresArry.push(resArry[j]);
        }
        // 报错  xresArry
        if (Bits < xresArry.length) {
            // console.log("控制位小于转换位数");
        }
        // 补0操作xresArry
        if (Bits) {
            for (var r = xresArry.length; r < 32; r++) {
                xresArry.unshift("0");
            }
        }
        // console.log(xresArry.join().replace(/,/g, ""));
        return xresArry.join().replace(/,/g, "");
    },
    // 二进制转化为十六进制
    bin_to_hex(str) {
        let hex_array = [{
                key: 0,
                val: "0000"
            },
            {
                key: 1,
                val: "0001"
            },
            {
                key: 2,
                val: "0010"
            },
            {
                key: 3,
                val: "0011"
            },
            {
                key: 4,
                val: "0100"
            },
            {
                key: 5,
                val: "0101"
            },
            {
                key: 6,
                val: "0110"
            },
            {
                key: 7,
                val: "0111"
            },
            {
                key: 8,
                val: "1000"
            },
            {
                key: 9,
                val: "1001"
            },
            {
                key: "A",
                val: "1010"
            },
            {
                key: "B",
                val: "1011"
            },
            {
                key: "C",
                val: "1100"
            },
            {
                key: "D",
                val: "1101"
            },
            {
                key: "E",
                val: "1110"
            },
            {
                key: "F",
                val: "1111"
            }
        ];
        let value = "";
        let list = [];
        let listTwo = [];
        if (str.length % 4 !== 0) {
            let a = "0000";
            let b = a.substring(0, 4 - (str.length % 4));
            str = b.concat(str);
        }
        while (str.length > 8) {
            list.push(str.substring(0, 8));
            str = str.substring(8);
        }
        list.push(str);
        list = list.reverse().join("");
        while (list.length > 4) {
            listTwo.push(list.substring(0, 4));
            list = list.substring(4);
        }
        listTwo.push(list);
        for (let i = 0; i < listTwo.length; i++) {
            for (let j = 0; j < hex_array.length; j++) {
                if (listTwo[i] == hex_array[j].val) {
                    value = value.concat(hex_array[j].key);
                    break;
                }
            }
        }
        return value;
    },
    // 小数计算
    // +
    accAdd(arg1, arg2) {
        var r1, r2, m, c;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2));
        if (c > 0) {
            var cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", "")) * cm;
            } else {
                arg1 = Number(arg1.toString().replace(".", "")) * cm;
                arg2 = Number(arg2.toString().replace(".", ""));
            }
        } else {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", ""));
        }
        return (arg1 + arg2) / m;
    },
    // -
    accSub(arg1, arg2) {
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    // *
    accMul(arg1, arg2) {
        var m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length;
        } catch (e) {}
        try {
            m += s2.split(".")[1].length;
        } catch (e) {}
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    // /
    accDiv(arg1, arg2) {
        var t1 = 0,
            t2 = 0,
            r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length
        } catch (e) {}
        try {
            t2 = arg2.toString().split(".")[1].length
        } catch (e) {}
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    },
    // 处理响应式表单中查询项的构造
    dealWithValidateFormValueForSearch: (validateForm, colField, type, objField, id) => {
        switch (type) {
            case 'like':
                {
                    const value = id ? validateForm[colField][id] : validateForm[colField];
                    return value ? {
                        param: objField,
                        type: 'like',
                        value: [value]
                    } : null;
                }
            case 'equal':
                {
                    const value = id ? validateForm[colField][id] : validateForm[colField];
                    return (value !== null && value !== '') ? {
                        param: objField,
                        type: 'equal',
                        value: [value]
                    } : null;
                }
            case 'notEqual':
                {
                    const value = validateForm[colField];
                    return value ? {
                        param: objField,
                        type: 'notEqual',
                        value: [value]
                    } : null;
                }
            case 'in':
                {
                    const value = validateForm[colField];
                    return value ? {
                        param: objField,
                        type: 'in',
                        value: value
                    } : null;
                }
            case 'betweenDate':
                {
                    let startTime;
                    let endTime;
                    const betweenTime = validateForm[colField];
                    if (colField === 'year') {
                        // year 年度查询  数据库默认为 01-01
                        if (betweenTime) {
                            startTime = betweenTime + '-01-01';
                            endTime = betweenTime + '-01-01';
                        } else {
                            return null;
                        }
                        return (startTime && endTime) ? {
                            param: objField,
                            type: 'betweenDate',
                            value: [startTime, endTime]
                        } : null;
                    } else {
                        if (betweenTime && betweenTime[0] && betweenTime[1]) {
                            try {
                                startTime = moment(betweenTime[0]).format('YYYY-MM-DD');
                                endTime = moment(betweenTime[1]).format('YYYY-MM-DD');
                            } catch (e) {
                                return null;
                            }
                            return (startTime && endTime) ? {
                                param: objField,
                                type: 'betweenDate',
                                value: [startTime, endTime]
                            } : null;
                        } else {
                            return null;
                        }
                    }

                }
            case 'betweenNum':
                {
                    const start = validateForm[colField];
                    const end = validateForm[colField + 'End'];
                    return (start != null && end != null) ? {
                        param: objField,
                        type: 'betweenNum',
                        value: [start, end]
                    } : null;
                }
        }
    },
    // 将有效的查询值放入返回列表
    getSearchParamsList: (...params) => {
        const resultList = [];
        params.forEach(v => {
            if (v && v['value'] && v['value'][0] != null) {
                resultList.push(v);
            }
        });
        return resultList;
    },
    chinaIdentityValid: (rule, value, callback) => {
        if (!value) {
            return callback()
        }
        let city = {
            11: '北京',
            12: '天津',
            13: '河北',
            14: '山西',
            15: '内蒙古',
            21: '辽宁',
            22: '吉林',
            23: '黑龙江 ',
            31: '上海',
            32: '江苏',
            33: '浙江',
            34: '安徽',
            35: '福建',
            36: '江西',
            37: '山东',
            41: '河南',
            42: '湖北 ',
            43: '湖南',
            44: '广东',
            45: '广西',
            46: '海南',
            50: '重庆',
            51: '四川',
            52: '贵州',
            53: '云南',
            54: '西藏 ',
            61: '陕西',
            62: '甘肃',
            63: '青海',
            64: '宁夏',
            65: '新疆',
            71: '台湾',
            81: '香港',
            82: '澳门',
            91: '国外'
        };
        value = value.toUpperCase();
        if (!value || !/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|30|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/i.test(value)) {
            callback(new Error('身份证号格式错误'))
        } else if (!city[value.substr(0, 2)]) {
            callback(new Error('身份证号格式错误'))
        } else {
            // 18位身份证需要验证最后一位校验位
            if (value.length === 18) {
                const code = value.split('');
                // ∑(ai×Wi)(mod 11)
                // 加权因子
                const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                // 校验位
                const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                let sum = 0;
                let ai = 0;
                let wi = 0;
                for (let i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi
                }
                if (parity[sum % 11].toString() !== code[17]) {
                    callback(new Error())
                }
            } else if (value.length === 15) {
                if (!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(value)) {
                    callback(new Error())
                }
            } else {
                callback(new Error());
            }
        }
        callback()
    },
    proNameCheckRepeatValidator: function (rule, value, cb) {
        const _project = { proName: value, projectPackageId: this.proData.id }
        if (!this.formData.projectCategory.id) {
            cb()
            return
        } else {
            _project.projectCategory = {
                id: this.formData.projectCategory.id
            }
        }
        if (this.subProData) {
            _project.id = this.subProData.id
        }
        additionalBudgetControllerApi.checkProjectRepeat(_project).then(res => {
            if (res.data) {
                cb()
            } else {
                cb(new Error('项目名称重复'))
            }
        })
    },
    /**
     * 字符串转 base64
     * @param str
     * @return {string}
     */
    btoa (str) {
        return window.btoa(str || '')
    },
    /**
     * base64 转 str
     * @param str64
     * @returns {string}
     */
    atob (str64) {
        return window.atob(str64 || '')
    },
    /**
     * obj to base64 str
     * @param obj
     * @return {string}
     */
    objToBase64 (obj) {
        return this.btoa(JSON.stringify(obj || {}))
    },
    /**
     * base64 str to obj
     * @param str64
     * @return {any}
     */
    base64ToObj (str64) {
        return JSON.parse(str64 ? this.atob(str64) : '{}')
    },
    /**
     * 获取配置 url, 项目包报表使用
     * @param proPackage 项目包
     */
    getConfigReportUrl (proPackage) {
        const configModule = store.getters.configModule
        const projectCategory = proPackage.projectCategory
        const type = proPackage.type
        const code = projectCategory.code
        // 重心下移 code
        // const weightDownCode = configModule.weightDownCode
        // 陈欠 code
        const cqCode = configModule.cqCode
        let url
        let projectType
        switch(type) {
            case 2: // 收入
                url = configModule.inComeReportUrl
                projectType = $constants.PROJECT_TYPE.INCOME
                break
            case 1: // 专项
                url = configModule.specialReportUrl
                projectType = $constants.PROJECT_TYPE.SPECIAL
                break
            case 0: // 基本，判断其他
                if (proPackage.ifBigProPackage) { // 是大项目，则归口
                    url = configModule.putUnderReportUrl
                    projectType = $constants.PROJECT_TYPE.CENTRALIZED
                } else if (code === cqCode) {
                    url = configModule.debtReportUrl
                    projectType = $constants.PROJECT_TYPE.BASIC_CQ
                } else {
                    url = configModule.basicReportUrl
                    projectType = $constants.PROJECT_TYPE.BASIC_DEFAULT
                }
                break
            default:
                throw new Error('项目类别 type 出现异常')
        }
        if (!url) {
            throw new Error('报表地址配置错误')
        } else {
            return { url, projectType }
        }
    },
    /**
     * 获取配置 url, 项目包报表, ifBack(子项目退回的项目包) 使用
     * @param proPackage 项目包
     */
    async getConfigReportUrlIfBack (proPackage) {
        const configModule = store.getters.configModule
        const res = await storageListControllerApi.getProByProPackageId(proPackage.id) // 根据项目包获取项目信息
        const _project = res.data
        // 拉取最父级项目类别，以判断是否陈欠
        const resOfGetParentFundsProjectCategory = await additionalBudgetControllerApi.getFundsProjectCategoryById(res.data.parentProjectCategoryId)
        const _parentProjectCategory = resOfGetParentFundsProjectCategory.data
        // 项目类别
        const _ifCq = configModule.cqCode === (_parentProjectCategory && _parentProjectCategory.code)
        const _ifIncome = _project && _project.type === 2
        // 暂存变量
        let url = ''
        if (_ifCq) { // 陈欠
            url = configModule.returnCQUrl + '&packageId=' + proPackage.id + '&_nameReport=' + _project.proName // configModule.xxUrl
        } else if (_ifIncome) { // 收入
            url = configModule.revenueBudgetUrl + '&projectId=' + _project.id + '&_nameReport=' + _project.proName
        } else { // 基本
            url = configModule.returnBasicUrl + '&packageId=' + proPackage.id + '&_nameReport=' + _project.proName // configModule.xxUrl
        }
        if (!url) {
            throw new Error('报表地址配置错误')
        } else {
            // url += '&projectId=' + _project.id + '&_nameReport=' + _project.proName
            return { url }
        }
    },
    /**
     * 项目报表使用，根据项目类别获取 url
     * @param project
     * @return {{projectType: string, url}}
     */
    async getConfigReportUrlForProject (project) {
        const configModule = store.getters.configModule
        // const projectCategory = project.projectCategory
        const type = project.type
        // const code = projectCategory.code
        // 重心下移 code
        // const weightDownCode = configModule.weightDownCode
        // 陈欠 code
        const cqCode = configModule.cqCode // 需要拿顶级的项目类别
        let url
        let projectType
        switch(type) {
            case 2: // 收入
                url = configModule.revenueBudgetUrl
                projectType = $constants.PROJECT_TYPE.INCOME
                break
            case 1: // 专项
                url = configModule.specialBudgetUrl
                projectType = $constants.PROJECT_TYPE.SPECIAL
                break
            case 0: // 基本，判断其他
                // 1. 拉取一级项目类别的详情
                const parentProjectCategoryId = project.parentProjectCategoryId
                const { data: _parentProjectCategory } = await additionalBudgetControllerApi.getFundsProjectCategoryById(parentProjectCategoryId)
                if (_parentProjectCategory && _parentProjectCategory.code === cqCode) { // 陈欠
                    url = configModule.debtProjectReportUrl
                    projectType = $constants.PROJECT_TYPE.BASIC_CQ
                } else {
                    url = configModule.basicExpenseBudgetUrl
                    projectType = $constants.PROJECT_TYPE.BASIC_DEFAULT
                }
                break
            default:
                throw new Error('项目类别 type 出现异常')
        }
        if (!url) {
            throw new Error('报表地址配置错误')
        } else {
            return { url, projectType }
        }
    },
    /**
     * 判断是否是 null，精准判断
     * @param value
     * @returns {boolean}
     */
    isNull (value) {
        return Object.prototype.toString.call(value) === '[object Null]'
    },
    /**
     * 深拷贝
     * @param obj
     * @returns {any}
     */
    cloneDeep (obj) {
        return JSON.parse(JSON.stringify(obj))
    }
};
export const VALID = {
    VALID_COMMON: (control, key) => {
        console.log(control, key);
        if (!control.value) {
            return { required: true };
        } else if (!$util.verification[key].test(control.value)) {
            return { error: true, [key]: true };
        }
    },
    VALID_COMMON_NO_REQUIRED: (control, key) => {
        // if (control.value.length === 0) {
        if (!control.value) {
            return;
        } else if (!$util.verification[key].test(control.value)) {
            return { error: true, [key]: true };
        }
    }
};
export default $util;
