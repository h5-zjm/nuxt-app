<template>
	<view id="ChartPage">
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
					交易时间
				</view>
				<view class="interTimes">
					<u-input v-model="startTime" :type="type" :border="border" @click="showFirst" />
					<u-picker mode="time" v-model="show" :params="params" @confirm="confirmStart"></u-picker>
				</view>
				<view class="interTime">
					至
				</view>
				<view class="interTimes">
					<u-input v-model="endTime" :type="type" :border="border" @click="showEnd = true" />
					<u-picker mode="time" v-model="showEnd" :params="params" @confirm="confirmEnd"></u-picker>
				</view>
			</view>
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
		</view>
		<view class="table">
			<u-table>
				<view class="theader">
					<u-tr>
						<u-th>数据统计</u-th>
						<u-th>上货车数</u-th>
						<u-th>卖货车数</u-th>
						<u-th>进场人次</u-th>
					</u-tr>
				</view>

				<view class="thbody">
					<u-tr v-for="(item,index) in tableData" :key="index" @click="Clickbox(item,name)">
						<u-td>{{item.name}}</u-td>
						<u-td>{{item.data.loadingNum}}</u-td>
						<u-td>{{item.data.sellGoodsNum}}</u-td>
						<u-td>{{item.data.numberOfPresentNum}}</u-td>
					</u-tr>
				</view>
			</u-table>
		</view>
	</view>
</template>

<script>
	import uCharts from '../../js_sdk/u-charts/u-charts/u-charts.min.js';
	var _self;
	var canvaLineA=null;
	export default {
		data() {
			return {
				Chart_Active: 3,
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
				tableData:[],
			};
		},
		created() {
			this.getNow()
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
			getServerData(){
				uni.request({
					url: 'http://192.168.100.215:18088/statistics/entryData',
					// url: 'http://39.107.95.50/statistics/entryData',
					method: 'GET',
					data: {
						beginTime: this.startTime,
						endTime: this.endTime
					},
					success: function(res) {
						console.log('返回数据',res.data.data)
						console.log('数组',res.data.data)
						_self.tableData = res.data.data.table
						let LineA={categories:[],series:[]};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						LineA.categories=res.data.data.categories;
						LineA.series=res.data.data.series;
						// console.log('横坐标',partition)
						_self.showLineA("canvasLineA",LineA);
					},
					fail: () => {
						_self.tips="网络错误，小程序端请检查合法域名";
					},
				});
			},
			showLineA(canvasId,chartData){
				canvaLineA=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize:11,
					legend:{show:true},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					enableScroll: false,//开启图表拖拽功能
					xAxis: {
						disableGrid:false,
						type:'grid',
						gridType:'dash',
						itemCount:4,
						scrollShow:true,
						scrollAlign:'left',
					},
					yAxis: {
						gridType:'dash',
						splitNumber:5,
						min:10,
						max:180,
						format:(val)=>{return val.toFixed(0)}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
					extra: {
						tooltip:{
							bgColor:'#000000',
							bgOpacity:0.7,
							gridType:'dash',
							dashLength:8,
							gridColor:'#1890ff',
							fontColor:'#FFFFFF',
							horizentalLine:true,
							xAxisLabel:true,
							yAxisLabel:true,
							labelBgColor:'#DFE8FF',
							labelBgOpacity:0.95,
							labelAlign:'left',
							labelFontColor:'#666666'
						}
					},
				});
			},
			touchLineA(e) {
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			confirmStart(e) {
				console.log('时间', e)
				this.startTime = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute
			},
			confirmEnd(e) {
				// console.log(e)
				this.endTime = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute
				this.getServerData();
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
				this.getServerData();
			},
			showFirst() {
				console.log('第一个开始时间被点击')
				this.show = true
			}
		}
	}
</script>

<style lang="scss">
	#ChartPage {
		.Chart_head::-webkit-scrollbar {
			display: none;
			overflow-x:scroll;
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

		.table {
			margin-top: 16rpx;
			box-sizing: border-box;
			padding: 30rpx;
			background-color: #fff;
			u-table {
				.theader {
					u-tr{
						u-th {
							background-color: #73A0FA;
							color: #fff;
						}
					}
				}
			}
		}
	}
</style>
