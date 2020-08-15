<template>
	<view id="informationShow_supplier">
		<u-form :model="form" ref="uForm" label-width="auto">
			<view class="tit">基本信息</view>
			<view class="Con">
				<u-form-item prop="time">
					<view class="Con_box">
						<text>姓名：</text>
						<view>{{form.name}}</view>
					</view>
				</u-form-item>
				<u-form-item prop="time">
					<view class="Con_box">
						<text>手机号：</text>
						<view>{{form.phone}}</view>
					</view>
				</u-form-item>
				<u-form-item prop="time">
					<view class="Con_box">
						<text>身份证号：</text>
						<view>{{form.cardNo}}</view>
					</view>
				</u-form-item>
				<u-form-item prop="time">
					<view class="Con_box">
						<text>性别：</text>
						<view>{{form.gender}}</view>
					</view>
				</u-form-item>
				<u-form-item prop="time">
					<view class="Con_box">
						<text>年龄：</text>
						<view>{{form.age}}</view>
					</view>
				</u-form-item>
				<u-form-item prop="time">
					<view class="Con_box">
						<text>户籍所在地：</text>
						<view>{{(form.registProvince ? form.registProvince : '') + (form.registCity ? ('-' + form.registCity) : '') + (form.registArea ? ('-' + form.registArea) : '')}}</view>
					</view>
				</u-form-item>
				<u-form-item prop="time">
					<view class="Con_box">
						<text>居住地：</text>
						<view>{{(form.curentProvince ? form.curentProvince : '') + (form.curentCity ? ('-' + form.curentCity) : '') + (form.curentArea ? ('-' + form.curentArea) : '')}}</view>
					</view>
				</u-form-item>
				<u-form-item prop="time">
					<view class="Conbox" style="transform: translateX(-8rpx);">
						<text>现住地（详细地址）：</text>
						<text>{{form.currentPlace}}</text>
					</view>
				</u-form-item>
			</view>
			<view class="tit">身份（必选）</view>
			<view class="Con">
				<u-form-item prop="time">
					<view class="Con_box" style="transform: translateX(-8rpx);">
						<view class="Con_tit">
							<view></view>
						</view>
						<view>供应商（前来卖货））</view>
					</view>
				</u-form-item>
				<u-form-item prop="time">
					<view class="Con_box">
						<text>企业名称：</text>
						<view>{{form.businessName}}</view>
					</view>
				</u-form-item>
				<u-form-item prop="time">
					<view class="Con_box">
						<text>营业执照：</text>
						<view>{{form.businessCode}}</view>
					</view>
				</u-form-item>
				<u-form-item prop="time">
					<view class="Con_box">
						<text>主营业务：</text>
						<view>{{form.businessCatalog}}</view>
					</view>
				</u-form-item>
				<u-form-item prop="time">
					<view class="Con_box">
						<text>入驻时间：</text>
						<view>{{form.inTime}}</view>
					</view>
				</u-form-item>
				<u-form-item prop="time">
					<view class="Con_box">
						<text>经营区域：</text>
						<view>{{form.manageArea}}</view>
					</view>
				</u-form-item>
			</view>
			<view class="Con_box" v-for="(item,index) in PartnerList" :key="index">
				<view class="tit">伙计1信息</view>
				<view class="Con">
					<u-form-item prop="time">
						<view class="Con_box">
							<text>伙计1姓名：</text>
							<view>{{item.staffName}}</view>
						</view>
					</u-form-item>
					<u-form-item prop="time">
						<view class="Con_box">
							<text>伙计1身份证：</text>
							<view>{{item.staffCardNo}}</view>
						</view>
					</u-form-item>
					<u-form-item prop="time">
						<view class="Con_box">
							<text>伙计1手机号：</text>
							<view>{{item.staffMobile}}</view>
						</view>
					</u-form-item>
					<u-form-item prop="time">
						<view class="Con_box">
							<text>伙计1现住址：</text>
							<view>{{item.staffAddr}}</view>
						</view>
					</u-form-item>
				</view>
			</view>
		</u-form>
		<view class="btn" @click="submit">
			<view class="btn_box">编辑</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					phone: '',
					cardNo: '',
					gender: '',
					age: '',
					// 原籍
					registProvince: '',
					registCity: '',
					registArea: '',
					// 先居住地
					curentProvince: '',
					curentCity: '',
					curentArea: '',
					// 现居住地
					currentPlace: '',
					businessName: '',
					businessCode: '',
					businessCatalog: '',
					inTime: '',
					manageArea: '',
					PartnerList: [{
						staffName: '',
						staffCardNo: '',
						staffMobile: '',
						staffAddr: ''
					}]
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
				// 编辑
				Active_radio: null
			}
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						uni.navigateTo({
							url: '/pages/Information/index?Active_radio=' + this.Active_radio
						})
					} else {
						console.log('验证失败');
					}
				});
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		// 获取参数
		onLoad(res) {
			if (res.radio) {
				this.Active_radio = parseInt(res.radio);
			}
		},
		// 获取数据
		onShow() {
			this.uniRequest({
				url: 'accouninfo/getInfo',
				success: (res) => {
					if (!res.data.account.cellphone) {
						uni.navigateTo({
							url: '/pages/login/index'
						})
					} else if (!res.data.info.name || !res.data.info.cardNo) {
						uni.navigateTo({
							url: '/pages/Information/index'
						})
					} else {
						this.form = {
							name: res.data.info.name,
							phone: res.data.account.cellphone,
							cardNo: res.data.info.cardNo,
							gender: res.data.info.gender,
							age: res.data.info.age,
							// 原籍
							registProvince: res.data.info.registProvince,
							registCity: res.data.info.registCity,
							registArea: res.data.info.registArea,
							// 先居住地
							curentProvince: res.data.info.curentProvince,
							curentCity: res.data.info.curentCity,
							curentArea: res.data.info.curentArea,
							// 现居住地
							currentPlace: res.data.info.currentPlace,
							businessName: res.data.info.businessName,
							businessCode: res.data.info.businessCode,
							businessCatalog: res.data.info.businessCatalog,
							inTime: res.data.info.inTime,
							manageArea: res.data.info.manageArea,
							PartnerList: res.data.info.PartnerList
						}
					}
				}
			})
		}
	}
</script>

<style lang="scss">
	#informationShow_supplier {
		.tit {
			font-size: 32rpx;
			font-weight: 600;
			color: rgba(49, 49, 49, 1);
			padding: 20rpx 30rpx;
		}

		.Con {
			background-color: #fff;
			padding: 0rpx 30rpx;

			.Con_box {
				display: flex;
				width: 100%;

				>text {
					margin-right: 10rpx;
					transform: translateX(-8rpx);
				}

				>text.star::after {
					content: '*';
					color: #ff0000;
					font-weight: 600;
					padding-left: 5rpx;
				}

				input {
					text-align: right;
					width: 100%;
				}

				.u-form-left {
					display: none;
				}

				>view {
					font-size: 28rpx;
					font-weight: 400;
					color: rgba(49, 49, 49, 1);
				}

				.Con_tit {
					display: flex;
					align-items: center;
					margin-right: 30rpx;

					>view {
						width: 24rpx;
						height: 24rpx;
						background: rgba(0, 158, 255, 1);
						border-radius: 50%;
					}
				}
			}

		}

		.Con_goods {
			margin-top: 20rpx;
		}

		.Uploader_box {
			background-color: #fff;
			margin-top: 20rpx;
			display: flex;
			padding: 0rpx 30rpx;

			>view {
				padding: 20rpx 0rpx;

				>view {
					font-size: 32rpx;
					font-weight: 400;
					color: rgba(49, 49, 49, 1);
					margin-bottom: 24rpx;
				}
			}

			.Uploader_box_left {
				margin-right: 186rpx;

				>view::after {
					content: '*';
					color: #ff0000;
					font-weight: 600;
					padding-left: 5rpx;
				}
			}
		}

		.Checkbox {
			margin-top: 20rpx;
			background-color: #fff;
			padding: 20rpx 30rpx;
			display: flex;

			>view {
				font-size: 24rpx;
				font-weight: 400;
				color: rgba(228, 39, 39, 1);
			}
		}

		.btn {
			width: 100%;
			display: flex;
			justify-content: center;
			padding: 28rpx 0rpx 34rpx 0rpx;

			.btn_box {
				width: 690rpx;
				height: 80rpx;
				background: rgba(0, 158, 255, 1);
				border-radius: 8rpx;
				font-size: 32rpx;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				text-align: center;
				line-height: 80rpx;
			}
		}
	}
</style>
