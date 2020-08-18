<template>
	<view class="all">
		<view class="productInformate" v-for="item in listData" :key='item.id'>
			<view class="category">
				<view class="title">
					品类:
				</view>
				<view class="valueLabel">
					{{item.goodsName}}
				</view>
			</view>
			<view class="weight">
				<view class="title">
					重量:
				</view>
				<view class="valueLabel">
					{{item.weight}}
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
					{{item.price}}
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
					{{item.placeOfOrigin}}
				</view>
			</view>
			<view class="origin">
				<view class="title">
					生产经营者:
				</view>
				<view class="valueLabel">
					{{item.producers}}
				</view>
			</view>
		</view>
		<view class="total">
			<view class="title">
				总计:
			</view>
			<view class="valueLabel">
				{{totalWeight}}千克
			</view>
			<view class="unit">
				{{orderTotalPrice}}元
			</view>
		</view>
		<view class="customerInformation">
			<view class="category">
				<view class="title">
					卖家信息:
				</view>
				<view class="valueLabel">
					{{sellerName}}
				</view>
				<view class="unit">
					{{sellerPhone}}
				</view>
			</view>
			<view class="weight">
				<view class="title">
					买家信息:
				</view>
				<view class="valueLabel">
					{{buyerName}}
				</view>
				<view class="unit">
					{{buyerMobile}}
				</view>
			</view>
			<view class="amount">
				<view class="title">
					交易时间:
				</view>
				<view class="valueLabel">
					{{tradingTime}}
				</view>
			</view>
			<view class="origin">
				<view class="title">
					交易地点:
				</view>
				<view class="valueLabel">
					{{tradingSite}}
				</view>
			</view>
			<view class="origin">
				<view class="title">
					单号:
				</view>
				<view class="valueLabel">
					{{orderNo}}
				</view>
			</view>
			<view class="total">
				<view class="title">
					状态:
				</view>
				<view class="valueLabel">
					{{status}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: '',
				sellerName: '',
				sellerPhone: '',
				buyerName: '',
				buyerMobile: '',
				tradingTime: '',
				tradingSite: '',
				orderNo: '',
				status: '',
				orderID:'',
				placeOfOrigin:'',
				producers: '',
				listData:'',
				totalWeight: '',
				orderTotalPrice:''
			};
		},
		created() {
			
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			this.orderID = option.id
			this.getData()
		},
		methods:{
			getData() {
				this.uniRequest({
					url: 'order/selectMyOrderDetails?orderId='+this.orderID,
					// url: 'http://39.107.95.50/h5/order/selectMyOrderDetails?orderId=' + this.orderID,
					success: (res) => {
						this.listData = res.data.orderListVos
						console.log('查看溯源交易单数据',res)
						this.sellerName = res.data.sellerName
						this.sellerPhone = res.data.sellerMobile
						this.buyerName = res.data.buyerName
						this.buyerMobile = res.data.buyerMobile
						this.tradingTime = res.data.tradingTime
						this.tradingSite = res.data.tradingSite
						this.orderNo = res.data.orderNo
						this.totalWeight = res.data.totalWeight
						this.orderTotalPrice = res.data.orderTotalPrice
						if(res.data.isGoOut === 0) {
							this.status = '出厂'
						}
						if(res.data.isGoOut === 1) {
							this.status = '未出厂'
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.all {
	width: 100%;
	.productInformate {
		width: 100%;
		margin-top: 10rpx;
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
	}
		.total {
			width: 100%;
			height: 90rpx;
			margin-top: 20rpx;
			border-bottom: 1rpx solid #EDEDED;
			font-size: 32rpx;
			padding-left: 20rpx;
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
