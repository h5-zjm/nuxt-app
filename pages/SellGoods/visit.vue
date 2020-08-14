<template>
	<view id="visit">
		<u-form :model="form" ref="uForm" label-width="auto">
			<view class="tit">进门信息</view>
			<view class="Con">
				<u-form-item prop="time">
					<view class="Con_box">
						<text class="star">预约时间</text>
						<view @click="openLipicker('预约时间')" :class="{'place_box':!form.time}">{{form.time ? form.time : '请选择预约时间'}}</view>
					</view>
				</u-form-item>
				<u-form-item prop="deal">
					<view class="Con_box">
						<text class="star">交易区</text>
						<view @click="openSelect('交易区')" :class="{'place_box':!form.deal}">{{form.deal ? form.deal : '请选择进场交易区'}}</view>
					</view>
				</u-form-item>
				<u-form-item prop="enter">
					<view class="Con_box">
						<text class="star">进场门</text>
						<view @click="openSelect('进场门')" :class="{'place_box':!form.enter}">{{form.enter ? form.enter : '请选择进场门'}}</view>
					</view>
				</u-form-item>

				<!-- select框 -->
				<u-select v-model="show" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select>
				<!-- 日期框-(设置不了默认时间) -->
				<u-picker mode="time" v-model="showTime" default-time="2020-08-03" :params="params"></u-picker>
			</view>

			<view class="Con_goods">
				<u-form-item prop="name">
					<view class="Con_box">
						<text>车型</text>
						<u-input v-model="form.name" style="flex: 1;text-align: right;" placeholder="请输入车型" />
					</view>
				</u-form-item>
				<u-form-item prop="name">
					<view class="Con_box">
						<text class="star">车牌号</text>
						<u-input v-model="form.name" style="flex: 1;text-align: right;" placeholder="请输入车牌号" />
					</view>
				</u-form-item>

				<!-- 多级联动 -->
				<u-select v-model="showRegion" mode="mutil-column-auto" :list="lists" @confirm="confirmRegion"></u-select>
			</view>
		</u-form>
		
		<view class="btn" @click="submit">
			<view class="btn_box">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					time: '',
					deal: '',
					enter: ''
				},
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					intro: [{
						min: 5,
						message: '简介不能少于5个字',
						trigger: 'change'
					}]
				},
				// 定义select框
				show: false,
				SelectCon: '',
				list: [{
						value: '1',
						label: '江'
					},
					{
						value: '2',
						label: '湖'
					}
				],
				// 定义lb-picker
				showTime: false,
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				// 多级联动
				showRegion: false,
				activeRegion: '',
				lists: [{
						value: 1,
						label: '中国',
						children: [{
								value: 2,
								label: '广东',
								children: [{
										value: 3,
										label: '深圳'
									},
									{
										value: 4,
										label: '广州'
									}
								]
							},
							{
								value: 5,
								label: '广西',
								children: [{
										value: 6,
										label: '南宁'
									},
									{
										value: 7,
										label: '桂林'
									}
								]
							}
						]
					},
					{
						value: 8,
						label: '美国',
						children: [{
							value: 9,
							label: '纽约',
							children: [{
								value: 10,
								label: '皇后街区'
							}]
						}]
					}
				]


			}

		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			},
			// select框确认
			confirm(e) {
				console.log(e);
				this.show = false;
				if (this.SelectCon === '交易区') {
					this.form.deal = e[0].label;
				} else if (this.SelectCon === '进场门') {
					this.form.enter = e[0].label;
				} else if (this.SelectCon === '货品品类') {
					this.form.goods = e[0].label;
				}
			},
			// 弹窗框
			openSelect(v) {
				this.SelectCon = v;
				this.show = true;
			},
			// 打开日期框
			openLipicker(v) {
				this.showTime = true;
			},
			// 地区多级联动
			confirmRegion(e) {
				console.log(e, 'e');
				let val = '';
				e.forEach((item, index) => {
					console.log(item, 'item')
					val += item.label;
				})
				if (this.activeRegion === '具体产地') {
					this.form.region = val;
				}
			},
			openSelectMore(v) {
				this.activeRegion = v;
				this.showRegion = true;
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss">
	#visit {
		.tit {
			font-size: 32rpx;
			font-weight: 600;
			color: rgba(49, 49, 49, 1);
			padding: 20rpx 30rpx;
		}

		.Con,
		.Con_goods,
		.Good_box {
			background-color: #fff;
			padding: 0rpx 30rpx;

			.Con_box {
				display: flex;
				width: 100%;

				>text {
					margin-right: 10rpx;
					transform: translateX(-8rpx);
				}

				>text.star::after {
					content: '*';
					color: #ff0000;
					font-weight: 600;
					padding-left: 5rpx;
				}

				input {
					text-align: right;
					width: 100%;
				}

				.u-form-left {
					display: none;
				}

				>view {
					flex: 1;
					text-align: right;
				}

				.place_box {
					font-size: 28rpx;
					color: #C0C4CC;
					// cursor: pointer;
					// background: rgba(0,0,0,0);
				}
			}

		}

		.Con_goods {
			margin-top: 20rpx;
		}

		.Uploader_box {
			background-color: #fff;
			margin-top: 20rpx;
			display: flex;
			padding: 0rpx 30rpx;

			>view {
				padding: 20rpx 0rpx;

				>view {
					font-size: 32rpx;
					font-weight: 400;
					color: rgba(49, 49, 49, 1);
					margin-bottom: 24rpx;
				}
			}

			.Uploader_box_left {
				margin-right: 186rpx;

				>view::after {
					content: '*';
					color: #ff0000;
					font-weight: 600;
					padding-left: 5rpx;
				}
			}
		}

		.Checkbox {
			margin-top: 20rpx;
			background-color: #fff;
			padding: 20rpx 30rpx;
			display: flex;

			>view {
				font-size: 24rpx;
				font-weight: 400;
				color: rgba(228, 39, 39, 1);
			}
		}

		.btn {
			width: 100%;
			display: flex;
			justify-content: center;
			padding: 28rpx 0rpx 34rpx 0rpx;

			.btn_box {
				width: 690rpx;
				height: 80rpx;
				background: rgba(0, 158, 255, 1);
				border-radius: 8rpx;
				font-size: 32rpx;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				text-align: center;
				line-height: 80rpx;
			}
		}
	}
</style>
