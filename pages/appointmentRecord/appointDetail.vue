<template>
	<view class="appoint-detail">
		<view class="appoint-head" :class="{'no-entry':info.status==1,'in':info.status==2,'out':info.status==3}">
			状态：{{info.status_cn}}
		</view>
	
		<view class="appoint-content">
			<view>
				姓名：{{info.account_name}}
			</view>
			<view>
				身份证号：{{info.account_name}}
			</view>
			<view>
				预约进门时间：{{info.subscribe_time}}
			</view>
			<view>
				交易区：{{info.trade_sector}}
			</view>
		</view>
		<view class="appoint-content">
			<view>
				货品品类：{{info.item_variety}}
			</view>
			<view>
				产地：{{info.item_source==1?'国产':'进口'}}
			</view>
			<view>
				具体产地：{{info.item_place}}
			</view>
			<view>
				数量：{{info.item_num}}吨
			</view>
			<view>
				车型：{{info.car_type}}
			</view>
			<view>
				车牌号：{{info.car_num}}
			</view>
			<view class="appoint-img">
				<view>
					<view>
						货物照片
					</view>
					
						<image :src="info.item_img" mode=""></image>
				</view>
				<view>
					<view>
						检测证明
					</view>
					<image :src="info.check_img" mode=""></image>
				</view>
			</view>
			<view class="appoint-tip">
				<u-button @click="showPopUp" type="success" class="mb20">修改预约</u-button>
				<u-button @click="cancelApponint" type="error">取消预约</u-button>
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
					
				}//url上面的数据
			};
		},
		onLoad(option) {
			this.info.id=option.info.id
			
			
		},
		created(){
			// this.getData()
		},
		methods:{
			cancelAction(){
				uni.request({
					url: 'http://39.107.95.50:80/h5/carSubscribe/update',
					method: 'post',
					data: {
						id: this.info.id,
						status:3
					},
					success: (res) => {
							uni.navigateTo({
								url: 'pages/appointmentRecord/cancelSuccess'
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
			getData(){
				// 获取页面数据
				uni.request({
					url: 'http://39.107.95.50:80/h5/carSubscribe/getById/'+115,
					method: 'GET',
					data: {
						
					},
					success: (res) => {
						this.info=res.data.data
						if(this.info.status==1){
							this.info.status_cn='未进场'
						}else if(this.info.status==2){
							this.info.status_cn='已进场'
						}else if(this.info.status==3){
							this.info.status_cn='已作废'
						}
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
