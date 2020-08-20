<template>
	<view class="all">
		<view class="main">
			<image src="/static/images/refuse.png" mode=""></image>
			<view class="description">
				您不是新发地注册供应商，没有销售权限。
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
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
			margin-top: 40rpx;
			font-size:36rpx;
			font-weight:400;
			color:rgba(149,149,149,1);
		}
		.button {
			width: 90%;
			margin-left: 5%;
			margin-top: 290rpx;
		}
	}
}
</style>
