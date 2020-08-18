<template>
	<view id="SellGoods">
		<u-form :model="form" ref="uForm" label-width="auto">
			<view class="tit">进门信息</view>
			<view class="Con">
				<u-form-item prop="subscribeTimeStr">
					<view class="Con_box">
						<text class="star">预约时间</text>
						<view @click="openLipicker('预约时间')" :class="{'place_box':!form.subscribeTimeStr}">{{form.subscribeTimeStr ? form.subscribeTimeStr : '请选择预约时间'}}</view>
					</view>
				</u-form-item>
				<u-form-item prop="tradeSector">
					<view class="Con_box">
						<text class="star">交易区</text>
						<view @click="openSelect('交易区')" :class="{'place_box':!form.tradeSector}">{{form.tradeSector ? form.tradeSector : '请选择进场交易区'}}</view>
					</view>
				</u-form-item>
				<u-form-item prop="enterDoorNum">
					<view class="Con_box">
						<text class="star">进场门</text>
						<view :class="{'place_box':!form.enterDoorNum}">{{form.enterDoorNum ? form.enterDoorNum : '请选择进场门'}}</view>
					</view>
				</u-form-item>
				<u-form-item>
					<view class="Con_box">
						<text>货品品类</text>
						<view @click="categorySelect('货品品类')" :class="{'place_box':!form.itemVariety}">{{form.itemVariety ? form.itemVariety : '请选择货品品类'}}</view>
					</view>
				</u-form-item>
				<u-select v-model="showCategory" value-name="name" label-name="name" :list="listCategory" @confirm="comfirmCategory"></u-select>
				<!-- select框 -->
				<u-select v-model="show" mode="mutil-column-auto" :list="List_Con" @confirm="confirm"></u-select>
				<!-- <u-select v-model="show" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select> -->
				<!-- 日期框-(设置不了默认时间) -->
				<u-picker mode="time" v-model="showTime" :default-time="today" :params="params" @confirm="sureTime"></u-picker>
			</view>

			<view class="Con_goods">
				<u-form-item prop="name">
					<view class="Con_box">
						<text>产品</text>
						<!-- <u-input v-model="form.name" style="flex: 1;text-align: right;" placeholder="请输入产品" /> -->
					</view>
				</u-form-item>
				<u-form-item prop="itemPlace">
					<view class="Con_box">
						<text class="star">产地</text>
						<view :class="{'place_box':!form.itemPlace}">
							<u-radio-group v-model="form.origin">
								<u-radio shape="circle" name=1>国产</u-radio>
								<u-radio shape="circle" name=2>进口</u-radio>
							</u-radio-group>
						</view>
					</view>
				</u-form-item>
				<u-form-item prop="itemPlace">
					<view class="Con_box">
						<text class="star">具体产地</text>
						<view @click="openSelectMore('具体产地')" :class="{'place_box':!form.itemPlace}">{{form.itemPlace ? form.itemPlace : '请选择具体产地'}}</view>
					</view>
				</u-form-item>
				<u-form-item prop="itemNum">
					<view class="Con_box">
						<text>数量</text>
						<u-input v-model="form.itemNum" style="flex: 1;" input-align="right" @input="efficacy('数量')" placeholder="请输入货品重量" />KG
					</view>
				</u-form-item>
				<u-form-item prop="CarNum">
					<view class="Con_box">
						<text class="star">车牌号</text>
						<u-input v-model="form.CarNum" style="flex: 1;" input-align="right" @input="CaseInput" placeholder="请输入车牌号" />
					</view>
				</u-form-item>

				<!-- 多级联动 -->
				<u-select v-model="showRegion" mode="mutil-column-auto" :list="list" @confirm="confirmRegion"></u-select>
			</view>

			<view class="Uploader_box">
				<view class="Uploader_box_left">
					<view class="star">货物照片</view>
					<uImg ref="upimg" :canUploadFile="true" :limit="UpImg_Peoser.limitNum" :uploadFileUrl="UpImg_Peoser.uploadFileUrl"
					 :header="UpImg_Peoser.header" :fileKeyName="UpImg_Peoser.name" :uImgList.sync="UpImg_Peoser.uImgList"
					 @uploadSuccess="uploadSuccess" @upload="upFile" />
				</view>
				<view class="Uploader_box_right">
					<view>检测证明</view>
					<uImg ref="upimg" :canUploadFile="true" :limit="UpImg_Run.limitNum" :uploadFileUrl="UpImg_Run.uploadFileUrl"
					 :header="UpImg_Run.header" :fileKeyName="UpImg_Run.name" :uImgList.sync="UpImg_Run.uImgList" @uploadSuccess="uploadSuccess"
					 @upload="upFile" />
				</view>
			</view>

			<view class="tit">《食品农产品合格证》</view>

			<view class="Good_box">
				<u-form-item prop="name">
					<view class="Con_box">
						<text>食用农产品名称</text>
						<u-input v-model="form.certificateName" style="flex: 1;" input-align="right" placeholder="请输入食用农产品名称" />
					</view>
				</u-form-item>
				<u-form-item prop="certificateNum">
					<view class="Con_box">
						<text>数量（重量）</text>
						<u-input v-model="form.certificateNum" style="flex: 1;" input-align="right" placeholder="请输入请输入货品重量" />KG
					</view>
				</u-form-item>
				<u-form-item>
					<view class="Con_box">
						<text>开具时间</text>
						<view @click="openLipicker('开具时间')" :class="{'place_box':!form.certificateTime}">{{form.certificateTime ? form.certificateTime : '请选择开具时间'}}</view>
					</view>
				</u-form-item>
				<u-form-item prop="certificateUser">
					<view class="Con_box">
						<text class="star">生产者</text>
						<u-input v-model="form.certificateUser" style="flex: 1;" input-align="right" placeholder="请输入生产者" />
					</view>
				</u-form-item>
				<u-form-item>
					<view class="Con_box">
						<text>产地地址</text>
						<u-input v-model="form.certificateAddress" style="flex: 1;" input-align="right" placeholder="请输入产地地址具体到村" />
					</view>
				</u-form-item>
				<u-form-item>
					<view class="Con_box">
						<text>联系方式</text>
						<u-input v-model="form.certificatePhone" style="flex: 1;" input-align="right" placeholder="请输入联系电话" />
					</view>
				</u-form-item>
				<u-form-item>
					<view class="Con_box">
						<text>运输车辆车牌</text>
						<u-input v-model="form.certificateCarNum" style="flex: 1;" input-align="right" @input="CaseInputCopy" placeholder="请输入车牌号" />
					</view>
				</u-form-item>
			</view>

			<view class="Checkbox">
				<u-checkbox v-model="form.checked"></u-checkbox>
				<view>
					我承诺对产品质量安排以及合作证真实性负责；<br>
					不使用禁限农药兽药；<br>
					不使用非法添加物；<br>
					遵守农药安全间隔期、兽药休药期规定；<br>
					销售的食用农产品符合农药兽药残留食品安全国家标准；
				</view>
			</view>
		</u-form>
		<view class="btn" @click="submit">
			<view class="btn_box">提交</view>
		</view>
		<u-popup v-model="showPop" mode="center" border-radius="10" style="max-height: 60%;margin-top: 20%;">
			<view class="popAll">
				<view class="search">
					<u-search placeholder="请输入种类" v-model="keyword" @change="serchFor"></u-search>
				</view>
				<view class="popList" v-for="item in newList || list" @click="add(item.name)">
					{{item.name}}
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import citys from '../../common/citys.js'
	import uImg from '@/components/zhtx-uploadImg/zhtx-uploadImg.vue';
	import {
		GetQueryValue
	} from '../../common/common.js'
	export default {
		components: {
			uImg
		},
		data() {
			return {
				today: '',
				id: null,
				UpImg_Peoser: {
					limitNum: 1,
					uploadFileUrl: 'https://wechat.daizhangfang.net/common/sysFile/uploadBase64',
					msg: '',
					length: 140,
					name: '货物照片', //上传的名字
					header: { // 如果需要header，请上传
					},
					uImgList: []

				},
				UpImg_Run: {
					limitNum: 1,
					uploadFileUrl: 'https://wechat.daizhangfang.net/common/sysFile/uploadBase64',
					msg: '',
					length: 150,
					name: '检测证明', //上传的名字
					header: { // 如果需要header，请上传
					},
					uImgList: []

				},
				form: {
					origin:'',
					id: null,
					subscribeTimeStr: '',
					tradeSector: '',
					enterDoorNum: '',
					itemVariety: '',
					itemPlace: '',
					CarNum: '',
					certificateName: '',
					certificateTime: '',
					certificateUser: '',
					certificatePhone: '',
					certificateCarNum: '',
					itemNum: '',
					certificateNum: '',
					certificateAddress: '',
					itemImg: '',
					checkImg: '',
					checked: false
				},
				procurer: {
					fileList: []
				},
				rules: {
					time: [{
						required: true,
						message: '请选择预约时间',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					deal: [{
						required: true,
						message: '请选择进场交易区',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					enter: [{
						required: true,
						message: '请选择进场门',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					region: [{
						required: true,
						message: '请选择具体产地',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					CarNum: [{
						required: true,
						message: '请输入车牌号',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					producer: [{
						required: true,
						message: '请输入生产者',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					itemNum: [{
						pattern: /^[0-9]*$/,
						// 正则检验前先将值转为字符串
						transform(value) {
							return String(value);
						},
						message: '请输入数字',
						trigger: ['change', 'blur']
					}],
					certificateNum: [{
						pattern: /^[0-9]*$/,
						// 正则检验前先将值转为字符串
						transform(value) {
							return String(value);
						},
						message: '请输入数字',
						trigger: ['change', 'blur']
					}]
				},
				// 定义select框
				show: false,
				SelectCon: '',
				list: [{

					label: "芒果交易区",
					value: 1,
					children: [{
						label: "芒果交易区正门",
						value: 2,
					}, {
						label: "芒果员工通道",
						value: 3,
					}]
				}, {
					label: "周转一区",
					value: 4,
					children: [{
						label: "周转一区1门",
						value: 5,
					}, {
						label: "周转一区2门",
						value: 6,
					}, {
						label: "周转一区3门",
						value: 7,
					}],

				}, {
					children: [],
					label: "水果区",
					value: 8,
				}],
				List_Con: [{
						value: '芒果交易区',
						label: '芒果交易区',
						children: [{
								value: '芒果交易区正门',
								label: '芒果交易区正门'
							},
							{
								value: '芒果员工通道',
								label: '芒果员工通道'
							}
						]
					},
					{
						value: '周转一区',
						label: '周转一区',
						children: [{
								value: '周转一区1门',
								label: '周转一区1门'
							},
							{
								value: '周转一区2门',
								label: '周转一区2门'
							},
							{
								value: '周转一区3门',
								label: '周转一区3门'
							}
						]
					},
					{
						value: '水果区',
						label: '水果区',
						children: [{
								value: '大农门',
								label: '大农门'
							},
							{
								value: '富农门',
								label: '富农门'
							},
							{
								value: '强农门',
								label: '强农门'
							},
							{
								value: '裕农门',
								label: '裕农门'
							},
							{
								value: '三农门',
								label: '三农门'
							},
							{
								value: '水果区',
								label: '水果区'
							},
							{
								value: '大农门车场',
								label: '大农门车场'
							}
						]
					},
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
				newList:[],
				list: [],
				action: 'https://wechat.daizhangfang.net/common/sysFile/upload',
				supplier: {
					fileList: [],
					businessList: []
				},
				imgUrlFirst: '',
				imgUrlTwo: '',
				openTime: '',
				listCategory: [{
					name: '白萝卜'
				}, {
					name: '散玉米'
				}, {
					name: '黄心菜'
				}, {
					name: '扁洋'
				}, {
					name: '小白菜'
				}, {
					name: '水菜'
				}, {
					name: '泡泡青'
				}, {
					name: '葱头'
				}, {
					name: '水萝卜'
				}, {
					name: '油菜'
				}, {
					name: '大白菜'
				}, {
					name: '冬瓜'
				}, {
					name: '芥蓝'
				}, {
					name: '胡萝卜'
				}, {
					name: '菊白菜'
				}, {
					name: '上海青'
				}, {
					name: '油麦菜'
				}, {
					name: '苦菊'
				}, {
					name: '紫菜苔'
				}, {
					name: '韭菜苔'
				}, {
					name: '菠菜'
				}, {
					name: '圆洋'
				}, {
					name: '竹笋'
				}, {
					name: '韭菜花'
				}, {
					name: '红薯'
				}, {
					name: '香菜'
				}, {
					name: '茴香'
				}, {
					name: '干辣椒'
				}, {
					name: '苦瓜'
				}, {
					name: '黄瓜'
				}, {
					name: '青蒜'
				}, {
					name: '大椒'
				}, {
					name: '小椒'
				}, {
					name: '榨菜头'
				}, {
					name: '小葱'
				}, {
					name: '芥菜头'
				}, {
					name: '韭菜'
				}, {
					name: '卞萝卜'
				}, {
					name: '山东菜'
				}, {
					name: '有机散菜花'
				}, {
					name: '圣女果'
				}, {
					name: '油菜苔'
				}, {
					name: '茼蒿'
				}, {
					name: '生菜'
				}, {
					name: '香椿'
				}, {
					name: '豆角'
				}, {
					name: '西红柿'
				}, {
					name: '苇叶'
				}, {
					name: '荷兰豆'
				}, {
					name: '豌豆'
				}, {
					name: '丝瓜'
				}, {
					name: '西兰花'
				}, {
					name: '云南菜'
				}, {
					name: '穿心莲'
				}, {
					name: '香芹'
				}, {
					name: '莴笋'
				}, {
					name: '豆芽'
				}, {
					name: '雪里蕻'
				}, {
					name: '芥菜樱'
				}, {
					name: '香葱'
				}, {
					name: '芋头'
				}, {
					name: '甘露'
				}, {
					name: '咸菜'
				}, {
					name: '蚕豆'
				}, {
					name: '(四川杂货)'
				}, {
					name: '苤蓝'
				}, {
					name: '珍珠萝卜'
				}, {
					name: '散装土豆'
				}, {
					name: '黄花'
				}, {
					name: '土豆'
				}, {
					name: '紫甘蓝'
				}, {
					name: '大葱'
				}, {
					name: '瓠子'
				}, {
					name: '心里美'
				}, {
					name: '青萝卜'
				}, {
					name: '油葫芦'
				}, {
					name: '藕'
				}, {
					name: '特菜'
				}, {
					name: '(上海青杂货)'
				}, {
					name: '红椒'
				}, {
					name: '芹菜'
				}, {
					name: '粉条'
				}, {
					name: '头茬蒜黄'
				}, {
					name: '鬼子姜'
				}, {
					name: '凉薯'
				}, {
					name: '棒棒菜'
				}, {
					name: '茄子'
				}, {
					name: '鲜海带'
				}, {
					name: '紫薯'
				}, {
					name: '茭白'
				}, {
					name: '佛手'
				}, {
					name: '荸荠'
				}, {
					name: '姜'
				}, {
					name: '蒜苗'
				}, {
					name: '豇豆'
				}, {
					name: '毛葱'
				}, {
					name: '花生'
				}, {
					name: '蒜'
				}, {
					name: '毛豆'
				}, {
					name: '牛蒡'
				}, {
					name: '山药'
				}, {
					name: '冬笋'
				}, {
					name: '南瓜'
				}, {
					name: '蛋类'
				}, {
					name: '粮油(米、面、油)'
				}, {
					name: '菌类'
				}, {
					name: '冻货'
				}, {
					name: '调料'
				}, {
					name: '木耳'
				}, {
					name: '海产品'
				}, {
					name: '苹果'
				}, {
					name: '花牛'
				}, {
					name: '西瓜'
				}, {
					name: '梨'
				}, {
					name: '贡梨'
				}, {
					name: '香蕉'
				}, {
					name: '小叶桔'
				}, {
					name: '南风蜜桔'
				}, {
					name: '澳柑'
				}, {
					name: '椪柑'
				}, {
					name: '沙果'
				}, {
					name: '草莓'
				}, {
					name: '香梨'
				}, {
					name: '莎白'
				}, {
					name: '桑葚'
				}, {
					name: '芒果'
				}, {
					name: '干果'
				}, {
					name: '山楂'
				}, {
					name: '核桃'
				}, {
					name: '特果'
				}, {
					name: '椰子'
				}, {
					name: '菠萝'
				}, {
					name: '冬枣'
				}, {
					name: '柿饼'
				}, {
					name: '甘蔗'
				}, {
					name: '柿子'
				}, {
					name: '石榴'
				}, {
					name: '杨梅'
				}, {
					name: '无花果'
				}, {
					name: '瓜类'
				}, {
					name: '荔枝'
				}, {
					name: '冰糖心'
				}, {
					name: '富士'
				}, {
					name: '毛丹'
				}, {
					name: '姑娘果'
				}, {
					name: '国光'
				}, {
					name: '南果梨'
				}, {
					name: '帝王蕉'
				}, {
					name: '金桔'
				}, {
					name: '贡柑'
				}, {
					name: '脐橙'
				}, {
					name: '芦柑'
				}, {
					name: '桔子'
				}, {
					name: '海棠'
				}, {
					name: '樱桃'
				}, {
					name: '丑桔'
				}, {
					name: '甜甜柚'
				}, {
					name: '哈密瓜'
				}, {
					name: '猕猴桃'
				}, {
					name: '食品'
				}, {
					name: '雪莲果'
				}, {
					name: '板栗'
				}, {
					name: '菱角'
				}, {
					name: '鲜枣'
				}, {
					name: '葡萄'
				}, {
					name: '沙糖桔'
				}, {
					name: '提子'
				}, {
					name: '东方蜜甜瓜'
				}, {
					name: '胡柚'
				}, {
					name: '向日葵'
				}, {
					name: '枇杷'
				}, {
					name: '杨桃'
				}, {
					name: '木瓜'
				}, {
					name: '杏'
				}, {
					name: '桃'
				}, {
					name: '李子'
				}, {
					name: '桂圆'
				}, {
					name: '新纸箱'
				}, {
					name: '小瓶水、饮料、啤酒'
				}, {
					name: '馒头'
				}, {
					name: '旧纸箱'
				}, {
					name: '网袋'
				}, {
					name: '旧棉被'
				}, {
					name: '番茄（黑筐）'
				}, {
					name: '包装盒'
				}, {
					name: '编织袋'
				}, {
					name: '月饼'
				}, {
					name: '花篮'
				}, {
					name: '泡沫箱'
				}, {
					name: '塑料筐'
				}, {
					name: '面条'
				}, {
					name: '棉被'
				}, {
					name: '玉米'
				}, {
					name: '菜心'
				}, {
					name: '白萝卜'
				}, {
					name: '二区水果'
				}, {
					name: '大桔子'
				}, {
					name: '冰糖心'
				}, {
					name: '富士'
				}, {
					name: '姑娘果'
				}, {
					name: '国光'
				}, {
					name: '金瓜'
				}],
				showCategory: false
			}

		},
		created() {
			this.getToday()
		},
		methods: {
			// 效验输入数字
			efficacy(val) {
				let regPos = /[^\d]/g;
				if (!regPos.test(this.form.itemNum)) {

				}
			},
			// 车牌号大写
			CaseInput(val) {
				console.log(val, 'val')
				this.form.CarNum = val.toUpperCase()
			},
			CaseInputCopy(val) {
				console.log(val, 'val')
				this.form.certificateCarNum = val.toUpperCase()
			},
			submit() {
				if (this.form.id) {
					this.update_http()
				} else {
					this.submit_http()
				}
			},
			submit_http() {
				console.log(this.procurer.fileList)
				this.$refs.uForm.validate(valid => {
					if (valid) {
						let IsImg = true;
						if (!this.form.itemImg) {
							IsImg = false;
							uni.showToast({
								title: '请上传货物照片',
								icon: 'none'
							})
						}
						let IsChecked = true;
						if (!this.form.checked) {
							IsChecked = false;
							uni.showToast({
								title: '请勾选我已阅读',
								icon: 'none'
							})
						}
						let data = {
							itemSource: this.form.origin,
							subscribeTimeStr: this.form.subscribeTimeStr,
							tradeSector: this.form.tradeSector,
							enterDoorNum: this.form.enterDoorNum,
							itemVariety: this.form.itemVariety,
							itemPlace: this.form.itemPlace,
							CarNum: this.form.CarNum,
							certificateName: this.form.certificateName,
							certificateTime: this.form.certificateTime,
							certificateUser: this.form.certificateUser,
							certificatePhone: this.form.certificatePhone,
							certificateCarNum: this.form.certificateCarNum,
							itemNum: this.form.itemNum,
							certificateNum: this.form.certificateNum,
							certificateAddress: this.form.certificateAddress,
							itemImg: this.form.itemImg,
							checkImg: this.form.checkImg,
							type:1,
						}
						if (IsImg && IsChecked) {
							this.uniRequest({
								url: 'carSubscribe/save',
								method: 'post',
								data: data,
								success: (res) => {
									console.log(res, 'res11')
									if (res.data.code === 0) {
										uni.navigateTo({
											url: '/pages/appointmentSuccessful/successful?id=' + res.data.msg
										})
									} else {
										uni.showToast({
											title: res.data.msg,
											icon: 'none'
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
			update_http() {
				console.log(this.procurer.fileList)
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						let IsImg = true;
						if (!this.form.itemImg) {
							IsImg = false;
							uni.showToast({
								title: '请上传货物照片',
								icon: 'none'
							})
						}
						let IsChecked = true;
						if (!this.form.checked) {
							IsChecked = false;
							uni.showToast({
								title: '请勾选我已阅读',
								icon: 'none'
							})
						}
						let data = {
							itemSource: this.form.origin,
							id: this.form.id,
							subscribeTimeStr: this.form.subscribeTimeStr,
							tradeSector: this.form.tradeSector,
							enterDoorNum: this.form.enterDoorNum,
							itemVariety: this.form.itemVariety,
							itemPlace: this.form.itemPlace,
							CarNum: this.form.CarNum,
							certificateName: this.form.certificateName,
							certificateTime: this.form.certificateTime,
							certificateUser: this.form.certificateUser,
							certificatePhone: this.form.certificatePhone,
							certificateCarNum: this.form.certificateCarNum,
							itemNum: this.form.itemNum,
							certificateNum: this.form.certificateNum,
							certificateAddress: this.form.certificateAddress,
							itemImg: this.form.itemImg,
							checkImg: this.form.checkImg,
							type:1,
						}
						if (IsImg && IsChecked) {
							this.uniRequest({
								url: 'carSubscribe/update',
								method: 'post',
								data: data,
								success: (res) => {
									console.log(res, 'res11')
									if (res.data.code === 0) {
										uni.navigateTo({
											url: '/pages/appointmentSuccessful/successful?id=' + res.data.msg
										})
									} else {
										uni.showToast({
											title: res.data.msg,
											icon: 'none'
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
			// select框确认
			confirm(e) {
				console.log(e);
				this.show = false;
				console.log(e, 'ee')
				if (this.SelectCon === '交易区') {
					this.form.tradeSector = e[0].label
					this.form.enterDoorNum = e[1].label;
				}
			},
			categorySelect(v) {
				console.log(v, 'v')
				this.showPop = true;
				this.newList = this.listCategory
			},
			serchFor(value) {
				console.log('搜索框输入的值',value)
				if(value) {
					console.log('有值')
				let data = [];
					for(let i = 0;i<this.listCategory.length;i++) {
						if(this.listCategory[i].name.indexOf(value) != -1) {
							data.push(this.listCategory[i])
						}
						
					}
					
					this.newList = data
					console.log('帅选的表',newList)
				} else {
					console.log('物质')
					this.newList = this.list
				}

			},
			add(e) {
				this.form.itemVariety = e
				this.showPop = false
				
			},
			// 弹窗框
			openSelect(v) {
				this.SelectCon = v;
				this.show = true;
			},
			// 获取交易区-进场区数据
			getDistrict() {
				uni.request({
					url: 'https://testxfdm.daizhangfang.net/statistics/getLane',
					success: (res) => {
						if (res.data.code === 0) {
							console.log(res.data.data, 'data')
							if (res.data.data.length > 0) {
								res.data.data.forEach((item, index) => {
									item.label = item.name;
									item.children.forEach((i, j) => {
										i.label = i.name;
									})
								})
							}
							this.List_Con = res.data.data;
						}
					}
				})
			},
			// 打开日期框
			openLipicker(v) {
				console.log('谁打开', v)
				this.showTime = true;
				this.openTime = v
			},
			// 地区多级联动
			confirmRegion(e) {
				let val = '';
				for (let i = 0; i < e.length; i++) {
					val += e[i].label
				}
				if (this.activeRegion === '具体产地') {
					this.form.itemPlace = val;
				}
			},
			openSelectMore(v) {
				this.activeRegion = v;
				this.showRegion = true;
				this.list = citys
			},
			// 图片上传
			Supplier_Upload(data, index, lists, name) {
				this.supplier = data.url;
			},
			sureTime(date) {
				console.log('选中日期', date)
				if (this.openTime == '预约时间') {
					this.form.subscribeTimeStr = date.year + '-' + date.month + '-' + date.day
				} else if (this.openTime == '开具时间') {
					this.form.certificateTime = date.year + '-' + date.month + '-' + date.day
				}
			},
			comfirmCategory(e) {
				this.form.itemVariety = e[0].label
			},
			// 图片上传
			uploadSuccess(result) {
				console.log(result, 'result')
				if (result.res.confirm) {
					if (result.name === '货物照片') {
						this.form.itemImg = '';
						this.UpImg_Peoser.uImgList = []
					} else if (result.name === '检测证明') {
						this.form.checkImg = '';
						this.UpImg_Run.uImgList = []
					}
				} else if (result.res.data) {
					let res = result.res.data;
					if (result.name === '货物照片') {
						this.form.itemImg = res.url;
						this.UpImg_Peoser.uImgList = [res.url]
					} else if (result.name === '检测证明') {
						this.form.checkImg = res.url;
						this.UpImg_Run.uImgList = [res.url]
					}
				}
			},
			jurisdiction() {
				this.uniRequest({
					url: 'accouninfo/getInfo',
					success: (res) => {
						if (!res.data.account.cellphone) {
							uni.navigateTo({
								url: '/pages/login/index'
							})
						}
						if (!res.data.info.name && !res.data.info.cardNo) {
							uni.navigateTo({
								url: '/pages/Information/Error'
							})
						}
						if (res.data.account.cellphone && Number(res.data.info.status) === 0) {
							uni.navigateTo({
								url: '/pages/Information/audit'
							})
						}
					}
				})
			},
			getInfo() {
				this.uniRequest({
					url: 'carSubscribe/getById/' + this.id,
					success: (res) => {
						console.log(res, 'res')
						if (res.code === 0) {
							this.form = {
								origin:res.data.itemSource,
								id: res.data.id,
								subscribeTimeStr: res.data.subscribeTime,
								tradeSector: res.data.tradeSector,
								enterDoorNum: res.data.enterDoorNum,
								itemVariety: res.data.itemVariety,
								itemPlace: res.data.itemPlace,
								CarNum: res.data.carNum || '',
								certificateName: res.data.certificateName,
								certificateTime: res.data.certificateTime,
								certificateUser: res.data.certificateUser,
								certificatePhone: res.data.certificatePhone,
								certificateCarNum: res.data.certificateCarNum || '',
								itemNum: res.data.itemNum,
								certificateNum: res.data.certificateNum,
								certificateAddress: res.data.certificateAddress,
								itemImg: res.data.itemImg,
								checkImg: res.data.checkImg
							}

							this.UpImg_Peoser.uImgList = res.data.itemImg ? [res.data.itemImg] : [];
							this.UpImg_Run.uImgList = res.data.checkImg ? [res.data.checkImg] : '';

							return console.log(this.form, '111')
						}
					}
				})
			},
			getToday() {
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				this.today = year+'-'+month+'-'+'day'
			},
			getToken(){
				console.log(111)
				let res = GetQueryValue('code');
				uni.request({
					url: 'https://testxfdm.daizhangfang.net/wechat/getToken?code=' + res,
					success:(res)=>{
						if(res.data.data) {
							uni.setStorageSync('h5token',res.data.data)
							this.getDistrict()
							this.jurisdiction()
						} else {
							uni.showToast({
								title: '授权失败,请重新进入页面',
								icon: 'none'
							})
						}
					},
					
				})
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onShow() {
			if(!uni.getStorageSync('h5token')) {
				this.getToken()
			} else {
				this.getDistrict()
				this.jurisdiction()
			}
		},
		created() {
			if (this.id) {
				this.getInfo()
			}
		},
		onLoad(options) {
			console.log(options, 'options')
			if (options.id) {
				this.id = options.id;
			}
		}
	}
</script>

<style lang="scss">
	#SellGoods {
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

			// .Good_box {
			// 	width: 100%;
			// 	.Con_box {
			// 		display: flex;
			// 		justify-content: space-between;
			// 		width: 100%;
			// 		>view {
			// 			flex: 1;
			// 			text-align: right;
			// 		}
			// 	}
			// }
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

				>view.star:after {
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
		.popAll {
			box-sizing: border-box;
			padding: 32rpx;
			max-height: 100%;

			.search {
				height: 60rpx;
				line-height: 60rpx;
			}

			.popList {
				height: 80rpx;
				line-height: 80rpx;
				border-bottom: 1rpx solid #EDEDED;
			}
		}
	}
</style>
