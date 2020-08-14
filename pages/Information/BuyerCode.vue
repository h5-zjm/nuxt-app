<template>
	<view id="BuyerCode">
		<view class="VipCode_Con">
			<view class="code">供应商</view>
			<image src="/static/images/code.png" mode=""></image>
			<view class="scan">
				<u-form :model="form" ref="uForm" label-width="auto">
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
							<text>身份证号：</text>
							<view>130681********1253</view>
						</view>
					</u-form-item>
				</u-form>
			</view>
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
			};
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
		}
	}
</script>

<style lang="scss">
#BuyerCode {
	width: 100vw;
	height: 100vh;
	background-color: #37B3FF;
	display: flex;
	justify-content: center;
	align-items: center;
	.VipCode_Con {
		width:620rpx;
		height:1026rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 20rpx 0px rgba(196,196,196,0.5);
		border-radius:22rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.code {
			font-size:48rpx;
			font-weight:600;
			color:rgba(49,49,49,1);
			padding-top: 106rpx;
			margin-bottom: 36rpx;
		}
		>image {
			width:386rpx;
			height:380rpx;
		}
		.scan {
			width: 100%;
			padding: 0rpx 44rpx;
			.Con_box {
				display: flex;
			}
		}
	}
}
</style>
