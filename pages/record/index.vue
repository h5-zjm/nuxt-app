<template>
	<view id="record">
		<view class="table_box">
			<u-table>
				<view class="theader">
					<u-tr>
						<u-th :ShowBorder="true">时间</u-th>
						<u-th :ShowBorder="true">交易商品</u-th>
						<u-th :ShowBorder="true">总重量(Kg)</u-th>
						<u-th :ShowBorder="true">总金额(元)</u-th>
					</u-tr>
				</view>				
				
				<view class="thbody" v-for="(item,index) in List" :key="index" @click="Clickbox(item,index)">
					<u-tr>
						<u-td :ShowBorder="true">{{item.tradingTime}}</u-td>
						<u-td :ShowBorder="true">{{item.goodsName}}</u-td>
						<u-td :ShowBorder="true">{{item.weight}}</u-td>
						<u-td :ShowBorder="true">{{item.price}}</u-td>
						<u-icon name="arrow-right" color="#D6D6D6" size="28"></u-icon>
					</u-tr>
				</view>
			</u-table>
		</view>
	</view>
</template>

<script>
	import {
		GetQueryValue
	} from '../../common/common.js'
	export default {
		data() {
			return {
				List: [],
				offset: 0,
				identity: 0
			};
		},
		methods: {
			Clickbox(item,index){
				console.log(index,'index')
				console.log(item,'item')
				uni.navigateTo({
					url: '/pages/getTraceableTransacteOrder/index'
				})
			},
			getBuyGoods(){
				this.uniRequest({
					url: 'order/selectMyOrderList',
					data: {
						offset: this.offset,
						identity: this.identity
					},
					success:(res)=>{
						this.List = res.data.rows || [];
					}
				})
			},
			// 买货记录
			BuyGoods(){
				let res = GetQueryValue('code');
				this.uniRequest({
					url: 'accouninfo/getInfo?code=' + res,
					success:(res)=>{
						if (!res.data.account.cellphone) {
							uni.navigateTo({
								url: '/pages/login/index'
							})
						}
						if (!res.data.info.name && !res.data.info.cardNo) {
							uni.navigateTo({
								url: '/pages/Information/Error'
							})
						}
						if (res.data.info.name && res.data.info.cardNo && res.data.account.cellphone) {
							this.getBuyGoods()
						}
					}
				})
			}
		},
		onShow(){
			this.BuyGoods()
		}
	}
</script>

<style lang="scss">
	#record {
		.Con_header {
			display: flex;
			justify-content: space-around;
			padding: 30rpx 0rpx;

			>text {
				font-size: 28rpx;
				font-weight: 500;
				color: rgba(49, 49, 49, 1);
			}
		}

		.Con_main {
			.Con {
				display: flex;
				justify-content: space-around;

				>view {
					font-size: 24rpx;
					font-weight: 400;
					color: rgba(49, 49, 49, 1);
				}
			}
		}
		
		.table_box {
			background-color: #fff;
			
			.u-table {
				border: none;
				.theader {
					.u-tr {
						background-color: #F7F7F7;
						padding: 20rpx 30rpx 20rpx 0rpx;
					}
					.u-th {
						background-color: #F7F7F7;
						font-size:28rpx;
						font-weight:500;
						color:rgba(49,49,49,1);
					}
				}
				
				.thbody {
					border-bottom: 1px solid #F4F4F4;
					.u-tr {
						padding: 20rpx;
						font-size:24rpx;
						font-weight:400;
						color:rgba(49,49,49,1);
						// border-bottom: 1px solid #ccc;
					}
					.border {
						// padding: 20rpx 20rpx 20rpx 0rpx;
					}
				}
				view.thbody:last-child {
					border: none;
				}
			}
		}
	}
</style>
