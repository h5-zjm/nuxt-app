<template>
	<view id="BuyerCode">
		<view class="VipCode_Con">
			<view class="code">供应商</view>
			<image :src="form.img_src" mode="aspectFit"></image>
			<view class="scan">
				<u-form :model="form" ref="uForm" label-width="auto">
					<u-form-item prop="time">
						<view class="Con_box">
							<text>姓&nbsp;&nbsp;&nbsp;名：</text>
							<view>{{form.name}}</view>
						</view>
					</u-form-item>
					<u-form-item prop="time">
						<view class="Con_box">
							<text>手机号：</text>
							<view>{{form.mobile}}</view>
						</view>
					</u-form-item>
					<u-form-item prop="time">
						<view class="Con_box">
							<text>性&nbsp;&nbsp;&nbsp;别：</text>
							<view>{{form.gender}}</view>
						</view>
					</u-form-item>
					<u-form-item prop="time">
						<view class="Con_box">
							<text>年&nbsp;&nbsp;&nbsp;龄：</text>
							<view>{{form.age}}</view>
						</view>
					</u-form-item>
					<u-form-item prop="time">
						<view class="Con_box">
							<text>身份证号：</text>
							<view>{{form.cardNo}}</view>
						</view>
					</u-form-item>
				</u-form>
			</view>
		</view>
	</view>
</template>

<script>
	import {GetQueryValue} from '../../common/common.js'
	export default {
		data() {
			return {
				form: {
					img_src: '',
					name: '',
					mobile: '',
					gender: '',
					age: '',
					cardNo: ''
				},
				rules: {
					// name: [{
					// 	required: true,
					// 	message: '请输入姓名',
					// 	// 可以单个或者同时写两个触发验证方式 
					// 	trigger: ['change', 'blur'],
					// }],
					// intro: [{
					// 	min: 5,
					// 	message: '简介不能少于5个字',
					// 	trigger: 'change'
					// }]
				},
			};
		},
		methods: {
			submit() {
				this.uniRequest({
					url: `accouninfo/getMyCode`,
					method: 'get',
					success: (res) => {
						this.form.img_src = res.data ? ('data:image/png;base64,' + res.data) : '';
					}
				})
			},
			// 获取数据
			getCode() {
				this.uniRequest({
					url: 'accouninfo/getInfo',
					success: (res) => {
						this.form.name = res.data.info.name;
						this.form.mobile = res.data.info.mobile;
						this.form.gender = res.data.info.gender;
						this.form.age = res.data.info.age;
						this.form.cardNo = res.data.info.cardNo;
					}
				})
			},
			// 登录权限
			login() {
				let res = GetQueryValue('code');
				this.uniRequest({
					url: 'accouninfo/getInfo?code=' + res,
					success: (res) => {
						if (res.code === 0) {
							console.log(Number(res.data.info.status,'Number'))
							if (!res.data.account.cellphone) {
								uni.navigateTo({
									url: '/pages/login/index'
								})
							} else if (!res.data.info.name && !res.data.info.cardNo) {
								uni.navigateTo({
									url: '/pages/Information/Error'
								})
							} else if(Number(res.data.info.status) === 0) {
								uni.navigateTo({
									url: '/pages/Information/audit'
								})
							} else {
								this.submit()
								this.getCode()
							}
							
						}
					}
				})
			}
		},
		onShow() {
			this.login()
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss">
	#BuyerCode {
		width: 100vw;
		height: 100vh;
		background-color: #37B3FF;
		display: flex;
		justify-content: center;
		align-items: center;

		.VipCode_Con {
			width: 620rpx;
			height: 1026rpx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 0px 20rpx 0px rgba(196, 196, 196, 0.5);
			border-radius: 22rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.code {
				font-size: 48rpx;
				font-weight: 600;
				color: rgba(49, 49, 49, 1);
				padding-top: 106rpx;
				margin-bottom: 36rpx;
			}

			>image {
				width: 400rpx;
				height: 400px;
			}

			.scan {
				width: 100%;
				padding: 0rpx 44rpx;

				.Con_box {
					display: flex;
				}
			}
		}
	}
</style>
