<template>
	<view id="login">
		<view class="login_tit">
			<image class="Right_img" src="../../static/images/tit.png" mode=""></image>
			<view class="Left_img">
				<image src="../../static/images/logo.png" mode=""></image>
			</view>
		</view>

		<view class="login_from">
			<u-form :model="form" ref="uForm" :border-bottom="false" label-width="auto">
				<u-form-item prop="phone" :noPadding="true">
					<view class="Con_box">
						<view class="phone">
							<image src="../../static/images/phone.png" mode=""></image>
						</view>
						<view class="Con_box_phone">
							<u-input v-model="form.phone" style="width: 300rpx;" placeholder="请输入手机号码" />
							<view class="Con_box_verify" :class="{'pointer_verify':noPointer}" @click="getverify">{{message_verify}}</view>
						</view>
					</view>

				</u-form-item>
				<u-form-item prop="verify" :noPadding="true">
					<view class="Con_box">
						<view class="phone">
							<image src="../../static/images/verify.png" mode=""></image>
						</view>
						<view class="Con_box_phone">
							<u-input v-model="form.code" style="width: 430rpx;" placeholder="请输入验证码" />
						</view>
					</view>
				</u-form-item>
			</u-form>
		</view>
		<view class="btn" @click="submit">登录</view>
	</view>
</template>

<script>
	import CONFIG from '../../common/configs.js'
	import {GetQueryValue} from '../../common/common.js'
	export default {
		data() {
			return {
				form: {
					phone: '',
					code: ''
				},
				message_verify: '获取验证码',
				rules: {
					phone: [{
							required: true,
							message: '请输入手机号码',
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change', 'blur'],
						},
						{
							pattern: CONFIG.MOBILE_REGEXP,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: '请输入11位手机号',
							trigger: ['change', 'blur']
						}
					],
					code: [{
						required: true,
						min: 6,
						message: '请输入验证码',
						trigger: ['blur']
					}, {
						pattern: /^\d{6}$/,
						// 正则检验前先将值转为字符串
						transform(value) {
							return String(value);
						},
						message: '请输入6位数字验证码',
						trigger: ['change', 'blur'],
					}]
				},
				ClearSetInterval: null,
				// 禁止div点击事件触发
				noPointer: false
			};
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.uniRequest({
							url: 'accouninfo/binding',
							method: 'get',
							data: {
								phone: this.form.phone,
								code: this.form.code
							},
							success: (res) => {
								console.log(res,'res')
								if (res.data === 'success') {
									this.Func_Con();
								}
							}
						})
					} else {
						console.log('验证失败');
					}
				});
			},
			// 获取手机验证码
			getverify(e) {
				let regPos = CONFIG.MOBILE_REGEXP;
				if (regPos.test(this.form.phone)) {
					this.noPointer = true;
					let count = 60;
					this.message_verify = '倒计时' + count;
					this.ClearSetInterval = setInterval(() => {
						--count;
						this.message_verify = '倒计时' + count;
						if (count < 1) {
							clearInterval(this.ClearSetInterval)
							this.message_verify = '获取验证码';
							this.noPointer = false;
						}
					}, 1000)
					this.uniRequest({
						url: 'accouninfo/sendmsg',
						method: 'get',
						data: {
							phone: this.form.phone
						},
						success: (res) => {
							if (res.data === 'success') {

							}
						}
					})
				}
			},
			// 授权
			Func_Con() {
				let res = GetQueryValue('code');
				this.uniRequest({
					url: 'accouninfo/getInfo?code=' + res,
					success: (res) => {
						console.log('获取的token')
						if (res.code === 0) {
							if (!res.data.info.name && !res.data.info.cardNo) {
								uni.navigateTo({
									url: '/pages/Information/Error'
								})
							} else if(res.data.account.cellphone && Number(res.data.info.status) === 0) {
								uni.navigateTo({
									url: '/pages/Information/audit'
								})
							}
							if(res.data.account.cellphone && res.data.info.cardNo && res.data.info.name) {
								let radio = null;
								if(res.data.info.businessType === '供应商') {
									radio = 1;
								} else if(res.data.info.businessType === '采购商') {
									radio = 2;
								} else if(res.data.info.businessType === '摆渡车') {
									radio = 3;
								} else if(res.data.info.businessType === '司机/伙计') {
									radio = 4;
								} else if(res.data.info.businessType === '新发地办公和临时人员') {
									radio = 5;
								}
								uni.navigateTo({
									url: '/pages/Information/Success?radio=' + radio
								})
							}
						}

					}
				})
			}
			// 解析URL 参数
			// getUrlParam(name) {
			// 	let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
			// 	let r = window.location.search.substr(1).match(reg)
			// 	if (r != null) {
			// 		return unescape(r[2])
			// 	}
			// 	return null
			// },
			// // 发送code 获取信息
			// postCode(code) {
			// 	uni.request({
			// 		url: 'https://www.example.com/request', //发送code给后台。
			// 		success: (res) => {
			// 			//res里面包含用户信息  openid等
			// 		}
			// 	});
			// }
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		// 获取用户信息
		onShow() {

			this.Func_Con()
		}
		// onLoad() {
		// 	// 获取URL 上code
		// 	const code = this.getUrlParam('code')
		// 	// 判断是否存在code
		// 	if (code == null || code == '') {
		// 		// 重新获取code
		// 		// console.log(code)
		// 		window.location.href = wx_url
		// 	} else {
		// 		// 发送code
		// 		this.postCode(code)
		// 	}
		// }
	}
</script>

<style lang="scss">
	#login {
		width: 100vw;
		height: 100vh;
		background-color: #fff;
		// position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;

		.login_tit {
			width: 100%;
			height: 424rpx;
			position: relative;

			.Right_img {
				width: 656rpx;
				height: 424rpx;
				position: absolute;
				top: 0;
				right: 0;
			}

			.Left_img {
				position: absolute;
				left: 40rpx;
				bottom: 0rpx;
				display: flex;
				align-items: center;

				>image {
					width: 308rpx;
					height: 108rpx;
				}

				>text {
					font-size: 60rpx;
					font-family: "TRENDS";
					color: rgba(91, 192, 53, 1);
					margin-left: 30rpx;
				}
			}
		}

		.login_from {
			width: 630rpx;
			height: 328rpx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 0px 20rpx 0px rgba(211, 208, 208, 0.5);
			border-radius: 14rpx;
			margin-top: 70rpx;
			display: flex;
			flex-direction: column;
			// align-items: center;
			justify-content: center;
			padding: 0rpx 44rpx;

			.u-form {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
			}

			.Con_box {
				flex: 1;
				display: flex;
				align-items: center;
				padding-bottom: 20rpx;

				.phone {
					>image {
						width: 32rpx;
						height: 38rpx;
					}
				}

				.Con_box_phone {
					display: flex;
					border-bottom: 1px solid #E8E8E8;
					margin-left: 36rpx;
					padding-bottom: 20rpx;

					>.u-input {
						input {
							font-size: 28rpx;
							font-weight: 400;
							color: rgba(197, 197, 197, 1);
							text-align: left;
							height: 60rpx;
						}
					}

					.Con_box_verify {
						font-size: 28rpx;
						font-weight: 400;
						color: rgba(107, 214, 67, 1);
					}

					.pointer_verify {
						pointer-events: none;
					}
				}
			}
		}

		.btn {
			width: 630rpx;
			height: 80rpx;
			background: linear-gradient(270deg, rgba(106, 210, 67, 1) 0%, rgba(112, 233, 66, 1) 100%);
			border-radius: 44rpx;
			font-size: 36rpx;
			font-weight: 600;
			color: rgba(255, 255, 255, 1);
			margin-top: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
