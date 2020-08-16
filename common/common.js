/**
 * 计时器 (目前用于多少秒后获取验证码的操作)
 * @param t
 * @param fn
 * @example timer(60, (t) => {
              if (t) this.getCodeButName = `${t}秒后获取`;
              else {
                this.isDisabled = false;
                this.getCodeButName = '获取验证码';
              }
            });
 */
export const timer = (t, fn) => {
	setTimeout(() => {
		t--;
		if (t !== 0) {
			timer(t, fn);
		}
		fn(t);
	}, 1000);
};
/**
 * 保留两位小数
 */
export function reserveTwoDecimal(val) {
	if (!val) {
		return 0;
	}
	val = Number(val);
	if (val.toString().indexOf('.') != -1) {
		val = Number(val.toFixed(2));
	}
	return val;
}
/**
 * 时间格式化
 * @description < 调用方式timeFormat(new Date(), 'yyyy-MM-dd hh:mm:ss') >
 * @param date
 * @param fmt
 * @return {*}
 */
export function timeFormat(date, fmt = 'yyyy-MM-dd', reduce = false) {
	if (!date) {
		return '-';
	}
	date = new Date(date);
	if (date.toString().indexOf('T') != -1 && reduce) {
		date.setHours(date.getHours() - 8);
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds(),
		'q+': Math.floor((date.getMonth() + 3) / 3),
		'S': date.getMilliseconds()
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	for (let k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
		}
	}
	return fmt;
}
// 根据一个类型计算开始时间和结束时间
// 1 今日 2 昨日 3 近一周 4 近一月 5 近一年
export function computedTimeOfType(type) {
	let startDate = '';
	let endDate = '';
	if (type == 1) { // 今日
		let ST = new Date().getTime();
		startDate = timeFormat(ST) + ' 00:00:00';
		endDate = timeFormat(ST) + ' 23:59:59';
	} else if (type == 2) { // 昨日
		let ST = new Date().getTime() - 24 * 60 * 60 * 1000;
		startDate = timeFormat(new Date(ST)) + ' 00:00:00';
		endDate = timeFormat(new Date(ST)) + ' 23:59:59';
	} else if (type == 3) { // 近一周
		let ST = new Date().getTime() - 24 * 60 * 60 * 1000 * 6;
		startDate = timeFormat(new Date(ST)) + ' 00:00:00';
		endDate = timeFormat(new Date()) + ' 23:59:59';
	} else if (type == 4) { // 近一月
		let ST = new Date().getTime() - 24 * 60 * 60 * 1000 * 29;
		startDate = timeFormat(new Date(ST)) + ' 00:00:00';
		endDate = timeFormat(new Date()) + ' 23:59:59';
	} else if (type == 5) { // 近一年
		let ST = new Date().getTime() - 24 * 60 * 60 * 1000 * 365;
		startDate = timeFormat(new Date(ST)) + ' 00:00:00';
		endDate = timeFormat(new Date()) + ' 23:59:59';
	}
	return [startDate, endDate];
}
/**
 * 路由权限筛选
 * @description < 输入路由数组，进行mid权限筛选') >
 * @param rou 本地路由
 * @param mod 请求权限数组
 * @return {*}
 */
export function routeFiltrate(rou, mod) {
	// 定义一个空的数组临时储存一级分类
	let routeArr = [];

	rou.children.forEach(e => {
		mod.forEach(h => {
			if (h.type === 1) {
				if (e.meta.mid === h.mid) {
					routeArr.push(e);
				}
			}
		});
	});
	// console.log(routeArr);
	// 对二级分类进行遍历，如果发现匹配就进行重组
	routeArr.forEach((e, index) => {
		let i = index;
		if (e.children) {
			let arr = [];
			e.children.forEach(h => {
				mod.forEach(z => {
					if (z.type === 2) {
						if (h.meta.mid === z.mid) {
							arr.push(h);
						}
					}
				});
			});
			routeArr[i].children = arr;
		}
	});

	return routeArr;
}

/**
 * 设置cookie
 * @description < 登录时，写入cookie >
 */

export function setCookie(name, value, expiremMinutes) {
	let exDate = new Date();
	exDate.setTime(exDate.getTime() + expiremMinutes * 60 * 1000);
	document.cookie = name + '=' + escape(value) + ((expiremMinutes == null) ? '' : ';expires=' + exDate.toGMTString());
}

/**
 * 读取cookie
 * @description < 点击保存密码时，读取cookie >
 */
export function getCookie(name) {
	if (document.cookie.length > 0) {
		let start = document.cookie.indexOf(name + '=');
		if (start !== -1) {
			start = start + name.length + 1;
			let end = document.cookie.indexOf(';', start);
			if (end === -1) {
				end = document.cookie.length;
				return unescape(document.cookie.substring(start, end));
			}
		}
	}
	return '';
}

/**
 * 删除cookie
 * @description < 未点击保存密码时，删除cookie >
 */
export function delCookie(name) {
	let exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null) {
		document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
	}
}

/**
 * 匹配用户权限
 * @description < 通过匹配用户是否有该权限，返回布尔值 >
 */
export function hasPermissions(value, permissions) {
	let status = true;
	permissions.forEach(e => {
		if (value === e.code) {
			status = false;
		}
	});
	return status;
}
export function newpermissions(value, permissions) {
	let status = false;
	permissions.forEach(e => {
		if (value === e.id) {
			status = true;
		}
	});
	return status;
}
/**
 * 判断手机号码是否符合
 * @description < 判断手机号码是否符合 >
 */
export function isPoneAvailable(val) {
	var myreg = /^1[3|4|5|6|7|8|9][0-9]\d{8,8}$/;
	if (myreg.test(val)) {
		return true;
	}
	return false;
}
/**
 * 判断是安卓还是pc
 * @description < 判断是安卓还是pc >
 */
export function isAndroid() {
	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		return false;
	} else if (/(Android)/i.test(navigator.userAgent)) {
		return true;
	}
	return false;
}
/**
 * 判断域名
 * @description < 判断域名 >
 */
export function domain() {
	let dominurl = window.location.host;
	console.log(dominurl);
	let url = 'yanmao.etbear.com';
	let url2 = 'zsym-pos.wetool.com';
	if (dominurl == url || dominurl == url2) {
		return true;
	}
	return false;
}
/**
 * 字符串转成base64
 * @description < 字符串转成base64 >
 */
export function toBase64(data) {
	var toBase64Table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	var base64Pad = '=';
	var result = '';
	var length = data.length;
	var i;
	// Convert every three bytes to 4 ascii characters.

	for (i = 0; i < (length - 2); i += 3) {
		result += toBase64Table[data.charCodeAt(i) >> 2];
		result += toBase64Table[((data.charCodeAt(i) & 0x03) << 4) + (data.charCodeAt(i + 1) >> 4)];
		result += toBase64Table[((data.charCodeAt(i + 1) & 0x0f) << 2) + (data.charCodeAt(i + 2) >> 6)];
		result += toBase64Table[data.charCodeAt(i + 2) & 0x3f];
	}

	// Convert the remaining 1 or 2 bytes, pad out to 4 characters.

	if (length % 3) {
		i = length - (length % 3);
		result += toBase64Table[data.charCodeAt(i) >> 2];
		if ((length % 3) === 2) {
			result += toBase64Table[((data.charCodeAt(i) & 0x03) << 4) + (data.charCodeAt(i + 1) >> 4)];
			result += toBase64Table[(data.charCodeAt(i + 1) & 0x0f) << 2];
			result += base64Pad;
		} else {
			result += toBase64Table[(data.charCodeAt(i) & 0x03) << 4];
			result += base64Pad + base64Pad;
		}
	}
	return result;
}
/**
 * 校验操作是否有对应菜单
 */
export function checkPermissions(id) {
	let checkNodes = JSON.parse(sessionStorage.getItem('checkNodes'));
	let isOk = false;
	checkNodes.forEach(e => {
		if (e === id) {
			isOk = true;
		}
	});
	return isOk;
}

/**
 * 金额 分转元
 */
export function regFenToYuan(amount) {
	amount = Number(amount);
	let tempAmount = Number(amount) / 100;
	if (tempAmount.toString().indexOf('.') == -1) {
		return Number(tempAmount);
	}
	return Number(tempAmount.toFixed(2));
}
/**
 * 金额 元转分
 */
export function regYuanToFen(amount) {
	amount = Number(amount);
	let tempAmount = Number(amount) * 100;
	if (tempAmount.toString().indexOf('.') == -1) {
		return Number(tempAmount);
	}
	return Number(tempAmount.toFixed(2));
}
/**
 * 数字转换金额
 * number：要格式化的数字
 * decimals：保留几位小数
 * dec_point：小数点符号
 * thousands_sep：千分位符号
 */
export function numberFormat(number, decimals, dec_point, thousands_sep) {
	number = (number + '').replace(/[^0-9+-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		s = '',
		toFixedFix = function(n, prec) {
			var k = Math.pow(10, prec);
			return '' + Math.ceil(n * k) / k;
		};
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	var re = /(-?\d+)(\d{3})/;
	while (re.test(s[0])) {
		s[0] = s[0].replace(re, '$1' + sep + '$2');
	}
	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
}
/**
 *物流发货公司信息
 */
export function formatLogistics(val) {
	if (val === '1') {
		val = '圆通快递';
	} else if (val === '2') {
		val = '京东物流';
	} else if (val === '3') {
		val = '申通物流';
	} else if (val === '4') {
		val = '邮政物流';
	} else if (val === '5') {
		val = '顺丰物流';
	}
	return val;
}
/**
 *TZ时间转换
 */
export function formatTZtime(val) {
	if (val !== '') {
		return new Date(val).toISOString();
	}
}
export function NewformatTZtime(val) {
	if (val !== '') {
		let txt = val.split(' ');
		return txt[0] + 'T' + txt[1] + 'Z';
	}
}
/**
 * 剔除重复商品
 * list：原始商品数组
 * newList：新增商品数组
 * callback：回调函数
 */
export function eliminateRepeatGoods(list, newList, callback) {
	if (!Array.isArray(list) || !Array.isArray(newList)) {
		callback([]);
		return;
	}
	if (list.length === 0) {
		callback(newList);
		return;
	}
	list.forEach((e, eIndex) => {
		newList.forEach((v, vIndex) => {
			if (e.id === v.id && e.barcode === v.barcode && e.manySpecReId === v.manySpecReId) {
				e.number += 1;
				newList.splice(vIndex, 1);
			}
		});
	});
	let tempList = list.concat(newList);
	callback(tempList);
}
/**
 * 查找部门所有父级
 * list：部门集合
 * id：当前选中部门id
 */
export function lookParent(list, id) {
	let arrRes = [];
	if (list.length == 0) {
		if (id) {
			arrRes.unshift(list);
		}
		return arrRes;
	}
	let rev = (data, nodeId) => {
		for (let i = 0, length = data.length; i < length; i++) {
			let node = data[i];
			if (node.id == nodeId) {
				arrRes.unshift(Number(node.id));
				rev(list, node.parentId);
				break;
			} else {
				if (node.next) {
					rev(node.next, nodeId);
				}
			}
		}
		return arrRes;
	};
	arrRes = rev(list, id);
	return arrRes;
}
/**
 * 查找当前所选部门项
 * list：部门集合
 * id：当前选中部门id
 * callback:回调函数
 */
export function searchTemp(list, id, callback) {
	list.forEach(e => {
		if (e.id === id) {
			callback(e);
		} else if (e.next && e.next.length > 0) {
			searchTemp(e.next, id, callback);
		}
	});
}
/**
 *
 * 判断返回的数据是否都为undefined
 *
 */
export function selectData(list) {
	list.forEach((item, index) => {
		if (typeof item === 'object') {
			for (const i in item) {
				if (item[i] !== undefined) {
					item.add = true;
				}
			}
		}
	});
	return list;
}
/**
 *
 * 获取当前选中分类
 *
 */
export function getActiveClass(list, id) {
	let tempItem = null;
	let getClass = (tempList, classId) => {
		tempList.forEach(e => {
			if (e.id === classId) {
				tempItem = e;
			} else if (e.subCategory && e.subCategory.length > 0) {
				getClass(e.subCategory, classId);
			}
		});
	};
	getClass(list, id);
	return tempItem;
}
/**
 * 查找分类所有父级
 * list：分类集合
 * id：当前选中分类id
 * childrenName:子集名称
 */
export function lookClassParent(list, childrenName, id) {
	let arrRes = [];
	if (list.length == 0) {
		if (id) {
			arrRes.unshift(list);
		}
		return arrRes;
	}
	let rev = (data, nodeId) => {
		for (let i = 0, length = data.length; i < length; i++) {
			let node = data[i];
			if (node.categoryId === nodeId) {
				arrRes.unshift(Number(node.categoryId));
				if (node.parentId != 0) {
					rev(list, node.parentId);
					break;
				}
			} else {
				if (node[childrenName] && node[childrenName].length > 0) {
					rev(node[childrenName], nodeId);
				}
			}
		}
		return arrRes;
	};
	arrRes = rev(list, id);
	return arrRes;
}
/**
 *
 * 环比增长率
 *
 */
export function Percentage(val) {
	let res = String(val),
		num, txt;
	if ((res.toString('-') != -1) === true) {
		num = res.split('-');
		txt = num[1] * 100 + '%';
	} else if ((res.toString('+') != -1) === true) {
		num = res.split('+');
		txt = num[1] * 100 + '%';
	}
	return txt;
}
/**
 *
 * 数据百分比
 *
 */
export function Datapg(val) {
	return Number(val) * 100 + '%';
}
/**
 *
 * 获取当前选中车辆
 *
 */
export function getActiveCar(list, id, callback) {
	let tempItem = null;
	let getClass = (tempList, classId) => {
		tempList.forEach(e => {
			if (e.id === classId) {
				tempItem = e;
			}
		});
	};
	getClass(list, id);
	return tempItem;
}
/**
 *
 * 累加金额
 *
 */
export function accumulationMoney(list, items) {
	let tempItem = 0,
		array = [];
	list.forEach((item, index) => {
		array.push(Number(item[items]));
	});
	if (array.length > 1) {
		array.forEach((i, j) => {
			tempItem += array[j];
		});
	} else {
		tempItem = array[0];
		console.log(array, 'array');
	}
	return tempItem;
}
/**
 *
 * 限制选择时间范围
 *
 */
// export function endDateytime (item) {
//   return {
//     disabledDate (time) {
//       if (item) {
//         // 如果开始时间不为空，则结束时间大于开始时间
//         return (
//           new Date(item).getTime() > time.getTime()
//         );
//       }
//       return time.getTime() < Date.now();// 开始时间不选时，结束时间最大值小于等于当天
//     }
//   };
// }
/**
 *
 * 下拉框返回当前对应的整条数据
 *
 */
export function ReturnListData(list, items, Id, callback) {
	list.forEach((item, index) => {
		if (item[items] === Id) {
			callback(item);
		}
	});
}
/**
 *
 * 金额后面加两个零
 *
 */
export function toFixedMoney(val) {
	return Number(val).toFixed(2);
}

/**
 * 剔除重复商品
 * list：原始商品数组
 * newList：新增商品数组
 * callback：回调函数
 */
export function ClearRepeatGoods(list, newList, item, callback) {
	if (!Array.isArray(list) || !Array.isArray(newList)) {
		callback([]);
		return;
	}
	if (list.length === 0) {
		callback(newList);
		return;
	}
	list.forEach((e, eIndex) => {
		newList.forEach((v, vIndex) => {
			if (e[item] !== v[item]) {
				list.push(v);
			}
		});
	});
	let tempList = list;
	callback(tempList);
}
/**
 * 上移下移置顶
 */
export function MoveData(arr, index1, item, direction) {
	if (direction == 'TOP') { // 置顶
		arr.unshift(arr[index1]);
		arr.splice(index1 + 1, 1);
		return arr;
	}
	// if (direction == 'down') { // 置底
	//   arr.push(arr[index1]);
	//   arr.splice(index1, 1);
	//   return arr;
	// }
	if (direction == 'MOVE_UP') { // 上移
		arr.splice(index1 - 1, 0, item);
		arr.splice(index1 + 1, 1);
		return arr;
	}
	if (direction == 'MOVE_DOWN') { // 下移
		arr.splice(index1 + 2, 0, item);
		arr.splice(index1, 1);
		return arr;
	}
}
/**
 * 乘除
 */
export function Operation(arr, index1, item, direction) {
	if (direction == 'TOP') { // 置顶
		arr.unshift(arr[index1]);
		arr.splice(index1 + 1, 1);
		return arr;
	}
	// if (direction == 'down') { // 置底
	//   arr.push(arr[index1]);
	//   arr.splice(index1, 1);
	//   return arr;
	// }
	if (direction == 'MOVE_UP') { // 上移
		arr.splice(index1 - 1, 0, item);
		arr.splice(index1 + 1, 1);
		return arr;
	}
	if (direction == 'MOVE_DOWN') { // 下移
		arr.splice(index1 + 2, 0, item);
		arr.splice(index1, 1);
		return arr;
	}
}
/**
 * 过滤支付设置
 */
export function payMethodFilters(val) {
	if (val === 'WECHAT_SMALL_PROGRAM_PAY') {
		return '微信小程序支付'
	} else if (val === 'BALANCE_PAY') {
		return '余额支付'
	} else if (val === 'OFFICIAL_PAY') {
		return '官方支付'
	} else if (val === 'MOBILE_PHONE_TRANSFER') {
		return '手机转账'
	} else if (val === 'BANK_TRANSFER') {
		return '银行转账'
	} else if (val === 'CASH_PAYMENT') {
		return '现金支付'
	}
}
/**
 * 树状图过滤
 */
export function Array_Func_Filter(list, callback) {
	let arr1 = [],
		arr2 = [],
		arr3 = [];
	list.forEach((item, index) => {
		item.data.forEach((i, j) => {
			if (j === 0) {
				arr1.push(i)
			} else if (j === 1) {
				arr2.push(i)
			} else if (j === 2) {
				arr3.push(i)
			}
		})
	})

	list.forEach((item, index) => {
		if (index === 0) {
			item.data = arr1
		} else if (index === 1) {
			item.data = arr2
		} else if (index === 2) {
			item.data = arr3
		}
	})

	callback(list)
}
/**
 * 截取code
 */
export function Splice_url(callback) {
	let url = window.location.href;
	let res = url.split('?');
	let txt = res[1].split('&');
	let Con = null;
	if (txt.length > 0) {
		// txt.forEach((item,index) => {
		// 	if(item.indexOf('code') !== -1) {
		// 		Con = item;
		// 	}
		// })

	}
	let num = Con.split('=');
	callback(num[1]);
}

export function GetQueryValue(queryName) {
	var query = decodeURI(window.location.search.substring(1));
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == queryName) {
			return pair[1];
		}
	}
	return null;
}
