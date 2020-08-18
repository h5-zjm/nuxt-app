<template>
	<view class="appoint-detail">
		<view class="appoint-head" :class="{'no-entry':info.status==1,'in':info.status==2,'out':info.status==3}">
			状态：{{info.status_cn}}
		</view>
	
		<view class="appoint-content">
			<view>
				姓名：{{info.accountName}}
			</view>
			<view>
				身份证号：{{info.cardNo}}
			</view>
			<view>
				预约进门时间：{{info.subscribeTime}}
			</view>
			<view>
				交易区：{{info.tradeSector}}
			</view>
		</view>
		<view class="appoint-content">
			<view>
				货品品类：{{info.itemVariety}}
			</view>
			<view>
				产地：{{info.itemSource==1?'国产':'进口'}}
			</view>
			<view>
				具体产地：{{info.itemPlace}}
			</view>
			<view>
				数量：{{info.itemNum}}千克
			</view>
			<view>
				车型：{{info.carType}}
			</view>
			<view>
				车牌号：{{info.carNum}}
			</view>
			<view class="appoint-img">
				<view>
					<view>
						货物照片
					</view>
					
						<image :src="info.itemImg" mode=""></image>
				</view>
				<view>
					<view>
						检测证明
					</view>
					<image :src="info.checkImg" mode=""></image>
				</view>
			</view>
			<view class="appoint-tip">
				<u-button @click="showPopUp" type="success" class="mb20" v-if="ActiveStutas === 1">修改预约</u-button>
				<u-button @click="cancelApponint" type="error" v-if="ActiveStutas === 1">取消预约</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					id:'',
					status:1,
					account_name:'',
					subscribe_time:'',
					item_variety:'',
					trade_sector:'',
					item_source:'',
					item_place:'',
					item_num:'',
					car_type:'',
					car_num:'',
					item_img:'',
					check_img:''
				},//url上面的数据
				ActiveStutas: null
			};
		},
		onLoad(option) {
			this.id=option.id
			
			
		},
		created(){
			this.getData()
		},
		methods:{
			cancelAction(){
				this.uniRequest({
					url: 'carSubscribe/update',
					method: 'post',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						id: this.id,
						status:3,
						info:'',
					},
					success: (res) => {
							uni.navigateTo({
								url: '/pages/appointmentRecord/cancelSuccess'
							})
					},
					
				})
			},
			//拒绝预约
			cancelApponint(){
				let that=this
				uni.showModal({
				    content: '确认删除预约？',
				    success: function (res) {
				        if (res.confirm) {
				            that.cancelAction()
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				
			},
			showPopUp() {
				console.log('跳转')
				uni.navigateTo({
					url: '/pages/SellGoods/index?modelId=0&id='+this.id
				});
			},
			getData(){
				console.log('id是多少',this.id)
				let id = this.id
				// 获取页面数据
				this.uniRequest({
					url: 'carSubscribe/getById'+'/' + id,
					method: 'GET',
					data: {
						
					},
					success: (res) => {
						console.log('返回数据',res)
						this.info=res.data
						if(this.info.status==1){
							this.info.status_cn='未进场'
						}else if(this.info.status==2){
							this.info.status_cn='已进场'
						}else if(this.info.status==3){
							this.info.status_cn='已作废'
						}
						
						this.ActiveStutas = Number(this.info.status);
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.appoint-detail{
		font-size: 14px;
		.appoint-head{
			padding: 15rpx;
			&.no-entry{
				color:#FF8F0A;
			}
			&.in{
				color:#0AC40E;
			}
			&.out{
				color:#F50000;
			}
		}
		.appoint-content{
			background-color: #fff;
			padding:0 15rpx;
			margin-bottom: 20rpx;
			view{
				padding:12rpx 0;
				border-bottom: 1rpx solid #EDEDED;
				&:last-child{
					border-bottom: none;
					}
			}
		}
		.appoint-img{
			display: grid;
			grid-gap: 20rpx;
			grid-template-columns: 1fr 1fr;
			border: none;
			view{
				border: none;
				image{
					width:140rpx;
					height:140rpx;
				}
			}
		}
		.appoint-tip{
			background-color: #fff;
			.mb20{
				margin-bottom: 20rpx;
			
			}
		}
		
	}
</style>
