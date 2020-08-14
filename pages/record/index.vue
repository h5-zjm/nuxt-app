<template>
	<view id="record">
		<view class="table_box">
			<u-table>
				<view class="theader">
					<u-tr>
						<u-th >时间</u-th>
						<u-th>交易商品</u-th>
						<u-th>总重量(Kg)</u-th>
						<u-th>总金额(元)</u-th>
					</u-tr>
				</view>				
				
				<view class="thbody" v-for="(item,index) in 4" :key="index" @click="Clickbox(item,index)">
					<u-tr>
						<u-td>7.21 22:12</u-td>
						<u-td>白萝卜</u-td>
						<u-td>200</u-td>
						<u-td>72</u-td>
						<u-icon name="arrow-right" color="#D6D6D6" size="28"></u-icon>
					</u-tr>
				</view>
			</u-table>
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
			Clickbox(item,index){
				console.log(index,'index')
				console.log(item,'item')
			}
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
