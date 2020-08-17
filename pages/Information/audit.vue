<template>
	<view id="audit">
		<view class="main">
			<image src="/static/images/error.png" mode=""></image>
			<view class="success">
				提示
			</view>
			<view class="description">
				审核中，请先购买马甲
			</view>
			<!-- <view class="button">
				<u-button type="primary" @click="LocationInfo">完善个人健康信息</u-button>
			</view> -->
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
	#audit {
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
