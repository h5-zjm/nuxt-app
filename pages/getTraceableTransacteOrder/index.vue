<template>
	<view class="all">
		<view class="productInformate">
			<view class="category">
				<view class="title">
					品类:
				</view>
				<view class="valueLabel">
					大白菜
				</view>
			</view>
			<view class="weight">
				<view class="title">
					重量:
				</view>
				<view class="valueLabel">
					500
				</view>
				<view class="unit">
					Kg
				</view>
			</view>
			<view class="amount">
				<view class="title">
					金额:
				</view>
				<view class="valueLabel">
					500
				</view>
				<view class="unit">
					元
				</view>
			</view>
			<view class="origin">
				<view class="title">
					产地:
				</view>
				<view class="valueLabel">
					江西省九江市庐山县xx村
				</view>
			</view>
			<view class="origin">
				<view class="title">
					生产经营者:
				</view>
				<view class="valueLabel">
					老王白菜基地
				</view>
			</view>
			<view class="total">
				<view class="title">
					总计:
				</view>
				<view class="valueLabel">
					1000Kg
				</view>
				<view class="unit">
					1600元
				</view>
			</view>
		</view>
		<view class="customerInformation">
			<view class="category">
				<view class="title">
					卖家信息:
				</view>
				<view class="valueLabel">
					王**
				</view>
				<view class="unit">
					180****2321
				</view>
			</view>
			<view class="weight">
				<view class="title">
					买家信息:
				</view>
				<view class="valueLabel">
					王**
				</view>
				<view class="unit">
					180****2321
				</view>
			</view>
			<view class="amount">
				<view class="title">
					交易时间:
				</view>
				<view class="valueLabel">
					2020.7.24
				</view>
				<view class="unit">
					09:21:23
				</view>
			</view>
			<view class="origin">
				<view class="title">
					交易地点:
				</view>
				<view class="valueLabel">
					苹果区
				</view>
			</view>
			<view class="origin">
				<view class="title">
					单号:
				</view>
				<view class="valueLabel">
					JY202007240921231234
				</view>
			</view>
			<view class="total">
				<view class="title">
					状态:
				</view>
				<view class="valueLabel">
					未出场
				</view>
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
	.productInformate {
		width: 100%;
		float: left;
		margin-top: 5rpx;
		background-color: #fff;
		box-sizing: border-box;
		padding: 0 30rpx;
		.category,.weight,.amount,.origin {
			width: 100%;
			height: 90rpx;
			border-bottom: 1rpx solid #EDEDED;
			font-size: 32rpx;
			color: #313131;
			.title {
				height: 90rpx;
				line-height: 90rpx;
				float: left;
			}
			.valueLabel {
				height: 90rpx;
				line-height: 90rpx;
				float: left;
				margin-left: 20rpx;
			}
			.unit {
				height: 90rpx;
				line-height: 90rpx;
				float: left;
			}
		}
		.total {
			width: 100%;
			height: 90rpx;
			border-bottom: 1rpx solid #EDEDED;
			font-size: 32rpx;
			color: #313131;
			font-weight: 600;
			.title {
				height: 90rpx;
				line-height: 90rpx;
				float: left;
			}
			.valueLabel {
				height: 90rpx;
				line-height: 90rpx;
				float: left;
			}
			.unit {
				height: 90rpx;
				line-height: 90rpx;
				float: left;
				margin-left: 132rpx;
			}
		}
	}
	.customerInformation {
		width: 100%;
		float: left;
		margin-top: 20rpx;
		background-color: #fff;
		box-sizing: border-box;
		padding: 0 30rpx;
		.category,.weight,.amount,.origin {
			width: 100%;
			height: 90rpx;
			border-bottom: 1rpx solid #EDEDED;
			font-size: 32rpx;
			color: #313131;
			.title {
				height: 90rpx;
				line-height: 90rpx;
				float: left;
			}
			.valueLabel {
				height: 90rpx;
				line-height: 90rpx;
				float: left;
				margin-left: 20rpx;
			}
			.unit {
				height: 90rpx;
				line-height: 90rpx;
				float: left;
			}
		}
		.total {
			width: 100%;
			height: 90rpx;
			border-bottom: 1rpx solid #EDEDED;
			font-size: 32rpx;
			color: #313131;
			font-weight: 600;
			.title {
				height: 90rpx;
				line-height: 90rpx;
				float: left;
			}
			.valueLabel {
				height: 90rpx;
				line-height: 90rpx;
				float: left;
			}
			.unit {
				height: 90rpx;
				line-height: 90rpx;
				float: left;
				margin-left: 132rpx;
			}
		}
	}
}
</style>
