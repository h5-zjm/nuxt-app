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
			<view class="sellGoods" v-for="(item,index) in list" :key='item.id' @click="goDetail(item)">
				<view class="time">
					{{item.subscribeTime}}
				</view>
				<view class="tradingArea">
					{{item.tradeSector}}
				</view>
				<view class="licensePlate">
					{{item.carNum}}
				</view>
				<view class="type">
					<view v-if="item.type === 1">
						卖货
					</view>
					<view v-if="item.type === 2">
						买货
					</view>
				</view>
				<view class="status">
					<view class="mode">
						<view v-if="item.status === 1">
							未进场
						</view>
						<view v-if="item.status === 2">
							已进场
						</view>
						<view v-if="item.status === 3">
							已删除
						</view>
						<view v-if="item.status === 4">
							已离场
						</view>
					</view>
					<view class="icon">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
          <view v-show="isLoadMore">
                <uni-load-more :status="loadStatus" ></uni-load-more>
          </view>
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
                loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
                isLoadMore:false,  //是否加载中
				offset: 0,
				// list:[],
				list: [],
				code: ''
			}
		},
		created() {
			// this.getUser()
			if(!uni.getStorageSync('h5token')) {
				this.getToken()
			} else {
				this.getUser()
			}
			// this.getData()
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log('页面路径带的参数',option); //打印出上个页面传递的参数。
			this.code = option.code
			
		},

		methods: {
			// 获取code
			getcode() {
				
			},
			getToken(){
				console.log(111)
				let res = GetQueryValue('code');
				uni.request({
					url: 'https://testxfdm.daizhangfang.net/wechat/getToken?code=' + res,
					success:(res)=>{
						if(res.data.data) {
							uni.setStorageSync('h5token',res.data.data)
							this.getUser()
						} else {
							uni.showToast({
								title: '授权失败,请重新进入页面',
								icon: 'none'
							})
						}
					},
					
				})
			},
			// 获取用户信息
			getUser() {
				this.uniRequest({
					// url: 'http://39.107.95.50:80/h5/accouninfo/getInfo?code=081AnO000jHa7K19RI200kXKlt2AnO0H',
					url: 'accouninfo/getInfo',
					success: (res) => {
						console.log('获取用户信息',res)
						if (!res.data.account.cellphone) {
							uni.navigateTo({
								url: '/pages/login/index'
							})
						} else if (!res.data.info.name && !res.data.info.cardNo) {
							uni.navigateTo({
								url: '/pages/Information/Error'
							})
						} else if (res.data.account.cellphone !== '' && Number(res.data.info.status) === 0) {
							uni.navigateTo({
								url: '/pages/Information/audit'
							})
						} else {
							this.getData()
						}
						
						
					}
				})
			},
			getData() {
				
				// 获取页面数据
				this.uniRequest({
					url: 'carSubscribe/getList',
					// url: 'http://39.107.95.50:80/h5/carSubscribe/getList',
					method: 'GET',
					data: {
						offset: this.offset
					},
					success: (res) => {
						console.log('列表返回', res)
						for(let i = 0;i<res.data.length;i++) {
							res.data[i].subscribeTime = res.data[i].subscribeTime.substring(0,10)
						}
						this.list = res.data
						this.isLoadMore = false
					}
				})
			},
			onReachBottom(){  //上拉触底函数
				  if(!this.isLoadMore){  //此处判断，上锁，防止重复请求
						this.isLoadMore=true
						this.offset+=10
						this.getData()
				  }
			},
			goDetail(item) {
				console.log('传递额参数',item)
				// let data = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url:'/pages/appointmentRecord/appointDetail?id='+item.id
				})
			}
		}
	}
</script>

<style lang="scss">
	.all {
		min-height: 100vh;

		.title {
			display: flex;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
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
