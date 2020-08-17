<template>
	<view class="all">
		<view class="productInformate">
			<view class="category">
				<view class="title">
					品类:
				</view>
				<view class="valueLabel">
					{{category}}
				</view>
			</view>
			<view class="weight">
				<view class="title">
					重量:
				</view>
				<view class="valueLabel">
					{{weight}}
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
					{{price}}
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
					{{placeOfOrigin}}
				</view>
			</view>
			<view class="origin">
				<view class="title">
					生产经营者:
				</view>
				<view class="valueLabel">
					{{producers}}
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
		<view class="botton">
			<u-button type="primary" class="edit">修改</u-button>
			<u-button class="deleted">删除</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: '',
				category: '',
				weight: '',
				price: '',
				sellerName: '',
				sellerPhone: '',
				buyerName: '',
				buyerMobile: '',
				tradingTime: '',
				tradingSite: '',
				orderNo: '',
				status: '',
				placeOfOrigin:'',
				producers: '',
			};
		},
		created() {
			this.getData()
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			this.orderID = option.id
		},
		methods:{
			// 获取地址栏里的数据
            getQueryVariable(variable){
                var query = window.location.search.substring(1);
                var vars = query.split("&");
                for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                    if(pair[0] == variable){return pair[1];}
                }
                return(false);
            },
			getData() {
				uni.request({
					url: 'https://wechat.daizhangfang.net/h5/order/selectMyOrderDetails?orderId=' +this.orderID,
					// url: 'https://wechat.daizhangfang.net/h5/order/selectMyOrderDetails?orderId=' +this.orderID,
					method:'GET',
					success: (res) => {
						console.log('查看溯源交易单数据',res)
						this.category = res.data.orderListVos[0].goodsName
						this.weight = res.data.orderListVos[0].weight
						this.price = res.data.orderListVos[0].price
						this.sellerName = res.data.sellerName
						this.sellerPhone = res.data.sellerMobile
						this.buyerName = res.data.buyerName
						this.buyerMobile = res.data.buyerMobile
						this.tradingTime = res.data.tradingTime
						this.tradingSite = res.data.tradingSite
						this.orderNo = res.data.orderNo
						this.placeOfOrigin = res.data.orderListVos[0].placeOfOrigin
						this.producers = res.data.orderListVos[0].producers
						if(res.data.status == 1) {
							this.status = '未进场'
						}
						if(res.data.status == 2) {
							this.status = '已进场'
						}
						if(res.data.status == 3) {
							this.status = '已删除'
						}
						if(res.data.status == 4) {
							this.status = '已离场'
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
