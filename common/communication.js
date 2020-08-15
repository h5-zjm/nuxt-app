export const uniRequest = function(obj) {
	let XSRFTOKEN = uni.getStorageSync('XSRFTOKEN');
	let access_token = uni.getStorageSync('access_token') ? uni.getStorageSync('access_token') + ';' : '';
	let refresh_token = uni.getStorageSync('refresh_token') ? uni.getStorageSync('refresh_token') + ';' : '';
	let Cookie = '';
	if (access_token) {
		Cookie = 'access_token=' + access_token;
	}
	if (refresh_token) {
		Cookie = Cookie + 'refresh_token=' + refresh_token;
	}
	if (XSRFTOKEN) {
		Cookie = Cookie + 'XSRF-TOKEN=' + XSRFTOKEN;
	}
	// uni.showLoading({
	// 	title: '加载中'
	// });
	let shopInfn = uni.getStorageSync('shopInfo') ? JSON.parse(uni.getStorageSync('shopInfo')) : {};
	let parm = {
		url: '',
		method: 'GET',
		contentType: obj.contentType || 'application/json;charset=UTF-8',
		data: null,
		success: () => {},
		error: () => {}
	};
	let header = {
		'content-type': parm.contentType,
		'store-id': shopInfn.id || '',
		'store-name': encodeURI(shopInfn.name) || '',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
		'Access-Control-Max-Age': '3600',
		'Access-Control-Allow-Headers': 'x-requested-with,Authorization,token, content-type',
		'Access-Control-Allow-Credentials': 'true'
	}
	if (XSRFTOKEN) {
		header['X-XSRF-TOKEN'] = XSRFTOKEN;
	}
	if (Cookie) {
		header['Cookie'] = Cookie;
	}
	Object.assign(parm, obj);
	uni.request({
		url: this.HOST + parm.url,
		method: parm.method,
		data: parm.data,
		header: header,
		success: (result) => {
			if(result.data.data) {
				parm.success(result.data)
			} else {
				parm.success(result)
			}
			// if (result.data.status != 0 && parm.url.indexOf('get-user-info') === -1) {
			// 	uni.showToast({
			// 		title: result.data.msg,
			// 		icon: 'none'
			// 	})
			// } else {
			// 	parm.success(result.data)
			// 	console.log(result,'result')
			// }
			// uni.hideLoading();
			
		},
		fail: (error) => {
			parm.error(error)
			// uni.hideLoading();
		},
		complete: (res) => {
			// let cookie = '';
			// if (res.cookies) {
			// 	res.cookies.forEach(e => {
			// 		cookie = cookie + e;
			// 	})
			// 	if (this.GETCOOKIE(cookie, 'XSRF-TOKEN').length > 2) {
			// 		uni.setStorageSync('XSRFTOKEN', this.GETCOOKIE(cookie, 'XSRF-TOKEN'));
			// 	}
			// 	if (this.GETCOOKIE(cookie, 'access_token').length > 2) {
			// 		uni.setStorageSync('access_token', this.GETCOOKIE(cookie, 'access_token'));
			// 	}
			// 	if (this.GETCOOKIE(cookie, 'refresh_token').length > 2) {
			// 		uni.setStorageSync('refresh_token', this.GETCOOKIE(cookie, 'refresh_token'));
			// 	}
			// }
		}
	});
}
