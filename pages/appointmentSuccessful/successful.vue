<template>
	<view class="all">
		<view class="main">
			<image src="/static/images/success.png" mode=""></image>
			<view class="success">
				预约成功
			</view>
			<view class="description">
				已完成预约，仅限该车牌号当日进场，过期作废
			</view>
			<view class="button">
				<u-button type="primary" @click="goToTransacteOrder">查看订单详情</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderID: ''
			};
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			this.OrderID = option.id
		},
		methods:{
			goToTransacteOrder() {
				// let id = this.getQueryVariable("cardNo");
				uni.navigateTo({
					url: '/pages/appointmentRecord/appointDetail?modelId=0&id='+this.OrderID
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
