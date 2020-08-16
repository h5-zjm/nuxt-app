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
				新发地七日人车流量分析
			</view>
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
		</view>
<!-- 		<view class="table">
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
	var canvaLineA=null;
	var _self;
	export default {
		data() {
			return {
				Chart_Active: 5,
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
			this.getServerData()
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
			this.getServerData()
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
					url: 'https://wechat.daizhangfang.net/statistics/humanTraffic',
					data:{
					},
					success: function(res) {
						console.log('返回数据',res)
						let LineA={categories:[],series:[]};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						
						LineA.categories = res.data.categories;
						LineA.series = res.data.series
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
			confirmStart(e) {
				console.log('时间', e)
				this.startTime = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute
			},
			confirmEnd(e) {
				// console.log(e)
				this.endTime = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute
				this.getServerData();
			},
			touchLineA(e){
				canvaLineA.scrollStart(e);
			},
			moveLineA(e) {
				canvaLineA.scroll(e);
			},
			touchEndLineA(e) {
				canvaLineA.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			// 获取当前时间
		}
	}
</script>

<style lang="scss">
	#ChartPage {
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
				text-align: center;
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
