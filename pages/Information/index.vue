<template>
	<view id="home">
		<view class="form_box">
			<u-form :model="form" ref="uForm" label-width="auto" label-style="{fontSize: 32rpx;}">
				<view class="Active_one">
					<view class="" v-if="active_show">
						<view class="tit">选择身份（必选）</view>
						<view class="status">
							<u-radio-group v-model="form.radio" :wrap="true">
								<view class="status_radio">
									<u-radio :name="1">供应商（前来卖货）</u-radio>
								</view>
								<view class="status_radio">
									<u-radio :name="2">采购商（前来上货）</u-radio>
								</view>
								<view class="status_radio">
									<u-radio :name="3">摆渡车（场内运货）</u-radio>
								</view>
								<view class="status_radio">
									<u-radio :name="4">员工/伙计</u-radio>
								</view>
							</u-radio-group>
						</view>
						
						<view class="tit">必填信息</view>
						<view class="uploaderBox">
							<u-upload :action="action" :file-list="fileList" >
								
							</u-upload>
							<view class="Conbox">
								<view class="photo">个人照片&nbsp;<text>*</text></view>
								<text>（用于人脸识别，请上传正面大头照）</text>
							</view>
						</view>
						<view class="Information">
							<u-form-item prop="name">
								<view class="Con_box">
									<text class="star">姓名</text>
									<u-input v-model="form.name" style="flex: 1;text-align: right;" placeholder="请输入姓名" />
								</view>
							</u-form-item>
							<u-form-item prop="phone">
								<view class="Con_box">
									<text class="star">手机号</text>
									<view :class="{'place_box':!form.phone}">{{form.phone ? form.phone : '注册登录带过来的数据不可修改'}}</view>
								</view>
							</u-form-item>
							<u-form-item prop="car" v-if="active_copy === 3">
								<view class="Con_box">
									<text class="star">车牌号</text>
									<u-input v-model="form.car" style="flex: 1;text-align: right;" placeholder="请输入车牌号" />
								</view>
							</u-form-item>
							<u-form-item prop="card">
								<view class="Con_box">
									<text class="star">身份证号</text>
									<u-input v-model="form.card" style="flex: 1;text-align: right;" placeholder="请输入身份证号" />
								</view>
							</u-form-item>
							<!-- checkbox框 -->
						
						
						
						
						
						
						
							<!--  -->
							<!-- <u-form-item label="手机号" prop="phone">
								<u-input v-model="form.phone" input-align="right" placeholder="请输入手机号" />
							</u-form-item>
							<u-form-item label="身份证号" prop="card">
								<u-input v-model="form.card" input-align="right" placeholder="请输入身份证号" />
							</u-form-item>
							<u-form-item label="性别" prop="sex">
								<u-input v-model="form.sex" input-align="right" placeholder="请输入性别" />
							</u-form-item>
							<u-form-item label="年龄" prop="age">
								<u-input v-model="form.age" input-align="right" placeholder="请输入年龄" />
							</u-form-item>
							<u-form-item label="籍贯" prop="place" class="place">
								<view @click="openSelect('籍贯')" :class="{'place_box':!form.place}">{{form.place ? form.place : '请选择籍贯'}}</view>
						
							</u-form-item>
							<u-form-item label="居住地" prop="residence" class="place">
								<view @click="openSelect('居住地')" :class="{'place_box':!form.residence}">{{form.residence ? form.residence : '请选择居住地'}}</view>
							</u-form-item>
							<u-form-item label="详细地址" prop="address">
								<u-input v-model="form.address" input-align="right" placeholder="请输入年龄" />
							</u-form-item> -->
						
							<!-- select框 -->
							<u-select v-model="show" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select>
						</view>
					</view>
					
					
					<!-- 摆渡车 -->
					<view class="Active_box" v-if="active_copy === 3">
						<view class="tit">个人信息</view>
						<view class="Active_box_sun">
							<u-form-item label="性别" prop="sex">
								<u-input v-model="form.sex" input-align="right" placeholder="请输入性别" />
							</u-form-item>
							<u-form-item label="年龄" prop="age">
								<u-input v-model="form.age" input-align="right" placeholder="请输入年龄" />
							</u-form-item>
							<u-form-item label="籍贯" prop="place" class="place">
								<view @click="openSelect('籍贯')" :class="{'place_box':!form.place}">{{form.place ? form.place : '请选择籍贯'}}</view>
												
							</u-form-item>
							<u-form-item label="居住地" prop="residence" class="place">
								<view @click="openSelect('居住地')" :class="{'place_box':!form.residence}">{{form.residence ? form.residence : '请选择居住地'}}</view>
							</u-form-item>
							<u-form-item label="详细地址" prop="address">
								<u-input v-model="form.address" input-align="right" placeholder="请输入居住地详细地址" />
							</u-form-item>
							<u-form-item label="营运区域" prop="region" class="place">
								<view @click="openUpopup('居住地')" :class="{'place_box':!form.region}">{{form.region ? form.region : '请选择居住地'}}</view>
								<u-popup v-model="showUpopup" mode="bottom" :closeable="false" border-radius="14">
									<view class="Upopup_Con">
										<view class="Upopup_header">
											<text class="tit">请选择计划经营区域</text>
											<text class="submit">确定</text>
										</view>
										<view class="Upopup_box">
											<u-checkbox-group>
												<view class="box">
													<text>荔枝</text>
													<u-checkbox v-model="checked" :disabled="false"></u-checkbox>
												</view>
												<view class="box">
													<text>香蕉</text>
													<u-checkbox v-model="checked" :disabled="false"></u-checkbox>
												</view>
												<view class="box">
													<text>橙子</text>
													<u-checkbox v-model="checked" :disabled="false"></u-checkbox>
												</view>
											</u-checkbox-group>
										</view>
									</view>
								</u-popup>
							</u-form-item>
							
							<!-- select框 -->
							<u-select v-model="show" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select>
						</view>
						
						<!-- 企业信息 -->
						<view class="tit">企业信息</view>
						<view class="Active_box_sun">
							<u-form-item label="企业名称" prop="sex">
								<u-input v-model="form.sex" input-align="right" placeholder="请输入企业名称" />
							</u-form-item>
							<u-form-item label="营业执照" prop="sex">
								<u-input v-model="form.sex" input-align="right" placeholder="请输入营业执照" />
							</u-form-item>
							<view class="">
								
							</view>
						</view>
					</view>
					
					<!--  -->
					<view class="Active_box">
						<view class="tit">个人信息</view>
						<view class="Active_box_sun">
							<u-form-item label="性别" prop="sex">
								<u-input v-model="form.sex" input-align="right" placeholder="请输入性别" />
							</u-form-item>
							<u-form-item label="年龄" prop="age">
								<u-input v-model="form.age" input-align="right" placeholder="请输入年龄" />
							</u-form-item>
							<u-form-item label="籍贯" prop="place" class="place">
								<view @click="openSelect('籍贯')" :class="{'place_box':!form.place}">{{form.place ? form.place : '请选择籍贯'}}</view>
												
							</u-form-item>
							<u-form-item label="居住地" prop="residence" class="place">
								<view @click="openSelect('居住地')" :class="{'place_box':!form.residence}">{{form.residence ? form.residence : '请选择居住地'}}</view>
							</u-form-item>
							<u-form-item label="详细地址" prop="address">
								<u-input v-model="form.address" input-align="right" placeholder="请输入居住地详细地址" />
							</u-form-item>
							
							<!-- select框 -->
							<u-select v-model="show" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select>
						</view>
					</view>
					
					<!--  -->

					<view class="state">
						<u-checkbox v-model="form.checked"></u-checkbox>
						<text>我已阅读并知晓本申报所列事项，并保证以上申报内容正确属实，如因错误填报产生的法律责任后果自负。</text>
					</view>

					<view class="next">
						<view class="nextBtn" @click="nextClick">下一步</view>
						<view class="btn_submit">提交</view>
					</view>
				</view>

				


				<!-- 身份拉出来的选择-摆渡车 -->
				<!-- <view class="Active_box" style="display: none;">
					<u-form-item label="车牌号" prop="car">
						<u-input v-model="form.car" input-align="right" placeholder="请输入车牌或车辆编号" />
					</u-form-item>
					<u-form-item label="营运区域" prop="region" class="place">
						<view @click="openUpopup('居住地')" :class="{'place_box':!form.region}">{{form.region ? form.region : '请选择居住地'}}</view>
						<u-popup v-model="showUpopup" mode="bottom" :closeable="false" border-radius="14">
							<view class="Upopup_Con">
								<view class="Upopup_header">
									<text class="tit">请选择计划经营区域</text>
									<text class="submit">确定</text>
								</view>
								<view class="Upopup_box">
									<u-checkbox-group>
										<view class="box">
											<text>荔枝</text>
											<u-checkbox v-model="checked" :disabled="false"></u-checkbox>
										</view>
										<view class="box">
											<text>香蕉</text>
											<u-checkbox v-model="checked" :disabled="false"></u-checkbox>
										</view>
										<view class="box">
											<text>橙子</text>
											<u-checkbox v-model="checked" :disabled="false"></u-checkbox>
										</view>
									</u-checkbox-group>
								</view>
							</view>
						</u-popup>
					</u-form-item>
				</view>
 -->
				<!-- 采购商 -->
				<!-- <view class="Active_box" style="display: block;">
					<view class="Active_box_sun">
						<u-form-item label="企业名称" prop="company">
							<u-input v-model="form.company" input-align="right" placeholder="请输入企业名称" />
						</u-form-item>
						<u-form-item label="营业执照" prop="business">
							<u-input v-model="form.business" input-align="right" placeholder="请输入营业执照" />
						</u-form-item>
						
						<view class="Uploader_box">
							<Uploader :action="action" :fileList="fileList"></Uploader>
							<text class="Uploader_Con">(请上传营业执照附件）</text>
						</view>
						<u-form-item label="主营业务" prop="business">
							<u-input v-model="form.business" input-align="right" placeholder="请输入主营业务" />
						</u-form-item>
						<u-form-item label="公司地址" prop="business">
							<u-input v-model="form.business" input-align="right" placeholder="请输入公司地址" />
						</u-form-item>
						<u-form-item label="采购区域" prop="region" class="place">
							<view @click="openUpopup('采购区域')" :class="{'place_box':!form.region}">{{form.region ? form.region : '请选择采购区域'}}</view>
							<u-popup v-model="showUpopup" mode="bottom" :closeable="false" border-radius="14">
								<view class="Upopup_Con">
									<view class="Upopup_header">
										<text class="tit">请选择采购区域</text>
										<text class="submit">确定</text>
									</view>
									<view class="Upopup_box">
										<u-checkbox-group>
											<view class="box">
												<text>荔枝</text>
												<u-checkbox v-model="checked" :disabled="false"></u-checkbox>
											</view>
											<view class="box">
												<text>香蕉</text>
												<u-checkbox v-model="checked" :disabled="false"></u-checkbox>
											</view>
											<view class="box">
												<text>橙子</text>
												<u-checkbox v-model="checked" :disabled="false"></u-checkbox>
											</view>
										</u-checkbox-group>
									</view>
								</view>
							</u-popup>
						</u-form-item>
					</view>
 -->
				<!-- 标题 -->
				<!-- <view class="tit_box">
						<view class="tit">伙计1信息</view>
						<view class="tit_Con">
							<u-form-item label="伙计1姓名" prop="business">
								<u-input v-model="form.business" input-align="right" placeholder="请输入伙计1姓名" />
							</u-form-item>
							<u-form-item label="伙计1身份证" prop="business">
								<u-input v-model="form.business" input-align="right" placeholder="请输入伙计1身份证" />
							</u-form-item>
							<u-form-item label="伙计1手机号" prop="business">
								<u-input v-model="form.business" input-align="right" placeholder="请输入伙计1手机号" />
							</u-form-item>
							<u-form-item label="伙计1现住址" prop="business">
								<u-input v-model="form.business" input-align="right" placeholder="请输入性别伙计1现住址" />
							</u-form-item>
						</view>
					</view> -->

				<!-- </view> -->


				<!--  -->
				<view class="Active_box" style="display: none;">

				</view>
			</u-form>

			<!-- <view class="state">
				<u-checkbox v-model="form.checked"></u-checkbox>
				<text>我已阅读并知晓本申报所列事项，并保证以上申报内容正确属实，如因错误填报产生的法律责任后果自负。</text>
			</view>
			<view class="btn" @click="submit">
				<view class="btn_box">提交</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import CONFIG from '../../common/configs.js'
	// import Uploader from '@/components/Uploader/Uploader.vue'
	export default {
		// components: {
		// 	Uploader
		// },
		data() {
			return {
				// 上传附件
				action: 'http://www.example.com/upload',
				form: {
					name: '',
					phone: '',
					car: '',
					card: '',
					sex: '',
					age: '',
					place: '',
					residence: '',
					address: '',
					// 摆渡车
					car: '',
					region: '',
					// 采购商
					company: '',
					business: '',
					// 身份状态
					radio: '',
					checked: false,
					// 采购商
					action: 'http://www.example.com/upload',
					fileList: [{
						url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg',
					}]
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
				// 模拟多级联动
				placeList: [],
				residenceList: [],
				
				// 下一步
				active_show: true,
				active: null,
				active_copy: null,
				show: false,
				list: [{
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
				],
				// 打开Upopup
				showUpopup: false
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
			submit_() {
				this.$refs.uUpload.upload();
			},
			// 多级联动-赋值
			confirm(e) {
				console.log(e);
				if (e.length > 0) {
					let val = '';
					e.forEach((item, index) => {
						console.log(item, 'item')
						val += item.label;
					})
					console.log(val, 'val')
					if (this.form.active === '籍贯') {
						this.form.place = val;
					} else if (this.form.active === '居住地') {
						this.form.residence = val;
					}
					this.form.place = val;
				}

			},
			// 打开多级联动
			openSelect(v) {
				this.show = true;
				this.form.active = v;
			},
			// 打开u-popup
			openUpopup() {
				this.showUpopup = true;
			},
			openLipicker(v) {},
			// 点击下一步
			nextClick() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						if(this.form.radio) {
							console.log(this.form.radio, 'radio')
							this.active_show = false;
							this.active_copy = this.form.radio;
						}
					} else {
						console.log('验证失败');
					}
				});
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss">
	#home {
		width: 100%;
		height: 100%;
		background-color: #F4F4F4;

		.form_box {
			.tit {
				font-size: 32rpx;
				font-weight: 600;
				color: rgba(49, 49, 49, 1);
				padding: 20rpx 0rpx 20rpx 30rpx;
			}

			.uploaderBox {
				display: flex;
				align-items: cetner;
				background-color: #fff;
				padding: 20rpx 0rpx 20rpx 30rpx;
				margin-bottom: 20rpx;

				.Conbox {
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin-left: 32rpx;

					.photo {
						font-size: 32rpx;
						font-weight: 400;
						color: rgba(49, 49, 49, 1);
						line-height: 22px;
						padding-left: 15rpx;
						margin-bottom: 28rpx;

						>text {
							color: #ED2121;
							font-weight: 600;
						}
					}

					>text {
						font-size: 28rpx;
						font-weight: 400;
						color: rgba(162, 162, 162, 1);
						line-height: 20px;
					}
				}
			}

			.Information,
			.Active_box {
				background-color: #fff;
				padding: 0rpx 30rpx;

				// .u-input {
				// 	>input {
				// 		font-size: 32rpx;
				// 	}

				// }
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

				.place {
					width: 100%;

					view {
						text-align: right;
						width: 100%;
					}

					.place_box {
						font-size: 28rpx;
						color: #C0C4CC;
						width: 100%;
						// cursor: pointer;
						// background: rgba(0,0,0,0);
					}
				}
			}
			

			.status {
				background-color: #fff;
				padding: 0rpx 30rpx;

				.status_radio {
					width: 100%;
				}

				.u-radio {
					border-bottom: 1px solid #EDEDED;
					padding: 22rpx 0rpx;
				}

				.u-radio-group {
					>view:last-child {
						.u-radio {
							border: none;
						}
					}
				}
			}

			.Active_box {
				background-color: #F4F4F4;
				padding: 0rpx;

				.Active_box_sun {
					background-color: #fff;
					padding: 0rpx 30rpx;

					// 下拉弹出框
					.Upopup_Con {
						width: 100%;

						.Upopup_header {
							display: flex;
							justify-content: center;
							position: relative;
							background-color: #ccc;

							.tit {
								font-size: 32rpx;
								font-weight: 400;
								color: rgba(49, 49, 49, 1);
							}

							.submit {
								position: absolute;
								right: 20rpx;
								top: 15rpx;
								font-size: 32rpx;
								color: red;
							}
						}

						.Upopup_box {
							// padding-bottom: 50rpx;
							width: 100%;
							// display: flex;
							// align-items: center;
							padding-top: 50rpx;
							height: 300rpx;
							overflow: hidden;
							overflow-y: scroll;
							box-sizing: border-box;

							.box {
								display: flex;
								align-items: center;
								justify-content: space-between;
								padding-left: 30rpx;
								box-sizing: border-box;
							}
						}
					}

					// 采购商
					.Uploader_box {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 20rpx 0rpx;
						border-bottom: 1px solid #F6F7F9;

						text {
							font-size: 28rpx;
							font-weight: 400;
							color: rgba(149, 149, 149, 1);
						}
					}
				}

				.tit_box {
					.tit_Con {
						background-color: #fff;
						padding: 0rpx 30rpx;
					}
				}
			}

			.state {
				display: flex;
				align-items: flex-start;
				padding: 20rpx 50rpx 20rpx 30rpx;
				background-color: #fff;
				margin-top: 20rpx;

				text {
					font-size: 24rpx;
					font-weight: 400;
					color: rgba(237, 33, 33, 1);
				}
			}

			.next {
				width: 100%;
				display: flex;
				justify-content: center;
				padding: 32rpx 0rpx 28rpx 0rpx;

				.nextBtn {
					width: 336rpx;
					height: 80rpx;
					background: rgba(228, 228, 228, 1);
					border-radius: 8rpx;
					font-size: 32rpx;
					font-weight: 400;
					color: rgba(49, 49, 49, 1);
					text-align: center;
					line-height: 80rpx;
					margin-right: 18rpx;
				}

				.btn_submit {
					width: 336rpx;
					height: 80rpx;
					background: rgba(0, 158, 255, 1);
					border-radius: 8rpx;
					font-size: 32rpx;
					font-weight: 400;
					color: #fff;
					text-align: center;
					line-height: 80rpx;
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
	}
</style>
