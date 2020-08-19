<template>
	<view id="abnormal">
		<view class="main">
			<image src="/static/images/error.png" mode=""></image>
			<view class="success">
				提示
			</view>
			<view class="description">
				系统异常，请退出页面稍后在进！
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
		methods: {
			LocationInfo() {
				uni.navigateTo({
					url: '/pages/Information/index'
				})
			}
		},
		onShow() {
			
		}
	}
</script>

<style lang="scss">
	#abnormal {
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
