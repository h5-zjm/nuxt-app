<template>
	<view class="all">
		<view class="top">
			扫码卖货
		</view>
		<view class="main">
			<view class="title">
				买家信息：王** 180****1234
			</view>
			<view class="list">
				<view class="line">
					<view class="keyLabel">
						品类：
					</view>
					<view class="valueLabel">
						<view class="valueWorth">
							<u-input v-model="value" disabled :type="type" style="height: 90rpx;line-height: 90rpx;" :border="border" @click="show = true" />
						</view>
						<view class="unit">
							清空
						</view>
					</view>
				</view>
				<view class="line">
					<view class="keyLabel">
						重量：
					</view>
					<view class="valueLabel">
						<view class="valueWorth">
							<u-input v-model="weight" :type="type" :border="border" />
						</view>
						<view class="unit">
							KG
						</view>
					</view>
				</view>
				<view class="line">
					<view class="keyLabel">
						金额：
					</view>
					<view class="valueLabel">
						<view class="valueWorth">
							<u-input v-model="amont" :type="type" :border="border" />
						</view>
						<view class="unit">
							元
						</view>
					</view>
				</view>
				<view class="line">
					<view class="keyLabel">
						产地：
					</view>
					<view class="valueLabel">
						<view class="valueWorth">
							<u-input v-model="origin" :type="type" :border="border" />
						</view>
					</view>
				</view>
				<view class="line last">
					<view class="keyLabel">
						生产经营者：
					</view>
					<view class="valueLabel">
						<view class="valueWorth">
							<u-input v-model="producer" :type="type" :border="border" />
						</view>
					</view>
				</view>
			</view>
			<view class="bottom">
				<view class="addGoods">
					<u-button type="primary" @click="showPopUp">添加商品</u-button>
				</view>
				<view class="sureAdd">
					<u-button >确认提交</u-button>
				</view>
			</view>
		</view>
		<u-select v-model="show" value-name="name" label-name="name" :list="list" @confirm="confirm"></u-select>
		<u-popup v-model="showPop" mode="center" border-radius="10">
			<view class="popAll">
				<view class="search">
					<u-search placeholder="请输入种类" v-model="keyword"></u-search>
				</view>
				<view class="popList">
					大白菜
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				value:'',
				weight:'',
				amont:'',
				origin:'',
				producer:'',
				showPop: false,
				keyword: '',
				list: [{
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
				}]
			};
		},
		methods:{
			confirm(e) {
				console.log('选中的数据',e)
				this.value = e[0].value
			},
			showPopUp() {
				this.showPop = true
			}
		}
	}
</script>

<style lang="scss">
	.all {
		width: 100%;
		min-height: 100vh;
		box-sizing: border-box;

		.top {
			width: 100%;
			height: 76rpx;
			line-height: 76rpx;
			font-size: 32rpx;
			color: #000000;
			text-align: center;
			background-color: #fff;
			border-top: 1rpx solid #EDEDED;
		}

		.main {
			width: 100%;
			float: left;
			padding: 0 20rpx;

			.title {
				width: 100%;
				box-sizing: border-box;
				padding-left: 10rpx;
				float: left;
				margin-top: 40rpx;
			}

			.list {
				width: 100%;
				float: left;
				margin-top: 20rpx;
				background-color: #fff;
				border-radius: 16rpx;
				padding: 0 20rpx;
				box-sizing: border-box;

				>view {
					width: 100%;
					height: 90rpx;
					line-height: 90rpx;
					display: flex;
					justify-content: space-between;
					.valueLabel {
						width: 280rpx;
						display: flex;
						justify-content: space-between;
						.valueWorth {
							width: 200rpx;
						}
						.unit {
							float: right;
						}
						
					}
				}
				.line {
					border-bottom: 1rpx solid #EDEDED;
				}
				.last {
					border-bottom: none;
				}
			}
			.bottom {
				width: 100%;
				float: left;
				margin-top: 28rpx;
				.addGoods {
					width: 100%;
					float: left;
				}
				.sureAdd {
					width: 100%;
					float: left;
					margin-top: 20rpx;
				}
			}
		}
		.popAll {
			box-sizing: border-box;
			padding: 32rpx;
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
