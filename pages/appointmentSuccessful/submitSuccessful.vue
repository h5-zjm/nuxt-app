<template>
	<view class="all">
		<view class="main">
			<image src="/static/images/success.png" mode=""></image>
			<view class="success">
				提交成功
			</view>
			<view class="description">
				已生成交易溯源单
			</view>
			<view class="button">
				<u-button type="primary" @click="goToTransacteOrder">查看交易订单</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goToTransacteOrder() {
				uni.navigateTo({
					url: '/pages/appointmentSuccessful/submitSuccessfulmodelId=0&id='+res.id
				});
			}
		}
	}
</script>

<style lang="scss">
.all {
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
			margin-top: 260rpx;
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
			margin-top: 290rpx;
		}
	}
}
</style>
