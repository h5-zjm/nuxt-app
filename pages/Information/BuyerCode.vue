<template>
	<view id="VipCode">
		<view class="VipCode_Con">
			<view class="code">买家交易码</view>
			<image :src="img_src" mode="aspectFit"></image>
			<view class="scan">微信扫一扫</view>
		</view>
	</view>
</template>

<script>
	import {GetQueryValue} from '../../common/common.js'
	export default {
		data() {
			return {
				img_src: ''
			};
		},
		methods: {
			getImg() {
				this.uniRequest({
					url: 'accouninfo/getmyTradeCode',
					success: (res) => {
						this.img_src = res.data ? ('data:image/png;base64,' + res.data) : '';
					}
				})
			},
			RouterVisity(){
				this.uniRequest({
					url: 'accouninfo/getInfo',
					success: (res) => {
						if(res.code === 0) {
							if (!res.data.account.cellphone) {
								uni.navigateTo({
									url: '/pages/login/index'
								})
							} else if (!res.data.info.name && !res.data.info.cardNo) {
								uni.navigateTo({
									url: '/pages/Information/Error'
								})
							} else if(Number(res.data.info.status) === 0 && res.data.info.businessType !== '新发地办公和临时人员'){
								uni.navigateTo({
									url: '/pages/Information/audit'
								})
							} else if (res.data.account.cellphone && Number(res.data.info.status) === 0 && res.data.info.businessType === '新发地办公和临时人员') {
								uni.navigateTo({
									url: '/pages/Information/xfdAudit'
								})
							} else {
								this.getImg()
							}
						}else if(res.code === 500) {
							uni.clearStorageSync()
							this.getToken()
						}
						if(res.data.code === 500) {
							uni.clearStorageSync()
							this.getToken()
						}
					}
				})
			},
			getToken(){
				console.log(111)
				let res = GetQueryValue('code');
				uni.request({
					url: 'https://wechat.daizhangfang.net/wechat/getToken?code=' + res,
					success:(res)=>{
						if(res.data.data) {
							uni.setStorageSync('h5token',res.data.data)
							this.RouterVisity()
						} else {
							uni.navigateTo({
								url: '/pages/Information/abnormal'
							})
						}
					},
					
				})
			}
		},
		onShow() {
			if (uni.getStorageSync('h5token') === undefined || uni.getStorageSync('h5token') === null || uni.getStorageSync('h5token') === '') {
				this.getToken()
			} else {
				this.RouterVisity()
			}
			// this.getToken()
		}
	}
</script>

<style lang="scss">
	#VipCode {
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
				padding-top: 40rpx;
				margin-bottom: 36rpx;
			}

			>image {
				width: 400rpx;
				height: 400rpx;
			}

			.scan {
				padding-top: 60rpx;
				font-size: 32rpx;
				font-weight: 400;
				color: rgba(49, 49, 49, 1);
			}
		}
	}
</style>
