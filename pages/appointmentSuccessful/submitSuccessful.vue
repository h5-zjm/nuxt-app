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
			// 获取URL上的参数
            getQueryVariable(variable){
                var query = window.location.search.substring(1);
                var vars = query.split("&");
                for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                    if(pair[0] == variable){return pair[1];}
                }
                return(false);
            },
			goToTransacteOrder() {
				let id = this.getQueryVariable("cardNo");
				uni.navigateTo({
					url: 'https://wechat.daizhangfang.net/pages/appointmentSuccessful/submitSuccessful?modelId=0&id='+id
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
