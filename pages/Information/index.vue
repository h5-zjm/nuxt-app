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
									<u-radio :name="4">司机/伙计</u-radio>
								</view>
								<view class="status_radio">
									<u-radio :name="5">新发地办公和临时人员</u-radio>
								</view>
							</u-radio-group>
						</view>

						<view class="tit" v-if="form.radio">必填信息</view>
						<view class="uploaderBox" v-if="form.radio">
							<!-- <u-upload :action="action" :max-count="1" :file-list="supplier.fileList" :show-progress="false" @on-success="Supplier_Upload"> -->
							<uImg ref="upimg" :canUploadFile="true" :limit="UpImg_Peoser.limitNum" :uploadFileUrl="UpImg_Peoser.uploadFileUrl"
							 :header="UpImg_Peoser.header" :fileKeyName="UpImg_Peoser.name" :uImgList.sync="UpImg_Peoser.uImgList" @uploadSuccess="uploadSuccess"
							 @upload="upFile" />

							<!-- </u-upload> -->
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
							<u-form-item prop="carNumber">
								<view class="Con_box">
									<text>车牌号</text>
									<u-input v-model="form.carNumber" input-align="right" style="flex: 1;" @input="CaseInput" placeholder="车牌不必填（如有车辆必须登记）" />
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
								<view @click="openSelect('性别')" :class="{'place_box':!form.gender}" style="text-align: right;flex: 1;">{{form.gender ? form.gender : '请选择性别'}}</view>
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
								<view @click="openUpopup('营运区域')" :class="{'place_box':!form.manageArea }">{{form.manageArea ? form.manageArea  : '请选择居住地'}}</view>
								<u-popup v-model="showUpopup" mode="bottom" :closeable="false" border-radius="14">
									<view class="Upopup_Con">
										<view class="Upopup_header">
											<text class="tit">请选择计划经营区域</text>
											<text class="submit" @click="submitUpopup('确定','营运区域')">确定</text>
											<text class="cancel" @click="submitUpopup('取消')">取消</text>
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
							<u-select v-model="showRegion" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select>
							<!-- <u-select v-model="showRegion" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select> -->
						</view>
					</view>

					<!-- 采购商 -->
					<view class="Active_box" v-if="active_copy === 2">
						<view class="Active_box">
							<view class="tit">个人信息</view>
							<view class="Active_box_sun">
								<u-form-item label="性别">
									<!-- <u-input v-model="form.gender" input-align="right" placeholder="请输入性别" /> -->
									<view @click="openSelect('性别')" :class="{'place_box':!form.gender}" style="text-align: right;flex: 1;">{{form.gender ? form.gender : '请选择性别'}}</view>
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
								<u-select v-model="showRegion" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select>
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
									<uImg ref="upimg" :canUploadFile="true" :limit="UpImg_Run.limitNum" :uploadFileUrl="UpImg_Run.uploadFileUrl"
									 :header="UpImg_Run.header" :fileKeyName="UpImg_Run.name" :uImgList.sync="UpImg_Run.uImgList" @uploadSuccess="uploadSuccess"
									 @upload="upFile" />

									<!-- </u-upload> -->
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
									<view @click="openUpopup('采购区域')" :class="{'place_box':!form.purchaseArea}">{{form.purchaseArea ? form.purchaseArea : '请选择当前计划经营区域（可多选）'}}</view>
									<u-popup v-model="showUpopup" mode="bottom" :closeable="false" border-radius="14">
										<view class="Upopup_Con">
											<view class="Upopup_header">
												<text class="tit">请选择计划经营区域</text>
												<text class="submit" @click="submitUpopup('确定','采购区域')">确定</text>
												<text class="cancel" @click="submitUpopup('取消')">取消</text>
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
							</view>

							<!-- 伙计1信息 -->
							<view class="partner_box">
								<view class="partner">
									<view class="tit_con">伙计1信息</view>
									<!-- <view class="add_con" @click="AddPartner" v-if="index === 0">继续添加</view> -->
								</view>
								<view class="Active_box_sun">
									<u-form-item prop="sex">
										<view class="Con_box">
											<text>伙计1姓名</text>
											<u-input style="flex: 1;text-align: right;" v-model="form.staffName1" input-align="right" placeholder="请输入伙计姓名" />
										</view>
									</u-form-item>
									<u-form-item prop="sex">
										<view class="Con_box">
											<text>伙计1身份证</text>
											<u-input style="flex: 1;text-align: right;" v-model="form.staffCardNo1" input-align="right" placeholder="请输入伙计身份证" />
										</view>
									</u-form-item>
									<u-form-item prop="sex">
										<view class="Con_box">
											<text>伙计1手机号</text>
											<u-input style="flex: 1;text-align: right;" v-model="form.staffMobile1" input-align="right" placeholder="请输入伙计手机号" />
										</view>
									</u-form-item>
									<u-form-item prop="sex">
										<view class="Con_box">
											<text>伙计1现住址</text>
											<u-input style="flex: 1;text-align: right;" v-model="form.staffAddr1" input-align="right" placeholder="请输入伙计现住址" />
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
								<view @click="openSelect('性别')" :class="{'place_box':!form.gender}" style="text-align: right;flex: 1;">{{form.gender ? form.gender : '请选择性别'}}</view>
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
							<u-select v-model="showRegion" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select>
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
								<uImg ref="upimg" :canUploadFile="true" :limit="UpImg_Run.limitNum" :uploadFileUrl="UpImg_Run.uploadFileUrl"
								 :header="UpImg_Run.header" :fileKeyName="UpImg_Run.name" :uImgList.sync="UpImg_Run.uImgList" @uploadSuccess="uploadSuccess"
								 @upload="upFile" />

								<!-- </u-upload> -->
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

						<!-- 伙计信息 -->
						<view class="partner_box">
							<view class="partner">
								<view class="tit_con">伙计1信息</view>
								<!-- <view class="add_con" @click="AddPartner" v-if="index === 0">继续添加</view> -->
							</view>
							<view class="Active_box_sun">
								<u-form-item prop="sex">
									<view class="Con_box">
										<text>伙计1姓名</text>
										<u-input style="flex: 1;text-align: right;" v-model="form.staffName1" input-align="right" placeholder="请输入伙计姓名" />
									</view>
								</u-form-item>
								<u-form-item prop="sex">
									<view class="Con_box">
										<text>伙计1身份证</text>
										<u-input style="flex: 1;text-align: right;" v-model="form.staffCardNo1" input-align="right" placeholder="请输入伙计身份证" />
									</view>
								</u-form-item>
								<u-form-item prop="sex">
									<view class="Con_box">
										<text>伙计1手机号</text>
										<u-input style="flex: 1;text-align: right;" v-model="form.staffMobile1" input-align="right" placeholder="请输入伙计手机号" />
									</view>
								</u-form-item>
								<u-form-item prop="sex">
									<view class="Con_box">
										<text>伙计1现住址</text>
										<u-input style="flex: 1;text-align: right;" v-model="form.staffAddr1" input-align="right" placeholder="请输入伙计现住址" />
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
								<view @click="openSelect('性别')" :class="{'place_box':!form.gender}" style="text-align: right;flex: 1;">{{form.gender ? form.gender : '请选择性别'}}</view>
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
							<u-select v-model="showRegion" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select>
						</view>
					</view>
					
					<!-- 新发地办公和临时人员 -->
					<view class="Active_box" v-if="active_copy === 5">
						<view class="tit">个人信息</view>
						<view class="Active_box_sun">
							<u-form-item label="性别">
								<view @click="openSelect('性别')" :class="{'place_box':!form.gender}" style="text-align: right;flex: 1;">{{form.gender ? form.gender : '请选择性别'}}</view>
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
							<u-select v-model="showRegion" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select>
						</view>
					</view>
					
					
					<view class="state" v-if="form.radio">
						<u-checkbox v-model="form.checked"></u-checkbox>
						<text>我已阅读并知晓本申报所列事项，并保证以上申报内容正确属实，如因错误填报产生的法律责任后果自负。</text>
					</view>

					<view class="next" v-if="form.radio">
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
	import citys from '../../common/citys.js';
	import {
		timeFormat,
		GetQueryValue
	} from '../../common/common.js';
	import uImg from '@/components/zhtx-uploadImg/zhtx-uploadImg.vue';
	export default {
		components: {
			uImg
		},
		data() {
			return {
				showRegion: false,
				// 图片
				// 上传附件
				UpImg_Peoser: {
					limitNum: 1,
					uploadFileUrl: 'https://testxfdm.daizhangfang.net/common/sysFile/uploadBase64',
					msg: '',
					length: 140,
					name: '用户', //上传的名字
					header: { // 如果需要header，请上传
					},
					uImgList: []

				},
				UpImg_Run: {
					limitNum: 1,
					uploadFileUrl: 'https://testxfdm.daizhangfang.net/common/sysFile/uploadBase64',
					msg: '',
					length: 150,
					name: '营业执照', //上传的名字
					header: { // 如果需要header，请上传
					},
					uImgList: []
				
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
					mobile: '',
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
					staffName1: '',
					staffCardNo1: '',
					staffMobile1: '',
					staffAddr1: '',

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
						pattern: /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$)/,
						// 正则检验前先将值转为字符串
						transform(value) {
							return String(value);
						},
						message: '请输入正确的车牌号',
						trigger: ['change', 'blur']
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
					}],
					staffCardNo1: [
					{
						pattern: CONFIG.ID_CODE,
						// 正则检验前先将值转为字符串
						transform(value) {
							return String(value);
						},
						message: '请输入18位身份证号',
						trigger: ['change', 'blur']
					}],
					staffMobile1: [
					{
						pattern: CONFIG.MOBILE_REGEXP,
						// 正则检验前先将值转为字符串
						transform(value) {
							return String(value);
						},
						message: '请输入11位手机号',
						trigger: ['change', 'blur']
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
			// 车牌号大写
			CaseInput(val){
				this.form.carNumber = val.toUpperCase()
			},
			// 提交
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						if(this.form.gender === '1') {
							this.form.gender = '男'
						} else if(this.form.gender === '2') {
							this.form.gender = '女'
						}
						if (this.form.radio === 1) {
							this.form.businessType = '供应商'
						} else if (this.form.radio === 2) {
							this.form.businessType = '采购商'
						} else if (this.form.radio === 3) {
							this.form.businessType = '摆渡车'
						} else if (this.form.radio === 4) {
							this.form.businessType = '司机/伙计'
						} else if (this.form.radio === 5) {
							this.form.businessType = '新发地办公和临时人员'
						}
						let params = {
							id: this.form.id,
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
							// birthday: this.form.birthday,
							urlImg: this.form.urlImg,
							inTime: this.form.inTime,
							gender: this.form.gender,
							age: this.form.age,
							currentPlace: this.form.currentPlace,
							purchaseArea: this.form.purchaseArea,
							manageArea: this.form.manageArea,
							businessLinkman: this.form.businessLinkman,
							businessLinkmobile: this.form.businessLinkmobile,
							staffName1: this.form.staffName1,
							staffCardNo1: this.form.staffCardNo1,
							staffMobile1: this.form.staffMobile1,
							staffAddr1: this.form.staffAddr1
						}
						let ImgIstrue = true;
						if (!this.form.urlImg) {
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
								url: 'accouninfo/save1',
								method: 'get',
								data: params,
								success: (res) => {
									console.log(res,'000')
									if(res.data.code === 0) {
										uni.navigateTo({
											url: '/pages/Information/Success?radio=' + this.form.radio
										})
									}
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
					} else if (this.form.active === '性别'){
						this.form.gender = e[0] ? e[0].label : ''
					}
				}

			},
			// 日期控件
			PickerConfirm(e) {
				console.log(e, '111')
				this.form.inTime = e.year + '-' + e.month + '-' + e.day
			},
			// 打开多级联动
			openSelect(val) {
				this.showRegion = true;
				this.form.active = val;
				if(val === '性别') {
					this.list = [
						{
							value: '1',
							label: '男'
						},
						{
							value: '2',
							label: '女'
						}
					]
				} else {
					this.list = citys;
				}
			},
			// 打开u-popup
			openUpopup(val) {
				this.showUpopup = true;
			},
			// 关闭u-popup
			submitUpopup(val,res) {
				this.showUpopup = false;
				if (val === '确定') {
					let txt = '';
					if (this.subcampList.length > 0) {
						this.subcampList.forEach((item, index) => {
							if (item.checked) {
								txt += ',' + item.title;
							}
						})
					}
					if(res === '采购区域') {
						this.form.purchaseArea = txt.substr(1);
					} else if(res === '营运区域'){
						this.form.manageArea = txt.substr(1);
					}
				}
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
			},
			// 图片上传
			uploadSuccess(result) {
				console.log(result,'result')
				if(result.res.confirm) {
					if(result.name === '用户'){
						this.form.urlImg = '';
						this.UpImg_Peoser.uImgList = []
					} else if(result.name === '营业执照') {
						this.form.businessUrl = '';
						this.UpImg_Run.uImgList = []
					}
				} else if(result.res.data) {
					let res = result.res.data;
					if(result.name === '用户') {
						this.form.urlImg = res.url;
						this.UpImg_Peoser.uImgList = [res.url]
					} else if(result.name === '营业执照') {
						this.form.businessUrl = res.url;
						this.UpImg_Run.uImgList = [res.url]
					}
				}
				console.log(this.form.urlImg,'urlImg')
			},
			//上传方法的调用
			upFile() {
				this.$refs.upimg.upload()
			}
		},
		computed: {
			computeLength() {
				return this.length = 140 - this.msg.length
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
		created() {
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
							mobile: res.data.account.cellphone ? res.data.account.cellphone : '',
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
							purchaseArea: res.data.info.purchaseArea,
							manageArea: res.data.info.manageArea,
							businessLinkman: res.data.info.businessLinkman,
							businessLinkmobile: res.data.info.businessLinkmobile,
							staffName1: res.data.info.staffName1,
							staffCardNo1: res.data.info.staffCardNo1,
							staffMobile1: res.data.info.staffMobile1,
							staffAddr1: res.data.info.staffAddr1,
							inTime: '',
							urlImg: res.data.info.urlImg,
							// 自定义
							radio: null,
							checked: false
						}
						if(res.data.info.inTime !== null && res.data.info.inTime !== '') {
							let txt = res.data.info.inTime.split(' ');
							this.form.inTime = txt[0];
						}
						// console.log(res.data.info.inTime.split(' '),'字符串切割')
						// 身份
						if (res.data.info.businessType === '供应商') {
							this.form.radio = 1;
						} else if (res.data.info.businessType === '采购商') {
							this.form.radio = 2;
						} else if (res.data.info.businessType === '摆渡车') {
							this.form.radio = 3;
						} else if (res.data.info.businessType === '司机/伙计') {
							this.form.radio = 4;
						} else if (res.data.info.businessType === '新发地办公和临时人员') {
							this.form.radio = 5;
						}
						// 户籍
						let userInfo = res.data.info;
						
						this.form.place = userInfo.registProvince ? userInfo.registProvince : '' + '-' + userInfo.registCity ? userInfo.registCity : '' + '-' + userInfo.registArea ? userInfo.registArea : '';
						// 居住地
						this.form.residence = userInfo.curentProvince ? userInfo.curentProvince : '' + '-' + userInfo.curentCity ? userInfo.curentCity : '' + '-' + userInfo.curentArea ? userInfo.curentArea : '';
						// 图片
						this.UpImg_Peoser.uImgList = res.data.info.urlImg ? [res.data.info.urlImg] : [];
						this.UpImg_Run.uImgList = res.data.info.businessUrl ? [res.data.info.businessUrl] : [];

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
					margin-left: 15rpx;

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
					
					.place_box {
						font-size: 28rpx;
						color: #C0C4CC;
						// cursor: pointer;
						// background: rgba(0,0,0,0);
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

							.cancel {
								position: absolute;
								left: 30rpx;
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
