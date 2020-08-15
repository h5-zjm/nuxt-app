<template>
	<view class="all">
		<view class="title">
			状态：未进场
		</view>
		<view class="personInformation">
			<view class="userName">
				<view class="markKey">
					姓名：
				</view>
				<view class="valueWorth">
					王美玲
				</view>
			</view>
			<view class="IDnumber">
				<view class="markKey">
					身份证号：
				</view>
				<view class="valueWorth">
					1306811421131253
				</view>
			</view>
			<view class="entranceTime">
				<view class="markKey">
					预约进门时间：
				</view>
				<view class="valueWorth">
					2020.07.21
				</view>
			</view>
			<view class="tradingArea">
				<view class="markKey">
					交易区：
				</view>
				<view class="valueWorth">
					芒果区
				</view>
			</view>
		</view>
		<view class="goodsInformation">
			<view class="category">
				<view class="markKey">
					货品品类：
				</view>
				<view class="valueWorth">
					大白菜
				</view>
			</view>
			<view class="origin">
				<view class="markKey">
					产地：
				</view>
				<view class="valueWorth">
					国产
				</view>
			</view>
			<view class="specificOrigin">
				<view class="markKey">
					具体产地：
				</view>
				<view class="valueWorth">
					河北省保定市离县
				</view>
			</view>
			<view class="quantity">
				<view class="markKey">
					数量：
				</view>
				<view class="valueWorth">
					20吨
				</view>
			</view>
			<view class="model">
				<view class="markKey">
					车型：
				</view>
				<view class="valueWorth">
					重型卡车
				</view>
			</view>
			<view class="numberPlate">
				<view class="markKey">
					车牌号：
				</view>
				<view class="valueWorth">
					京H12345
				</view>
			</view>
			<view class="cargoPhoto">
				<view class="cargo">
					<view class="title">
						货物照片
					</view>
					<view class="images">
						<image src="" mode=""></image>						
					</view>
				</view>
				<view class="testCertificate">
					<view class="title">
						检测证明
					</view>
					<view class="images">
						<image src="" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="certificateConformity">
				查看《食用农产品合格证》
			</view>
			<view class="edit">
				<u-button type="primary">修改预约</u-button>
				
			</view>
			<view class="cancel">
				<u-button @click="Location">取消预约</u-button>
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
			Location(){
				uni.navigateTo({
					url: '/pages/ChartPage/chartsOne'
				})
			}
		},
		created(){
			// uni.navigateTo({
			// 	url: '/pages/ChartPage/chartsOne'
			// })
		},
		onBackPress(options) {
			console.log(5555555)
			console.log('from:' + options.from)
			// return true;
			return true
		},
	}
</script>

<style lang="scss">
.all {
	min-height: 100vh;
	width: 100%;
	.title{
		width: 100%;
		height: 84rpx;
		line-height: 84rpx;
		font-size: 32rpx;
		box-sizing: border-box;
		padding-left: 30rpx;
		color: #FF8F0A;
	}
	.personInformation {
		box-sizing: border-box;
		padding: 0 30rpx;
		background-color: #fff;
		>view{
			height: 92rpx;
			line-height: 92rpx;
			border-bottom: 1rpx solid #EDEDED;
			display: flex;
			justify-content: flex-start;
		}
	}
	.goodsInformation {
		box-sizing: border-box;
		padding: 0 30rpx;
		margin-top: 16rpx;
		background-color: #fff;
		>view{
			height: 92rpx;
			line-height: 92rpx;
			border-bottom: 1rpx solid #EDEDED;
			display: flex;
			justify-content: flex-start;
		}
		.cargoPhoto {
			display: flex;
			justify-content: space-between;
			height: 400rpx;
			>view {
				width: 284rpx;
				.title {
					text-align: left;
					padding-left: 0;
					color: #313131;
					font-size: 32rpx;
					height: 90rpx;
					line-height: 90rpx;
				}
				.images {
					width: 284rpx;
					image {
						display: block;
						width: 284rpx;
						height: 284rpx;
					}
				}
			}
		}
	}
	.bottom {
		width: 100%;
		height: 320rpx;
		padding: 30rpx;
		margin-top: 16rpx;
		background-color: #fff;
		.certificateConformity {
			width: 100%;
			font-size: 32rpx;
			color: #009EFF;
			float: left;
		}
		.edit {
			margin-top: 40rpx;
			width: 100%;
			float: left;
		}
		.cancel {
			margin-top: 20rpx;
			width: 100%;
			float: left;
		}
	}
}
</style>
