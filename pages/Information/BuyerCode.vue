<template>
	<view id="VipCode">
		<view class="VipCode_Con">
			<view class="code">买家交易码</view>
			<image :src="img_src" mode=""></image>
			<view class="scan">微信扫一扫</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img_src: ''
			};
		},
		onShow(){
			this.uniRequest({
				url: 'accouninfo/getmyTradeCode',
				success:(res)=>{
					this.img_src = res.data ? res.data : '';
				}
			})
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
		width:620rpx;
		height:1026rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 20rpx 0px rgba(196,196,196,0.5);
		border-radius:22rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.code {
			font-size:48rpx;
			font-weight:600;
			color:rgba(49,49,49,1);
			padding-top: 106rpx;
			margin-bottom: 36rpx;
		}
		>image {
			width:386rpx;
			height:380rpx;
		}
		.scan {
			padding-top: 60rpx;
			font-size:32rpx;
			font-weight:400;
			color:rgba(49,49,49,1);
		}
	}
}
</style>
