import Vue from 'vue'
import App from './App'
// import amap from './common/amap-wx.js';
import {
	uniRequest
} from './common/communication.js';

import uView from "uview-ui";
Vue.use(uView);

// 请求地址
// Vue.prototype.HOST = 'https://huawin.imwork.net/minapp/app/mock/';
Vue.prototype.HOST = 'http://wechat.daizhangfang.net/';//正式环境
// Vue.prototype.HOST = 'https://gylmpdev.yingeo.com/'; //测试环境
Vue.prototype.PLATFORM = ''; //23/
Vue.prototype.CLIENT = ''; //19/

// Vue.prototype.SECRET = '8e970774355b3c13549f32d430994c9f';
// Vue.prototype.amapPlugin = new amap.AMapWX({
// 	key: '6486953994486597ec74d100fe0eb3bc'
// });
// Vue.prototype.GETCOOKIE = function(tempStr, name) {
// 	if (tempStr.length > 0) {
// 		let start = tempStr.indexOf(name + '=');
// 		if (start !== -1) {
// 			start = start + name.length + 1;
// 			let end = tempStr.indexOf(';', start);
// 			return unescape(tempStr.substring(start, end));
// 		}
// 	}
// 	return '';
// }
// Vue.prototype.CARTCOUNT = function(callback) {
// 	this.uniRequest({
// 		url: `${this.PLATFORM}services/ordercenter/api/shopping-cart-count`,
// 		success: (res) => {
// 			if (res.status === 0) {
// 				if (res.data === 0) {
// 					uni.removeTabBarBadge({
// 						index: 2,
// 					})
// 				} else {
// 					uni.setTabBarBadge({
// 						index: 2,
// 						text: res.data.toString()
// 					})
// 				}
// 				if (callback) {
// 					callback(res.data);
// 				}
// 				uni.setStorageSync('cartCount', res.data);
// 			}
// 		},
// 		error: (error) => {}
// 	});
// }
Vue.prototype.uniRequest = uniRequest;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
