<template>
	<view id="informationShow_buddy">
		<u-form :model="form" ref="uForm" label-width="auto">
			<view class="tit">基本信息</view>
			<view class="Con">
				<u-form-item prop="time">
					<view class="Con_box">
						<text>姓名：</text>
						<view>王美玲</view>
					</view>
				</u-form-item>
				<u-form-item prop="time">
					<view class="Con_box">
						<text>手机号：</text>
						<view>180 1234 5678</view>
					</view>
				</u-form-item>
				<u-form-item prop="time">
					<view class="Con_box">
						<text>身份证号：</text>
						<view>130681********1253</view>
					</view>
				</u-form-item>
				<u-form-item prop="time">
					<view class="Con_box">
						<text>性别：</text>
						<view>女</view>
					</view>
				</u-form-item>
				<u-form-item prop="time">
					<view class="Con_box">
						<text>年龄：</text>
						<view>32</view>
					</view>
				</u-form-item>
				<u-form-item prop="time">
					<view class="Con_box">
						<text>户籍所在地：</text>
						<view>河北省沧州市河间县</view>
					</view>
				</u-form-item>
				<u-form-item prop="time">
					<view class="Con_box">
						<text>居住地：</text>
						<view>北京市丰台区</view>
					</view>
				</u-form-item>
				<u-form-item prop="time">
					<view class="Conbox" style="transform: translateX(-8rpx);">
						<text>现住地（详细地址）：</text>
						<text>北京市丰台区新发地天伦景城小区12号楼1832</text>
					</view>
				</u-form-item>
			</view>
			<view class="tit">身份（必选）</view>
			<view class="Con">
				<u-form-item prop="time">
					<view class="Con_box" style="transform: translateX(-8rpx);">
						<view class="Con_tit">
							<view></view>
						</view>
						<view>伙计/员工</view>
					</view>
				</u-form-item>
				<u-form-item prop="time">
					<view class="Con_box">
						<text>公司联系人：</text>
						<view>王丽丽</view>
					</view>
				</u-form-item>
				<u-form-item prop="time">
					<view class="Con_box">
						<text>联系人电话：</text>
						<view>1361234678</view>
					</view>
				</u-form-item>
			</view>
		</u-form>
		<view class="btn" @click="submit">
			<view class="btn_box">编辑</view>
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
					enter: '',
					goods: '',
					region: '',
					starTime: '',
					checked: false
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
				// 编辑
				Active_radio: null
			}
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						uni.navigateTo({
							url:'/pages/Information/index?Active_radio='+this.Active_radio
						})
					} else {
						console.log('验证失败');
					}
				});
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		// 获取参数
		onLoad(res){
			if(res.radio) {
				this.Active_radio = parseInt(res.radio);
			}
		}
	}
</script>

<style lang="scss">
	#informationShow_buddy {
		.tit {
			font-size: 32rpx;
			font-weight: 600;
			color: rgba(49, 49, 49, 1);
			padding: 20rpx 30rpx;
		}

		.Con {
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
					font-size:28rpx;
					font-weight:400;
					color:rgba(49,49,49,1);
				}
				
				.Con_tit {
					display: flex;
					align-items: center;
					margin-right: 30rpx;
					>view {
						width:24rpx;
						height:24rpx;
						background:rgba(0,158,255,1);
						border-radius: 50%;
					}
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
					font-size:32rpx;
					font-weight:400;
					color:rgba(49,49,49,1);
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
				font-size:24rpx;
				font-weight:400;
				color:rgba(228,39,39,1);
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
