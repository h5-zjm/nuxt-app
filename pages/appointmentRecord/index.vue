<template>
	<view class="all">
		<view class="title">
			<view class="time">
				时间
			</view>
			<view class="tradingArea">
				交易区
			</view>
			<view class="licensePlate">
				车牌
			</view>
			<view class="type">
				类型
			</view>
			<view class="status">
				状态
			</view>
		</view>
		<view class="shipment">
			<view class="sellGoods seleceted">
				<view class="time">
					2020.07.21
				</view>
				<view class="tradingArea">
					周转一区
				</view>
				<view class="licensePlate">
					京A12345
				</view>
				<view class="type">
					卖货
				</view>
				<view class="status">
					<view class="mode">
						未进场
					</view>
					<view class="icon">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			<view class="sellGoods">
				<view class="time">
					2020.07.21
				</view>
				<view class="tradingArea">
					周转一区
				</view>
				<view class="licensePlate">
					京A12345
				</view>
				<view class="type">
					卖货
				</view>
				<view class="status">
					<view class="mode">
						已进场
					</view>
					<view class="icon">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>	
			<view class="sellGoods">
				<view class="time">
					2020.07.21
				</view>
				<view class="tradingArea">
					周转一区
				</view>
				<view class="licensePlate">
					京A12345
				</view>
				<view class="type">
					卖货
				</view>
				<view class="status">
					<view class="mode">
						已作废
					</view>
					<view class="icon">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>
<!-- 上货 -->
		<view class="shipment loadGoods">
			<view class="sellGoods seleceted">
				<view class="time">
					2020.07.21
				</view>
				<view class="tradingArea">
					周转一区
				</view>
				<view class="licensePlate">
					京A12345
				</view>
				<view class="type">
					上货
				</view>
				<view class="status">
					<view class="mode">
						未进场
					</view>
					<view class="icon">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			<view class="sellGoods">
				<view class="time">
					2020.07.21
				</view>
				<view class="tradingArea">
					周转一区
				</view>
				<view class="licensePlate">
					京A12345
				</view>
				<view class="type">
					上货
				</view>
				<view class="status">
					<view class="mode">
						已进场
					</view>
					<view class="icon">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>	
			<view class="sellGoods">
				<view class="time">
					2020.07.21
				</view>
				<view class="tradingArea">
					周转一区
				</view>
				<view class="licensePlate">
					京A12345
				</view>
				<view class="type">
					上货
				</view>
				<view class="status">
					<view class="mode">
						已作废
					</view>
					<view class="icon">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.all {
		min-height: 100vh;
		.title {
			display: flex;
			font-size: 28rpx;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight: 500;
			color: #313131;
			justify-content: space-between;
			height: 80rpx;
			box-sizing: border-box;
			padding: 0 20rpx;
			>view {
				width: 20%;
				text-align: center;
				height: 80rpx;
				line-height: 80rpx;
			}
		}
		.shipment {
			padding-bottom: 46rpx;
			background-color: #fff;
			.sellGoods {
				font-size: 24rpx;
				display: flex;
				justify-content: space-between;
				height: 72rpx;
				box-sizing: border-box;
				padding: 0 20rpx;
				background-color: #fff;
				>view {
					width: 20%;
					text-align: center;
					height: 100%;
					line-height: 71rpx;
					box-sizing: border-box;
					border-bottom: 1rpx solid #ededed;
				}
				.status {
					display: flex;
					justify-content: space-around;
					.mode {
						height: 72rpx;
						line-height: 71rpx;
					}
					.icon {
						height: 72rpx;
						line-height: 71rpx;
					}
				}
			}
			.seleceted {
				color: #378EFF;
			}
		}
		.loadGoods {
			margin-top: 16rpx;
		}
	}
</style>
