<template>
	<view id="chartThree">
		<view class="Chart_head">
			<view class="Chart_box" v-for="(item,index) in Chart_List" :key="index" :class="{'Active_box':Chart_Active === index}"
			 @click="ChartClick(index,item)">
				<view class="">{{item.title}}</view>
				<view class="border_box" v-if="Chart_Active === index"></view>
			</view>
		</view>
		<view class="qiun-charts">
			<view class="times">
				<view class="interTime">
					进场时间
				</view>
				<view class="interTimes">
					<u-input v-model="startTime" :type="type" :border="border" @click="showFirst" />
					<u-picker mode="time" v-model="show" :params="params" default-time="2020/07/02 08:00" @confirm="confirmStart"></u-picker>
				</view>
				<view class="interTime">
					至
				</view>
				<view class="interTimes">
					<u-input v-model="endTime" :type="type" :border="border" @click="showEnd = true" />
					<u-picker mode="time" v-model="showEnd" :params="params" @confirm="confirmEnd"></u-picker>
				</view>
			</view>
			<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing"></canvas>
		</view>
		<view class="table">
			<u-table>
				<view class="theader">
					<u-tr>
						<u-th style="background-color: #2B85E4;">序号</u-th>
						<u-th>品类</u-th>
						<u-th>吨数</u-th>
						<u-th>金额</u-th>
						<u-th>平均单价</u-th>
					</u-tr>
				</view>

				<view class="thbody">
					<u-tr v-for="(item,index) in tableData" :key="index" @click="Clickbox(item,name)">
						<u-td v-if="index!=0">{{index}}</u-td>
						<u-td v-if="index==0">---</u-td>
						<u-td>{{item.goodsName}}</u-td>
						<u-td>{{item.weightAll}}</u-td>
						<u-td>{{item.priceAll}}</u-td>
						<u-td>{{item.avgPrice}}</u-td>
					</u-tr>
				</view>
			</u-table>
		</view>
		<!-- 		交易量数据
		<view class="qiun-charts">
			<view class="times">
				<view class="interTime">
					交易时间
				</view>
				<view class="interTimes">
					<u-input v-model="startTimeT" :type="type" :border="border" @click="show1 = true" />
					<u-picker mode="time" v-model="show1" :params="params" @confirm="confirmStartT"></u-picker>
				</view>
				<view class="interTime">
					至
				</view>
				<view class="interTimes">
					<u-input v-model="endTimeT" :type="type" :border="border" @click="showEnd1 = true" />
					<u-picker mode="time" v-model="showEnd1" :params="params" @confirm="confirmEndT"></u-picker>
				</view>
			</view>
			<canvas canvas-id="canvasRing1" id="canvasRing1" class="charts" @touchstart="touchRing"></canvas>
		</view>
		<view class="table">
			<u-table>
				<view class="theader">
					<u-tr>
						<u-th>序号</u-th>
						<u-th>品类</u-th>
						<u-th>进场车数</u-th>
						<u-th>进场吨数</u-th>
					</u-tr>
				</view>

				<view class="thbody">
					<u-tr v-for="(item,index) in tableData" :key="index" @click="Clickbox(item,name)">
						<u-td v-if="index!=0">{{index}}</u-td>
						<u-td v-if="index==0">---</u-td>
						<u-td>{{item.name}}</u-td>
						<u-td>{{item.data}}</u-td>
						<u-td>{{item.certificateNum}}</u-td>
					</u-tr>
				</view>
			</u-table>
		</view> -->
	</view>
</template>

<script>
	import uCharts from '../../js_sdk/u-charts/u-charts/u-charts.min.js';
	// import Picker from '../../components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
	var _self;
	var canvaColumn = null;
	var canvaRing = null;
	var canvaRing1 = null;
	export default {
		// components: {
		// 	Picker
		// },
		data() {
			return {
				Chart_Active: 2,
				Chart_List: [{
						title: '当前车数人数'
					},
					{
						title: '来货量数据'
					},
					{
						title: '交易量数据'
					},
					{
						title: '进场数据'
					},
					{
						title: '7日来货量、交易量分析'
					},
					{
						title: '7日人车流量分析'
					}
				],
				// 来货量数据时间选择器
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: false
				},
				show: false,
				showEnd: false,
				show1: false,
				showEnd1: false,
				startTime: '',
				endTime: '',
				startTimeT: '',
				endTimeT: '',
				// 图表
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				tableData: [],
			};
		},
		created() {
			this.getNow()
			this.confirmStart()
		},
		onBackPress(options) {
			console.log(5555555)
			console.log('from:' + options.from)
			// return true;
			return true
		},
		onLoad() {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
		},
		methods: {
			ChartClick(index, item) {
				this.Chart_Active = index;
				if (index === 0) {
					for(var i = 0;i<=2;i++){
						uni.navigateTo({
						    url: '/pages/ChartPage/chartsOne'
						});
					}
					// this.Table_Data()
				} else if(index === 1) {
					uni.navigateTo({
					    url: '/pages/ChartPage/index'
					});
				} else if (index === 2) {
					uni.navigateTo({
					    url: '/pages/ChartPage/chartThree'
					});
				} else if (index === 3) {
					uni.navigateTo({
						url:'/pages/ChartPage/approachData'
					})
				} else if (index === 4) {
					uni.navigateTo({
						url:'/pages/ChartPage/quantity'
					})
				} else if (index === 5) {
					uni.navigateTo({
						url:'/pages/ChartPage/peopleCarData'
					})
				}
			},
			getRingServerData() {
				console.log('饼图2')
				uni.request({
					url: 'http://wechat.daizhangfang.net/statistics/transactionData',
					method: 'GET',
					data: {
						beginTime: this.startTime,
						endTime: this.endTime
					},
					success: (res) => {
						console.log(res,'1111111')
						if(res.data.data.table.length > 0){
							res.data.data.table.forEach((item,index)=>{
								let num = item.weightAll;
								item.weightAll = item.tonAll;
								item.tonAll = num;
							})
						}
						this.tableData = res.data.data.table
						let Ring = {
							series: [],
							totalCarNumber: ''
						};
						// console.log(3333)
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去

						Ring.series = [{
							"name": "一班",
							"data": 50
						}, {
							"name": "二班",
							"data": 30
						}, {
							"name": "三班",
							"data": 20
						}, {
							"name": "四班",
							"data": 18
						}, {
							"name": "五班",
							"data": 8
						}];

						
						Ring.series = res.data.data.figure;
						console.log(Ring.series,'Ring.series')
						console.log('数据', res)
						Ring.totalCarNumber = res.data.data.totalPrice;
						// Ring.totalCarNumber = 30;
						console.log('返回的数据', Ring)
						this.showRing("canvasRing", Ring);
					},
					fail: () => {
						this.tips = "网络错误，小程序端请检查合法域名";
					},
				});
			},
			showRing(canvasId, chartData) {
				canvaColumn = new uCharts({
					$this: this,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend: true,
					title: {
						name: '总交易金额',
						color: '#7cb5ec',
						fontSize: 14,
						offsetY: 5,
					},
					subtitle: {
						name: chartData.totalCarNumber,
						color: '#666666',
						fontSize: 15,
						offsetY: 5,
					},
					extra: {
						pie: {
							offsetAngle: -45,
							ringWidth: 40,
							labelWidth: 15
						}
					},
					background: '#FFFFFF',
					pixelRatio: 1,
					series: chartData.series,
					animation: true,
					width: this.cWidth,
					height: this.cHeight,
					disablePieStroke: true,
					dataLabel: true,
				});
			},
			touchRing(e) {
				canvaRing.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},
			confirmStart(e) {
				console.log('时间', e)
				this.startTime = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute
				
				this.getRingServerData();
			},
			confirmEnd(e) {
				// console.log(e)
				this.endTime = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute
				this.getRingServerData();
			},
			// 获取当前时间
			getNow() {
				let date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				let timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
				this.startTime = year + '-' + month + '-' + day + ' ' + '00:00';
				this.endTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
				this.startTimeT = year + '-' + month + '-' + day + ' ' + '00:00';
				this.endTimeT = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
				console.log('时间获取完成')
				this.getRingServerData();
			},
			showFirst() {
				console.log('第一个开始时间被点击')
				this.show = true
			}
		}
	}
</script>

<style lang="scss">
	#chartThree {
		.Chart_head::-webkit-scrollbar {
			display: none
		}

		.Chart_head {
			width: 100%;
			height: 82rpx;
			background: rgba(255, 255, 255, 1);
			display: flex;
			align-items: center;
			white-space: nowrap;
			overflow-x: scroll;
			box-sizing: content-box;
			// justify-content: space-around;

			.Chart_box {
				font-size: 24rpx;
				font-weight: 400;
				color: rgba(49, 49, 49, 1);
				margin-right: 36rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			.Active_box {
				font-size: 28rpx;
				font-weight: 600;
				color: rgba(83, 169, 255, 1);

			}

			.border_box {
				width: 52rpx;
				height: 6rpx;
				background: linear-gradient(90deg, rgba(88, 167, 255, 1) 0%, rgba(33, 209, 255, 1) 100%);
				border-radius: 4rpx;
				margin-top: 10rpx;
			}
		}

		.charts {
			width: 750upx;
			height: 500upx;
			background-color: #FFFFFF;
		}

		.qiun-charts {
			background-color: #fff;
			margin-top: 16rpx;

			.times {
				margin-top: 20rpx;
				height: 76rpx;
				line-height: 76rpx;
				padding: 0 30rpx;
				display: flex;
				justify-content: space-around;

				.interTime {
					height: 76rpx;
					line-height: 76rpx;
				}
			}
		}

		.u-table {
			// border: none;
			border-radius: 15rpx;
			overflow: hidden;
		
			.theader {
				.u-tr {
					.u-th {
						height: 68rpx;
						background: rgba(115, 160, 250, 1);
						font-size: 20rpx;
						font-weight: 600;
						color: rgba(255, 255, 255, 1);
					}
				}
			}
		
			.thbody {
				.u-tr {
					.u-td {
						// width: 100px;
						height: 68rpx;
						border: 1px solid #F1F1F1;
						// white-space: nowrap;
						// font-size: 12rpx;
					}
		
					.white {
						background-color: #fff;
					}
		
					.gray {
						background-color: #F1F1F1;
					}
				}
		
			}
		}
	}
</style>
