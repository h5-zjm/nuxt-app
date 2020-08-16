<template>
	<view id="home">
		<view class="form_box">
			<u-form :model="form" ref="uForm" label-width="auto">
				<view class="Active_one">
					<view class="" v-if="active_show">
						<view class="tit">选择身份（必选）</view>
						<view class="status">
							<u-radio-group v-model="form.radio " :wrap="true">
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

						<view class="tit" v-if="form.radio">必填信息</view>
						<view class="uploaderBox" v-if="form.radio">
							<u-upload :action="action" :max-count="1" :file-list="supplier.fileList" :show-progress="false" @on-success="Supplier_Upload">

							</u-upload>
							<view class="Conbox">
								<view class="photo">个人照片&nbsp;<text>*</text></view>
								<text>（用于人脸识别，请上传正面大头照）</text>
							</view>
						</view>
						<view class="Information" v-if="form.radio">
							<u-form-item prop="name">
								<view class="Con_box">
									<text class="star">姓名</text>
									<u-input v-model="form.name" input-align="right" style="flex: 1;" placeholder="请输入姓名" />
								</view>
							</u-form-item>
							<u-form-item prop="mobile">
								<view class="Con_box">
									<text class="star">手机号</text>
									<view :class="{'place_box':!form.mobile}">{{form.mobile ? form.mobile : '注册登录带过来的数据不可修改'}}</view>
								</view>
							</u-form-item>
							<u-form-item prop="carNumber" v-if="form.radio === 3">
								<view class="Con_box">
									<text class="star">车牌号</text>
									<u-input v-model="form.carNumber" input-align="right" style="flex: 1;" placeholder="请输入车牌号" />
								</view>
							</u-form-item>
							<u-form-item prop="cardNo">
								<view class="Con_box">
									<text class="star">身份证号</text>
									<u-input v-model="form.cardNo" input-align="right" style="flex: 1;" placeholder="请输入身份证号" />
								</view>
							</u-form-item>
						</view>
					</view>


					<!-- 摆渡车 -->
					<view class="Active_box" v-if="active_copy === 3">
						<view class="tit">个人信息</view>
						<view class="Active_box_sun">
							<u-form-item label="性别">
								<u-input v-model="form.gender" input-align="right" placeholder="请输入性别" />
							</u-form-item>
							<u-form-item label="年龄">
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
												<view class="box" v-for="(item,index) in subcampList" :key="index">
													<text>{{item.title}}</text>
													<u-checkbox v-model="item.checked" :disabled="false" style="width: 38rpx;"></u-checkbox>
												</view>
											</u-checkbox-group>
										</view>
									</view>
								</u-popup>
							</u-form-item>

							<!-- select框 -->
							<u-select v-model="show" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select>
						</view>
					</view>

					<!-- 采购商 -->
					<view class="Active_box" v-if="active_copy === 2">
						<view class="Active_box">
							<view class="tit">个人信息</view>
							<view class="Active_box_sun">
								<u-form-item label="性别">
									<u-input v-model="form.gender" input-align="right" placeholder="请输入性别" />
								</u-form-item>
								<u-form-item label="年龄">
									<u-input v-model="form.age" input-align="right" placeholder="请输入年龄" />
								</u-form-item>
								<u-form-item label="籍贯" prop="place" class="place">
									<view @click="openSelect('籍贯')" :class="{'place_box':!form.place}">{{form.place ? form.place : '请选择籍贯'}}</view>

								</u-form-item>
								<u-form-item label="居住地" prop="residence" class="place">
									<view @click="openSelect('居住地')" :class="{'place_box':!form.residence}">{{form.residence ? form.residence : '请选择居住地'}}</view>
								</u-form-item>
								<u-form-item label="详细地址">
									<u-input v-model="form.currentPlace" input-align="right" placeholder="请输入居住地详细地址" />
								</u-form-item>

								<!-- select框 -->
								<!-- <u-select v-model="show" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select> -->
							</view>

							<!-- 企业信息 -->
							<view class="tit">企业信息</view>
							<view class="Active_box_sun">
								<u-form-item label="企业名称">
									<u-input v-model="form.businessName" input-align="right" placeholder="请输入企业名称" />
								</u-form-item>
								<u-form-item label="营业执照">
									<u-input v-model="form.businessCode" input-align="right" placeholder="请输入营业执照" />
								</u-form-item>
								<view class="uploaderBox">
									<u-upload :action="action" @on-success="Procurer_Upload" :max-count="1" :file-list="procurer.fileList">

									</u-upload>
									<view class="Conbox">
										(请上传营业执照附件）
									</view>
								</view>
								<u-form-item>
									<view class="Con_box">
										<text class="star">主营业务</text>
										<u-input v-model="form.businessCatalog" input-align="right" style="flex: 1;" placeholder="请输入主营业务" />
									</view>
								</u-form-item>
								<u-form-item label="公司地址">
									<u-input v-model="form.businessAddr" input-align="right" placeholder="请输入公司地址" />
								</u-form-item>
								<u-form-item label="采购区域" class="place">
									<view @click="openUpopup('采购区域')" :class="{'place_box':!form.region}">{{form.region ? form.region : '请选择当前计划经营区域（可多选）'}}</view>
									<u-popup v-model="showUpopup" mode="bottom" :closeable="false" border-radius="14">
										<view class="Upopup_Con">
											<view class="Upopup_header">
												<text class="tit">请选择计划经营区域</text>
												<text class="submit">确定</text>
											</view>
											<view class="Upopup_box">
												<u-checkbox-group>
													<view class="box" v-for="(item,index) in subcampList" :key="index">
														<text>{{item.title}}</text>
														<u-checkbox v-model="item.checked" :disabled="false"></u-checkbox>
													</view>
												</u-checkbox-group>
											</view>
										</view>
									</u-popup>
								</u-form-item>
							</view>

							<!-- 伙伴信息 -->
							<view class="partner_box" v-for="(item,index) in PartnerList" :key="index">
								<view class="partner">
									<view class="tit_con">伙计{{index + 1}}信息</view>
									<view class="add_con" @click="AddPartner" v-if="index === 0">继续添加</view>
								</view>
								<view class="Active_box_sun">
									<u-form-item prop="sex">
										<view class="Con_box">
											<text>伙计{{index + 1}}姓名</text>
											<u-input style="flex: 1;text-align: right;" v-model="item.staffName" input-align="right" placeholder="请输入伙计姓名" />
										</view>
									</u-form-item>
									<u-form-item prop="sex">
										<view class="Con_box">
											<text>伙计{{index + 1}}身份证</text>
											<u-input style="flex: 1;text-align: right;" v-model="form.staffCardNo" input-align="right" placeholder="请输入伙计身份证" />
										</view>
									</u-form-item>
									<u-form-item prop="sex">
										<view class="Con_box">
											<text>伙计{{index + 1}}手机号</text>
											<u-input style="flex: 1;text-align: right;" v-model="form.staffMobile" input-align="right" placeholder="请输入伙计手机号" />
										</view>
									</u-form-item>
									<u-form-item prop="sex">
										<view class="Con_box">
											<text>伙计{{index + 1}}现住址</text>
											<u-input style="flex: 1;text-align: right;" v-model="form.staffAddr" input-align="right" placeholder="请输入伙计现住址" />
										</view>
									</u-form-item>
								</view>
							</view>

						</view>
					</view>

					<!-- 供应商 -->
					<view class="Active_box" v-if="active_copy === 1">
						<view class="tit">个人信息</view>
						<view class="Active_box_sun">
							<u-form-item label="性别">
								<u-input v-model="form.sex" input-align="right" placeholder="请输入性别" />
							</u-form-item>
							<u-form-item label="年龄">
								<u-input v-model="form.age" input-align="right" placeholder="请输入年龄" />
							</u-form-item>
							<u-form-item label="籍贯" prop="place" class="place">
								<view @click="openSelect('籍贯')" :class="{'place_box':!form.place}">{{form.place ? form.place : '请选择籍贯'}}</view>

							</u-form-item>
							<u-form-item label="居住地" prop="residence" class="place">
								<view @click="openSelect('居住地')" :class="{'place_box':!form.residence}">{{form.residence ? form.residence : '请选择居住地'}}</view>
							</u-form-item>
							<u-form-item label="详细地址">
								<u-input v-model="form.currentPlace" input-align="right" placeholder="请输入居住地详细地址" />
							</u-form-item>

							<!-- select框 -->
							<!-- <u-select v-model="show" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select> -->
						</view>

						<!-- 企业信息 -->
						<view class="tit">企业信息</view>
						<view class="Active_box_sun">
							<u-form-item label="企业名称">
								<u-input v-model="form.businessName " input-align="right" placeholder="请输入企业名称" />
							</u-form-item>
							<u-form-item label="营业执照">
								<u-input v-model="form.businessCode" input-align="right" placeholder="请输入营业执照" />
							</u-form-item>
							<view class="uploaderBox">
								<u-upload :action="action" :max-count="1" :file-list="supplier.businessList">

								</u-upload>
								<view class="Conbox">
									(请上传营业执照附件）
								</view>
							</view>
							<u-form-item prop="businessCatalog">
								<view class="Con_box">
									<text class="star">主营业务</text>
									<u-input v-model="form.businessCatalog" input-align="right" style="flex: 1;" placeholder="请输入主营业务" />
								</view>
							</u-form-item>
							<u-form-item prop="inTime">
								<view class="Con_box">
									<text class="star">入驻时间</text>
									<view @click="openLipicker('入驻时间')" :class="{'place_box':!form.inTime}">{{form.inTime ? form.inTime : '请选择开始在新法地市场经营的时间'}}</view>
								</view>
							</u-form-item>

							<!-- 日期框-(设置不了默认时间) -->
							<u-picker mode="time" v-model="showTime" :default-time="form.NowTime" :params="params" @confirm="PickerConfirm"></u-picker>
						</view>

						<!-- 伙伴信息 -->
						<view class="partner_box" v-for="(item,index) in PartnerList" :key="index">
							<view class="partner">
								<view class="tit_con">伙计{{index + 1}}信息</view>
								<view class="add_con" @click="AddPartner" v-if="index === 0">继续添加</view>
							</view>
							<view class="Active_box_sun">
								<u-form-item prop="sex">
									<view class="Con_box">
										<text>伙计{{index + 1}}姓名</text>
										<u-input style="flex: 1;text-align: right;" v-model="item.staffName" input-align="right" placeholder="请输入伙计姓名" />
									</view>
								</u-form-item>
								<u-form-item prop="sex">
									<view class="Con_box">
										<text>伙计{{index + 1}}身份证</text>
										<u-input style="flex: 1;text-align: right;" v-model="form.staffCardNo" input-align="right" placeholder="请输入伙计身份证" />
									</view>
								</u-form-item>
								<u-form-item prop="sex">
									<view class="Con_box">
										<text>伙计{{index + 1}}手机号</text>
										<u-input style="flex: 1;text-align: right;" v-model="form.staffMobile" input-align="right" placeholder="请输入伙计手机号" />
									</view>
								</u-form-item>
								<u-form-item prop="sex">
									<view class="Con_box">
										<text>伙计{{index + 1}}现住址</text>
										<u-input style="flex: 1;text-align: right;" v-model="form.staffAddr" input-align="right" placeholder="请输入伙计现住址" />
									</view>
								</u-form-item>
							</view>
						</view>
					</view>

					<!-- 伙计 -->
					<view class="Active_box" v-if="active_copy === 4">
						<view class="tit">个人信息</view>
						<view class="Active_box_sun">
							<u-form-item label="性别">
								<u-input v-model="form.gender" input-align="right" placeholder="请输入性别" />
							</u-form-item>
							<u-form-item label="年龄">
								<u-input v-model="form.age" input-align="right" placeholder="请输入年龄" />
							</u-form-item>
							<u-form-item label="籍贯" prop="place" class="place">
								<view @click="openSelect('籍贯')" :class="{'place_box':!form.place}">{{form.place ? form.place : '请选择籍贯'}}</view>

							</u-form-item>
							<u-form-item label="居住地" prop="residence" class="place">
								<view @click="openSelect('居住地')" :class="{'place_box':!form.residence}">{{form.residence ? form.residence : '请选择居住地'}}</view>
							</u-form-item>
							<u-form-item label="详细地址">
								<u-input v-model="form.currentPlace" input-align="right" placeholder="请输入居住地详细地址" />
							</u-form-item>
							<u-form-item label="公司联系人">
								<u-input v-model="form.businessLinkman" input-align="right" placeholder="请输入公司联系人" />
							</u-form-item>
							<u-form-item label="联系人电话">
								<u-input v-model="form.businessLinkmobile" input-align="right" placeholder="请输入公司联系人电话" />
							</u-form-item>

							<!-- select框 -->
							<!-- <u-select v-model="show" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select> -->
						</view>
					</view>
					<view class="state">
						<u-checkbox v-model="form.checked"></u-checkbox>
						<text>我已阅读并知晓本申报所列事项，并保证以上申报内容正确属实，如因错误填报产生的法律责任后果自负。</text>
					</view>

					<view class="next">
						<view class="nextBtn" @click="nextClick" v-if="!show_back_btn">下一步</view>
						<view class="nextBtn" @click="backClick" v-if="show_back_btn">上一步</view>
						<view class="btn_submit" @click="submit">提交</view>
					</view>
				</view>
			</u-form>
		</view>
	</view>
</template>

<script>
	import CONFIG from '../../common/configs.js';
	import citys from '../../common/citys.js'
	import {
		timeFormat,
		GetQueryValue
	} from '../../common/common.js'
	export default {
		data() {
			return {
				// 上传附件
				action: 'https://wechat.daizhangfang.net/common/sysFile/upload',
				supplier: {
					fileList: [],
					businessList: []
				},
				supplier: '',
				procurer: {
					fileList: []
				},
				ferry: {
					action: 'https://wechat.daizhangfang.net/common/sysFile/upload',
					fileList: [{
						url: 'https://newlands.oss-cn-beijing.aliyuncs.com/IMAGE/43d02186-3ddf-45d2-abcf-9f5516bd931f.jpg',
					}]
				},
				partner: {
					action: 'https://wechat.daizhangfang.net/common/sysFile/upload',
					fileList: [{
						url: 'https://newlands.oss-cn-beijing.aliyuncs.com/IMAGE/43d02186-3ddf-45d2-abcf-9f5516bd931f.jpg',
					}]
				},
				placeList: [],
				subcampList: [{
					title: "水果区",
					checked: false
				}, {
					title: "芒果区",
					checked: false
				}, {
					title: "周转一区",
					checked: false
				}],
				form: {
					id: null,
					name: '',
					businessType: '',
					carNumber: '',
					mobile: '18727087210',
					cardNo: '',
					registProvince: '',
					registCity: '',
					registArea: '',
					currentPlace: '',
					curentArea: '',
					curentCity: '',
					curentProvince: '',
					businessCatalog: '',
					businessAddr: '',
					businessUrl: '',
					businessCode: '',
					businessName: '',
					birthday: '',
					gender: '',
					age: '',
					currentPlace: '',
					businessLinkman: '',
					businessLinkmobile: '',
					inTime: '',
					urlImg: '',

					// 自定义
					NowTime: timeFormat(new Date()),
					radio: null,
					active: null,
					checked: false
				},
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					mobile: [{
							required: true,
							message: '请输入手机号码',
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change', 'blur'],
						},
						{
							pattern: CONFIG.MOBILE_REGEXP,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: '请输入11位手机号',
							trigger: ['change', 'blur']
						}
					],
					cardNo: [{
						required: true,
						message: '请输入身份证号',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}, {
						pattern: CONFIG.ID_CODE,
						// 正则检验前先将值转为字符串
						transform(value) {
							return String(value);
						},
						message: '请输入18位身份证号',
						trigger: ['change', 'blur']
					}],
					carNumber: [{
						required: true,
						message: '请输入车牌号',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					inTime: [{
						required: true,
						message: '请选择开始在新法地市场经营的时间',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					businessCatalog: [{
						required: true,
						message: '请输入主营业务',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}]
				},
				// 模拟多级联动

				residenceList: [],

				// 下一步
				active_show: true,
				active: null,
				active_copy: null,
				show_back_btn: false,
				show: false,
				list: citys,
				// 打开Upopup
				showUpopup: false,
				// 日期控件
				showTime: false,
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				// 添加伙伴信息
				PartnerList: [{}]
			}

		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						// debugger;
						console.log(this.form.radio, '111')
						if (this.form.radio === 1) {
							this.form.businessType = '供应商'
						} else if (this.form.radio === 2) {
							this.form.businessType = '采购商'
						} else if (this.form.radio === 3) {
							this.form.businessType = '摆渡车'
						} else if (this.form.radio === 4) {
							this.form.businessType = '员工/伙计'
						}
						let params = {
							// id: null,
							name: this.form.name,
							businessType: this.form.businessType,
							carNumber: this.form.carNumber,
							mobile: this.form.mobile,
							cardNo: this.form.cardNo,
							registProvince: this.form.registProvince,
							registCity: this.form.registCity,
							registArea: this.form.registArea,
							currentPlace: this.form.currentPlace,
							curentArea: this.form.curentArea,
							curentCity: this.form.curentCity,
							curentProvince: this.form.curentProvince,
							businessCatalog: this.form.businessCatalog,
							businessAddr: this.form.businessAddr,
							businessUrl: this.form.businessUrl,
							businessCode: this.form.businessCode,
							businessName: this.form.businessName,
							birthday: this.form.birthday,
							gender: this.form.gender,
							age: this.form.age,
							currentPlace: this.form.currentPlace,
							businessLinkman: this.form.businessLinkman,
							businessLinkmobile: this.form.businessLinkmobile,
							inTime: this.form.inTime,
							urlImg: this.supplier,
						}
						let ImgIstrue = true;
						if (!this.supplier) {
							ImgIstrue = false;
							uni.showToast({
								title: '请上传用户头像',
								icon: 'none'
							})
						}
						// 是否点击阅读
						let IsRead = true;
						if (!this.form.checked) {
							IsRead = false;
							uni.showToast({
								title: '请勾选我已阅读',
								icon: 'none'
							})
						}
						if (ImgIstrue && IsRead) {
							this.uniRequest({
								url: 'accouninfo/save',
								method: 'get',
								data: params,
								success: (res) => {
									uni.navigateTo({
										url: '/pages/Information/Success?radio=' + this.form.radio
									})
								}
							})
						}

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
				if (e.length > 0) {
					let val = '';
					e.forEach((item, index) => {
						console.log(item, 'item')
						val += (index > 0 ? '-' : '') + item.label;
					})
					console.log(e, 'e')
					if (this.form.active === '籍贯') {
						this.form.place = val;

						this.form.registProvince = e[0] ? e[0].label : '';
						this.form.registCity = e[1] ? e[1].label : '';
						this.form.registArea = e[2] ? e[2].label : '';
					} else if (this.form.active === '居住地') {
						this.form.residence = val;

						this.form.curentProvince = e[0] ? e[0].label : '';
						this.form.curentCity = e[1] ? e[1].label : '';
						this.form.curentArea = e[2] ? e[2].label : '';
					}
				}

			},
			// 日期控件
			PickerConfirm(e) {
				console.log(e, '111')
				this.form.inTime = e.year + '-' + e.month + '-' + e.day
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
			// 点击下一步
			nextClick() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						if (this.form.radio) {
							console.log(this.form.radio, 'radio')
							this.active_show = false;
							this.active_copy = this.form.radio;
							this.show_back_btn = true;
							this.form.checked = false;
							this.ReturnTop();
						}
					} else {
						console.log('验证失败');
					}
				});
			},
			// 上一步
			backClick() {
				this.active_show = true;
				this.show_back_btn = false;
				this.active_copy = null;
				this.ReturnTop();
			},
			// 打开日期框
			openLipicker(v) {
				this.showTime = true;
			},
			// 返回顶部
			ReturnTop() {
				uni.pageScrollTo({
					scrollTop: 0
					// duration: 300
				});
			},
			// 添加伙计信息
			AddPartner() {
				if (this.PartnerList.length < 3) {
					this.PartnerList.push({});
				}
				console.log(this.PartnerList, 'PartnerList')
			},
			// 上传图片
			Supplier_Upload(data, index, lists, name) {
				this.supplier = data.url;
			},
			Procurer_Upload(data, index, lists, name) {
				this.procurer = [{
					url: data.url
				}]
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		// 获取参数
		onLoad(res) {
			if (res.Active_radio) {
				this.form.radio = parseInt(res.Active_radio);
				this.active_show = true;
				this.show_back_btn = false;
			}
		},
		// 获取数据
		onShow() {
			this.uniRequest({
				url: 'accouninfo/getInfo',
				success: (res) => {
					console.log(res, 'res')
					if (res.code === 0) {
						this.form = {
							id: res.data.info.id,
							name: res.data.info.name,
							businessType: res.data.info.businessType,
							carNumber: res.data.info.carNumber,
							mobile: res.data.account.mobile ? res.data.account.mobile : '18727087210',
							cardNo: res.data.info.cardNo,
							registProvince: res.data.info.registProvince,
							registCity: res.data.info.registCity,
							registArea: res.data.info.registArea,
							currentPlace: res.data.info.currentPlace,
							curentArea: res.data.info.curentArea,
							curentCity: res.data.info.curentCity,
							curentProvince: res.data.info.curentProvince,
							businessCatalog: res.data.info.businessCatalog,
							businessAddr: res.data.info.businessAddr,
							businessUrl: res.data.info.businessUrl,
							businessCode: res.data.info.businessCode,
							businessName: res.data.info.businessName,
							birthday: res.data.info.birthday,
							gender: res.data.info.gender,
							age: res.data.info.age,
							currentPlace: res.data.info.currentPlace,
							businessLinkman: res.data.info.businessLinkman,
							businessLinkmobile: res.data.info.businessLinkmobile,
							inTime: res.data.info.inTime,
							urlImg: res.data.info.urlImg,
							// 自定义
							radio: null
						}
						// 身份
						if (res.data.info.businessType === '供应商') {
							this.form.radio = 1;
						} else if (res.data.info.businessType === '采购商') {
							this.form.radio = 2;
						} else if (res.data.info.businessType === '摆渡车') {
							this.form.radio = 3;
						} else if (res.data.info.businessType === '员工/伙计') {
							this.form.radio = 4;
						}
						// 户籍
						this.form.place = res.data.info.registProvince + '-' + res.data.info.registCity + '-' + res.data.info.registArea;
						// 居住地
						this.form.residence = res.data.info.curentProvince + '-' + res.data.info.curentCity + '-' + res.data.info.curentArea;
						// 图片
						// this.supplier.fileList = [{
						// 	url: this.form.urlImg
						// }]

						console.log(this.form, '111')

					}
				}
			})
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

				.Active_box_sun {
					.uploaderBox {
						padding: 0;
						padding: 20rpx 0rpx;
						display: flex;
						justify-content: space-between;
						border-bottom: 1px solid #F6F7F9;
						margin-bottom: 0rpx;
					}

					.Conbox {
						font-size: 28rpx;
						font-weight: 400;
						color: #C0C4CC;
					}
				}

				.partner {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx 30rpx;

					.tit_con {
						font-size: 32rpx;
						font-weight: 600;
						color: rgba(49, 49, 49, 1);
					}

					.add_con {
						font-size: 28rpx;
						font-weight: 400;
						color: rgba(149, 149, 149, 1);
					}
				}

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
						height: 522rpx;
						background: rgba(255, 255, 255, 1);
						border-radius: 32rpx 32rpx 4rpx 4rpx;

						.Upopup_header {
							display: flex;
							justify-content: center;
							position: relative;

							.tit {
								font-size: 36rpx;
								font-weight: 600;
								color: rgba(49, 49, 49, 1);
								padding: 0;
								padding: 30rpx 0rpx;
							}

							.submit {
								position: absolute;
								right: 30rpx;
								top: 30rpx;
								font-size: 32rpx;
								font-weight: 400;
								color: rgba(61, 174, 255, 1);
							}
						}

						.Upopup_box {
							// padding-bottom: 50rpx;
							width: 100%;
							// display: flex;
							// align-items: center;
							padding-top: 50rpx;
							height: 390rpx;
							overflow: hidden;
							overflow-y: scroll;
							box-sizing: border-box;
							padding: 0rpx 30rpx;

							.box {
								display: flex;
								align-items: center;
								justify-content: space-between;
								box-sizing: border-box;
								border-bottom: 1px solid #EDEDED;
								height: 92rpx;

								>text {
									font-size: 32rpx;
									font-weight: 400;
									color: rgba(49, 49, 49, 1);
								}
							}

							.u-checkbox-group {
								>view:last-child {
									border: none;
								}
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
