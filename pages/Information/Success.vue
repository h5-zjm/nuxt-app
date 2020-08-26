<template>
	<view id="Success">
		<view class="main">
			<image src="/static/images/success.png" mode=""></image>
			<view class="success">
				操作成功
			</view>
			<view class="description">
				已完善个人信息，如需进门请填写预约信息。
			</view>
			<view class="button">
				<view class="search_message" @click="LocationInfo">查看个人信息</view>
				<view class="search_qr" @click="LocationVip">查看会员二维码</view>
				<view class="search_buy" @click="LocationBuy">查看交易二维码</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				radio: null
			};
		},
		onLoad(res) {
			if (res.radio) {
				this.radio = parseInt(res.radio);
			}
		},
		methods: {
			// 个人信息
			LocationInfo() {
				console.log(this.radio, 'radio')
				let url = '';
				if (this.radio === 1) {
					url = '/pages/Information/informationShow_supplier?radio=' + this.radio
				} else if (this.radio === 2) {
					url = '/pages/Information/informationShow_procurer?radio=' + this.radio
				} else if (this.radio === 3) {
					url = '/pages/Information/informationShow_ferry?radio=' + this.radio
				} else if (this.radio === 4) {
					url = '/pages/Information/informationShow_buddy?radio=' + this.radio
				} else if (this.radio === 5) {
					url = '/pages/Information/informationShow_xfd?radio=' + this.radio
				}

				uni.navigateTo({
					url: url
				})
			},
			// 会员二维码
			LocationVip() {
				uni.navigateTo({
					url: '/pages/Information/VipCode'
				})
			},
			// 交易二维码
			LocationBuy() {
				uni.navigateTo({
					url: '/pages/Information/BuyerCode'
				})
			}
		},
		onShow(){
			this.uniRequest({
				url: 'accouninfo/getInfo',
				success: (res) => {
					if (res.data.account.cellphone && Number(res.data.info.status) === 0 && this.radio !== 5) {
						uni.navigateTo({
							url: '/pages/Information/audit'
						})
					} else {
						uni.navigateTo({
							url: '/pages/Information/xfdAudit'
						})
					}
				}
			})
		}
	}
</script>

<style lang="scss">
	#Success {
		width: 100%;
		height: 100vh;
		box-sizing: border-box;
		padding: 30rpx 40rpx 130rpx 40rpx;

		.main {
			width: 100%;
			height: 100%;
			background-color: #fff;
			border-radius: 20rpx;
			background-color: #fff;
			overflow: hidden;
			text-align: center;

			image {
				display: inline-block;
				width: 166rpx;
				height: 166rpx;
				margin-top: 160rpx;
			}

			.success {
				margin-top: 40rpx;
				font-size: 52rpx;
				font-weight: 600;
				color: #000;
			}

			.description {
				margin-top: 34rpx;
				font-size: 28rpx;
				color: #959595;
			}

			.button {
				width: 90%;
				margin-left: 5%;
				// margin-top: 290rpx;
				margin-top: 50rpx;

				.search_message,
				.search_qr,
				.search_buy {
					width: 100%;
					height: 80rpx;
					background: rgba(20, 120, 255, 1);
					border-radius: 16rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 28rpx;
					font-weight: 600;
					color: rgba(255, 255, 255, 1);
					margin-bottom: 20rpx;
				}

				.search_qr {
					background-color: #12AEFE;
				}

				.search_buy {
					background-color: #666666;
				}
			}
		}
	}
</style>
