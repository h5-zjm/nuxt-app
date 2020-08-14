<template>
	<view id="chartsOne">
		<view class="Chart_head">
			<view class="Chart_box" v-for="(item,index) in Chart_List" :key="index" :class="{'Active_box':Chart_Active === index}"
			 @click="ChartClick(index,item)">
				<view class="">{{item.title}}</view>
				<view class="border_box" v-if="Chart_Active === index"></view>
			</view>
		</view>

		<!-- 图表 -->
		<view class="Chart_Con_box" v-if="Chart_Active === 0">
			<view class="tit_box">实时数据</view>
			<view class="Con_box">
				<view class="Con_box_1">
					<view class="box"></view>
					<view class="tit">上货车数</view>
				</view>
				<view class="Con_box_2">
					<view class="box"></view>
					<view class="tit">卖货车数</view>
				</view>
				<view class="Con_box_3">
					<view class="box"></view>
					<view class="tit">场内人数</view>
				</view>
			</view>
			<view class="Chart_Con">
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts"></canvas>
			</view>
		</view>


		<!-- 表格 -->
		<view class="table_box" v-if="Chart_Active === 0">
			<u-table>
				<view class="theader">
					<u-tr>
						<u-th :showTh="showTh">数据统计</u-th>
						<!-- <u-th :showTh="showTh" v-for="(item,index) in TableData" :key="index">{{item.name}}</u-th> -->
						<u-th :showTh="showTh">上货车数</u-th>
						<u-th :showTh="showTh">卖货车数</u-th>
						<!-- <u-th :showTh="showTh">场内总车数</u-th> -->
						<u-th :showTh="showTh">场内总人数</u-th>
					</u-tr>
				</view>

				<view class="thbody" v-for="(item,index) in TableData" :key="index">
					<u-tr>
						<u-td :class="{'gray': index % 2 === 1}" :showTd="showTd">{{item.name}}</u-td>
						<u-td v-for="(i,j) in item.data" :key="j" v-if="j <3" :class="{'gray': index % 2 === 1}" :showTd="showTd">{{i}}</u-td>
						<!-- <u-td :class="{'gray': index % 2 === 1}" :showTd="showTd">白萝卜</u-td>
						<u-td :class="{'gray': index % 2 === 1}" :showTd="showTd">200</u-td>
						<u-td :class="{'gray': index % 2 === 1}" :showTd="showTd">72</u-td> -->
					</u-tr>
				</view>
			</u-table>
		</view>

	</view>
</template>

<script>
	import uCharts from '../../js_sdk/u-charts/u-charts/u-charts.min.js';
	import {
		dimension_data,
		Array_Func_Filter
	} from '../../common/common.js'
	var _self;
	var canvaColumn = null;
	export default {
		data() {
			return {
				// 显示border
				showTh: true,
				showTd: true,

				// 图表
				Chart_Active: 0,
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
					// {
					// 	title: '7日来货量、交易量分析'
					// },
					// {
					// 	title: '7日人车流量分析'
					// }
				],
				// 表格数据
				TableData: [],
				// 图表
				Echarts_Data: [],
				TableTr: [],
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: ''
			};
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
			// this.getServerData();
			let Column = {
				categories: [],
				series: []
			};
			// this.showColumn("canvasColumn", Column);
		},
		methods: {
			ChartClick(index, item) {
				this.Chart_Active = index;
				if (index === 0) {
					uni.navigateTo({
						url: '/pages/ChartPage/chartsOne'
					});
					this.Table_Data()
				} else if (index === 1) {
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
				}
			},
			// 图表
			getServerData() {
				uni.request({
					url: 'https://www.easy-mock.com/mock/5cc586b64fc5576cba3d647b/uni-wx-charts/chartsdata2',
					data: {},
					success: function(res) {
						console.log(res.data.data)
						//下面这个根据需要保存后台数据，我是为了模拟更新柱状图，所以存下来了
						// _self.serverData = res.data.data;
						_self.serverData = res.data.data;
						let Column = {
							categories: [],
							series: []
						};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						Column.categories = res.data.data.Column.categories;
						//这里的series数据是后台做好的，如果您的数据没有和前面我注释掉的格式一样，请自行拼接数据
						Column.series = res.data.data.Column.series;
						// _self.showColumn("canvasColumn", Column);
					},
					fail: () => {
						console.log("网络错误，小程序端请检查合法域名");
					},
				});
			},
			showColumn(canvasId, chartData) {
				canvaColumn = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					title: {
						name: '实时数据',
						fontSize: 20
					},
					legend: {
						show: false,
						position: 'top',
						float: 'left',
						margin: 10
					},
					padding: [15, 15, 4, 10],
					fontSize: 11,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					animation: true,
					categories: _self.Echarts_Data,
					// categories: ["水果区", "周转一区", "芒果交易区"],
					series: chartData,

					// series: [{
					// 	"name": "成交量1",
					// 	"data": [15,20,45, 37,37,37,37,37]
					// }, {
					// 	"name": "成交量2",
					// 	"data": [30,40,25, 14]
					// }],
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						axisLine: true
					},
					dataLabel: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							width: _self.cWidth * _self.pixelRatio * 0.18 / chartData.length
							// width: 10
						}
					}
				});
			},
			changeData() {
				canvaColumn.updateData({
					series: _self.serverData.ColumnB.series,
					categories: _self.serverData.ColumnB.categories
				});
			},
			// 表格数据请求
			Table_Data() {
				// console.log(`${this.PLATFORM}statistics/carsAndPeopleNumber`, 'url')]
				console.log(1111)
				uni.request({
					// url: `${this.PLATFORM}statistics/carsAndPeopleNumber`,
					url: 'http://wechat.daizhangfang.net/statistics/carsAndPeopleNumber',
					method: 'get',
					success: (data) => {
						if (data.data.code === 0) {

							console.log(data, 'data')
							this.TableData = data.data.data[0];

							this.Echarts_Data = [];
							
							
							let Data = JSON.parse(JSON.stringify(data.data.data[0]));
							
							// this.Echarts_Data = data.data[0];
							data.data.data[0].forEach((item, index) => {
								this.Echarts_Data.push(item.name)
							})
							// console.log(this.Echarts_Data,'Echarts_Data')
							
							Array_Func_Filter(Data,(res=>{
								console.log(res,'res')
								res.forEach((item,index)=>{
									if(index === 0){
										item.color = "#2fc25b"
									} else if(index === 2){
										item.color = "#facc14"
									}
								})
								this.showColumn("canvasColumn", res);
								
							}))

							
						}

					}
				})
			}
		},
		created() {
			this.Table_Data()
		},
		onShow() {
			console.log(888888)
		}
		
	}
</script>

<style lang="scss">
	#chartsOne {
		width: 100%;
		height: 100%;
		overflow: hidden;

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
			justify-content: space-around;

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


		.Chart_Con_box {
			background-color: #fff;
			margin: 20rpx 0rpx;

			.tit_box {
				font-size: 32rpx;
				font-weight: 500;
				color: rgba(0, 0, 0, 0.85);
				padding: 20rpx 0rpx 0rpx 28rpx;
				// margin-bottom: 20rpx;
			}

			.Con_box {
				display: flex;
				padding: 20rpx 0rpx 0rpx 28rpx;

				.Con_box_1,
				.Con_box_2,
				.Con_box_3 {
					display: flex;
					align-items: center;
					margin-right: 26rpx;

					>.box {
						width: 16rpx;
						height: 16rpx;
						background: linear-gradient(180deg, rgba(115, 222, 179, 1) 0%, rgba(0, 165, 99, 1) 100%);
					}

					>.tit {
						font-size: 24rpx;
						font-weight: 400;
						color: rgba(0, 0, 0, 0.45);
						margin-left: 10rpx;
					}
				}

				.Con_box_2 {
					>.box {
						background: linear-gradient(90deg, rgba(1, 103, 232, 1) 0%, rgba(0, 198, 255, 1) 100%);
					}
				}

				.Con_box_3 {
					>.box {
						background: linear-gradient(90deg, rgba(255, 132, 0, 1) 0%, rgba(255, 192, 0, 1) 100%);
					}
				}
			}

			.charts {
				width: 750upx;
				height: 500upx;
				background-color: #FFFFFF;
			}
		}

		.table_box {
			padding: 0rpx 20rpx 100rpx 20rpx;
			box-sizing: border-box;
			background-color: #fff;
			padding-top: 20rpx;
			min-height: 100%;

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
	}
</style>


<!-- "data": [
		{
			"list": [0,2,3,4],
			"name": "上货车数",
			"area": "水果区"
		},
		{
			"list": [0,2,3,4],
			"name": "卖货车数",
			"area": "芒果交易区"
		},
	}] -->
