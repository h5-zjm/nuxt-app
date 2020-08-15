<template>
	<view class="all">
		<view class="title">
			<view class="time">
				时间
			</view>
			<view class="tradingArea">
				交易区
			</view>
			<view class="licensePlate">
				车牌
			</view>
			<view class="type">
				类型
			</view>
			<view class="status">
				状态
			</view>
		</view>
		<view class="shipment">
			<view class="sellGoods" v-for="(item,index) in list" :key='item.id'>
				<view class="time">
					{{item.subscribeTime.substring(0,9)}}
				</view>
				<view class="tradingArea">
					{{item.tradeSector}}
				</view>
				<view class="licensePlate">
					{{item.carNum}}
				</view>
				<view class="type">
					<view v-if="item.type === 1">
						卖货
					</view>
					<view v-if="item.type === 2">
						买货
					</view>
				</view>
				<view class="status">
					<view class="mode">
						<view v-if="item.status === 1">
							未进场
						</view>
						<view v-if="item.status === 2">
							已进场
						</view>
						<view v-if="item.status === 3">
							已删除
						</view>
						<view v-if="item.status === 4">
							已离场
						</view>
					</view>
					<view class="icon">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
          <view v-show="isLoadMore">  //loading加载提示处
                <uni-load-more :status="loadStatus" ></uni-load-more>
          </view>
<!-- 			<view class="sellGoods">
				<view class="time">
					2020.07.21
				</view>
				<view class="tradingArea">
					周转一区
				</view>
				<view class="licensePlate">
					京A12345
				</view>
				<view class="type">
					卖货
				</view>
				<view class="status">
					<view class="mode">
						已进场
					</view>
					<view class="icon">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			<view class="sellGoods">
				<view class="time">
					2020.07.21
				</view>
				<view class="tradingArea">
					周转一区
				</view>
				<view class="licensePlate">
					京A12345
				</view>
				<view class="type">
					卖货
				</view>
				<view class="status">
					<view class="mode">
						已作废
					</view>
					<view class="icon">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view> -->
		</view>
		<!-- 上货 -->
<!-- 		<view class="shipment loadGoods">
			<view class="sellGoods seleceted">
				<view class="time">
					2020.07.21
				</view>
				<view class="tradingArea">
					周转一区
				</view>
				<view class="licensePlate">
					京A12345
				</view>
				<view class="type">
					上货
				</view>
				<view class="status">
					<view class="mode">
						未进场
					</view>
					<view class="icon">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			<view class="sellGoods">
				<view class="time">
					2020.07.21
				</view>
				<view class="tradingArea">
					周转一区
				</view>
				<view class="licensePlate">
					京A12345
				</view>
				<view class="type">
					上货
				</view>
				<view class="status">
					<view class="mode">
						已进场
					</view>
					<view class="icon">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			<view class="sellGoods">
				<view class="time">
					2020.07.21
				</view>
				<view class="tradingArea">
					周转一区
				</view>
				<view class="licensePlate">
					京A12345
				</view>
				<view class="type">
					上货
				</view>
				<view class="status">
					<view class="mode">
						已作废
					</view>
					<view class="icon">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
                loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
                isLoadMore:false,  //是否加载中
				offset: 0,
				// list:[],
				list: [{
						"id": 6855,
						"subscribeTime": "2020-08-14 00:00:00",
						"tradeSector": "周转一区1门",
						"enterDoorNum": "周转一区1进1",
						"itemVariety": null,
						"itemSource": null,
						"itemPlace": null,
						"itemNum": null,
						"carType": "5.2米平板车",
						"carNum": "鄂A12345",
						"itemImg": null,
						"checkImg": null,
						"type": 2,
						"stratTime": "2020-08-14 15:15:12",
						"endTime": "2020-08-14 20:39:58",
						"certificateName": null,
						"certificateNum": null,
						"certificateAddress": null,
						"certificateTime": null,
						"certificatePhone": null,
						"certificateUser": null,
						"certificateCarNum": null,
						"createTime": "2020-08-14 15:15:12",
						"status": 4,
						"accountId": 55394,
						"accountName": null,
						"openId": "oiNqjwj-f4FlSkd2YfLbYye4Lb80",
						"scaleWeight": null,
						"feeCarType": null,
						"enterFee": null,
						"actualWeight": null,
						"orderItem": null,
						"enterLane": null,
						"outLane": "强农门出1",
						"outFee": 0.0,
						"enterOperUser": 138,
						"outOperUser": 715,
						"source": null,
						"mobile": "18627101440",
						"subscribeNo": null,
						"outDoorNum": "强农门",
						"enterOperName": "admin",
						"outOperName": "张小艳",
						"registProvince": null,
						"registCity": null,
						"registArea": null,
						"entryUserId": null,
						"enterCarUrl": null,
						"outCarUrl": null,
						"subscribeTimeStr": null
					},
					{
						"id": 6849,
						"subscribeTime": "2020-08-14 00:00:00",
						"tradeSector": "周转一区1门",
						"enterDoorNum": "周转一区1进1",
						"itemVariety": null,
						"itemSource": null,
						"itemPlace": null,
						"itemNum": null,
						"carType": "4.2米平板车",
						"carNum": "鄂A12345",
						"itemImg": null,
						"checkImg": null,
						"type": 2,
						"stratTime": "2020-08-14 15:10:20",
						"endTime": null,
						"certificateName": null,
						"certificateNum": null,
						"certificateAddress": null,
						"certificateTime": null,
						"certificatePhone": null,
						"certificateUser": null,
						"certificateCarNum": null,
						"createTime": "2020-08-14 15:10:20",
						"status": 2,
						"accountId": 55394,
						"accountName": null,
						"openId": "oiNqjwj-f4FlSkd2YfLbYye4Lb80",
						"scaleWeight": null,
						"feeCarType": null,
						"enterFee": null,
						"actualWeight": null,
						"orderItem": null,
						"enterLane": null,
						"outLane": null,
						"outFee": null,
						"enterOperUser": 138,
						"outOperUser": null,
						"source": null,
						"mobile": "18627101440",
						"subscribeNo": null,
						"outDoorNum": null,
						"enterOperName": "admin",
						"outOperName": null,
						"registProvince": null,
						"registCity": null,
						"registArea": null,
						"entryUserId": null,
						"enterCarUrl": null,
						"outCarUrl": null,
						"subscribeTimeStr": null
					},
					{
						"id": 6696,
						"subscribeTime": "2020-08-14 00:00:00",
						"tradeSector": "周转一区1门",
						"enterDoorNum": "周转一区1进1",
						"itemVariety": null,
						"itemSource": null,
						"itemPlace": null,
						"itemNum": null,
						"carType": "5.8米平板车",
						"carNum": "鄂A12345",
						"itemImg": null,
						"checkImg": null,
						"type": 2,
						"stratTime": "2020-08-14 12:22:59",
						"endTime": null,
						"certificateName": null,
						"certificateNum": null,
						"certificateAddress": null,
						"certificateTime": null,
						"certificatePhone": null,
						"certificateUser": null,
						"certificateCarNum": null,
						"createTime": "2020-08-14 12:22:59",
						"status": 2,
						"accountId": 55394,
						"accountName": null,
						"openId": "oiNqjwj-f4FlSkd2YfLbYye4Lb80",
						"scaleWeight": null,
						"feeCarType": null,
						"enterFee": null,
						"actualWeight": null,
						"orderItem": null,
						"enterLane": null,
						"outLane": null,
						"outFee": null,
						"enterOperUser": 138,
						"outOperUser": null,
						"source": null,
						"mobile": "18627101440",
						"subscribeNo": null,
						"outDoorNum": null,
						"enterOperName": "admin",
						"outOperName": null,
						"registProvince": null,
						"registCity": null,
						"registArea": null,
						"entryUserId": null,
						"enterCarUrl": null,
						"outCarUrl": null,
						"subscribeTimeStr": null
					},
					{
						"id": 6693,
						"subscribeTime": "2020-08-14 00:00:00",
						"tradeSector": "周转一区1门",
						"enterDoorNum": "周转一区1进1",
						"itemVariety": null,
						"itemSource": null,
						"itemPlace": null,
						"itemNum": null,
						"carType": "4米平板车",
						"carNum": "鄂A12345",
						"itemImg": null,
						"checkImg": null,
						"type": 2,
						"stratTime": "2020-08-14 12:22:12",
						"endTime": null,
						"certificateName": null,
						"certificateNum": null,
						"certificateAddress": null,
						"certificateTime": null,
						"certificatePhone": null,
						"certificateUser": null,
						"certificateCarNum": null,
						"createTime": "2020-08-14 12:22:12",
						"status": 2,
						"accountId": 55394,
						"accountName": null,
						"openId": "oiNqjwj-f4FlSkd2YfLbYye4Lb80",
						"scaleWeight": null,
						"feeCarType": null,
						"enterFee": null,
						"actualWeight": null,
						"orderItem": null,
						"enterLane": null,
						"outLane": null,
						"outFee": null,
						"enterOperUser": 138,
						"outOperUser": null,
						"source": null,
						"mobile": "18627101440",
						"subscribeNo": null,
						"outDoorNum": null,
						"enterOperName": "admin",
						"outOperName": null,
						"registProvince": null,
						"registCity": null,
						"registArea": null,
						"entryUserId": null,
						"enterCarUrl": null,
						"outCarUrl": null,
						"subscribeTimeStr": null
					},
					{
						"id": 6587,
						"subscribeTime": "2020-08-14 00:00:00",
						"tradeSector": "周转一区1门",
						"enterDoorNum": "周转一区1进1",
						"itemVariety": null,
						"itemSource": null,
						"itemPlace": null,
						"itemNum": null,
						"carType": "4.2米高栏车",
						"carNum": "鄂A12345",
						"itemImg": null,
						"checkImg": null,
						"type": 2,
						"stratTime": "2020-08-14 10:39:21",
						"endTime": null,
						"certificateName": null,
						"certificateNum": null,
						"certificateAddress": null,
						"certificateTime": null,
						"certificatePhone": null,
						"certificateUser": null,
						"certificateCarNum": null,
						"createTime": "2020-08-14 10:39:21",
						"status": 2,
						"accountId": 55394,
						"accountName": null,
						"openId": "oiNqjwj-f4FlSkd2YfLbYye4Lb80",
						"scaleWeight": null,
						"feeCarType": null,
						"enterFee": null,
						"actualWeight": null,
						"orderItem": null,
						"enterLane": null,
						"outLane": null,
						"outFee": null,
						"enterOperUser": 138,
						"outOperUser": null,
						"source": null,
						"mobile": "18627101440",
						"subscribeNo": null,
						"outDoorNum": null,
						"enterOperName": "admin",
						"outOperName": null,
						"registProvince": null,
						"registCity": null,
						"registArea": null,
						"entryUserId": null,
						"enterCarUrl": null,
						"outCarUrl": null,
						"subscribeTimeStr": null
					},
					{
						"id": 6579,
						"subscribeTime": "2020-08-14 00:00:00",
						"tradeSector": "周转一区1门",
						"enterDoorNum": "周转一区1进1",
						"itemVariety": null,
						"itemSource": null,
						"itemPlace": null,
						"itemNum": null,
						"carType": "",
						"carNum": "鄂A12345",
						"itemImg": null,
						"checkImg": null,
						"type": 2,
						"stratTime": "2020-08-14 10:30:29",
						"endTime": "2020-08-14 22:46:23",
						"certificateName": null,
						"certificateNum": null,
						"certificateAddress": null,
						"certificateTime": null,
						"certificatePhone": null,
						"certificateUser": null,
						"certificateCarNum": null,
						"createTime": "2020-08-14 10:30:29",
						"status": 4,
						"accountId": 55394,
						"accountName": null,
						"openId": "oiNqjwj-f4FlSkd2YfLbYye4Lb80",
						"scaleWeight": null,
						"feeCarType": null,
						"enterFee": null,
						"actualWeight": null,
						"orderItem": null,
						"enterLane": null,
						"outLane": "强农门出2",
						"outFee": null,
						"enterOperUser": 138,
						"outOperUser": 715,
						"source": null,
						"mobile": "18627101440",
						"subscribeNo": null,
						"outDoorNum": "强农门",
						"enterOperName": "admin",
						"outOperName": "张小艳",
						"registProvince": null,
						"registCity": null,
						"registArea": null,
						"entryUserId": null,
						"enterCarUrl": null,
						"outCarUrl": null,
						"subscribeTimeStr": null
					},
					{
						"id": 6573,
						"subscribeTime": "2020-08-14 00:00:00",
						"tradeSector": "周转一区1门",
						"enterDoorNum": "周转一区1进1",
						"itemVariety": null,
						"itemSource": null,
						"itemPlace": null,
						"itemNum": null,
						"carType": "16米平板车",
						"carNum": "鄂A12345",
						"itemImg": null,
						"checkImg": null,
						"type": 2,
						"stratTime": "2020-08-14 10:24:12",
						"endTime": null,
						"certificateName": null,
						"certificateNum": null,
						"certificateAddress": null,
						"certificateTime": null,
						"certificatePhone": null,
						"certificateUser": null,
						"certificateCarNum": null,
						"createTime": "2020-08-14 10:24:12",
						"status": 2,
						"accountId": 55394,
						"accountName": null,
						"openId": "oiNqjwj-f4FlSkd2YfLbYye4Lb80",
						"scaleWeight": null,
						"feeCarType": null,
						"enterFee": null,
						"actualWeight": null,
						"orderItem": null,
						"enterLane": null,
						"outLane": null,
						"outFee": null,
						"enterOperUser": 138,
						"outOperUser": null,
						"source": null,
						"mobile": "18627101440",
						"subscribeNo": null,
						"outDoorNum": null,
						"enterOperName": "admin",
						"outOperName": null,
						"registProvince": null,
						"registCity": null,
						"registArea": null,
						"entryUserId": null,
						"enterCarUrl": null,
						"outCarUrl": null,
						"subscribeTimeStr": null
					},
					{
						"id": 6523,
						"subscribeTime": "2020-08-14 00:00:00",
						"tradeSector": "强农门",
						"enterDoorNum": "强农门进1",
						"itemVariety": null,
						"itemSource": null,
						"itemPlace": null,
						"itemNum": null,
						"carType": "13米半挂车",
						"carNum": "鄂A12345",
						"itemImg": null,
						"checkImg": null,
						"type": 2,
						"stratTime": "2020-08-14 09:39:47",
						"endTime": null,
						"certificateName": null,
						"certificateNum": null,
						"certificateAddress": null,
						"certificateTime": null,
						"certificatePhone": null,
						"certificateUser": null,
						"certificateCarNum": null,
						"createTime": "2020-08-14 09:39:47",
						"status": 2,
						"accountId": 55394,
						"accountName": null,
						"openId": "oiNqjwj-f4FlSkd2YfLbYye4Lb80",
						"scaleWeight": null,
						"feeCarType": null,
						"enterFee": null,
						"actualWeight": null,
						"orderItem": null,
						"enterLane": null,
						"outLane": null,
						"outFee": null,
						"enterOperUser": 138,
						"outOperUser": null,
						"source": null,
						"mobile": "18627101440",
						"subscribeNo": null,
						"outDoorNum": null,
						"enterOperName": "admin",
						"outOperName": null,
						"registProvince": null,
						"registCity": null,
						"registArea": null,
						"entryUserId": null,
						"enterCarUrl": null,
						"outCarUrl": null,
						"subscribeTimeStr": null
					},
					{
						"id": 6517,
						"subscribeTime": "2020-08-14 00:00:00",
						"tradeSector": "强农门",
						"enterDoorNum": "强农门进1",
						"itemVariety": null,
						"itemSource": null,
						"itemPlace": null,
						"itemNum": null,
						"carType": "4.2米高栏车",
						"carNum": "鄂A12345",
						"itemImg": null,
						"checkImg": null,
						"type": 2,
						"stratTime": "2020-08-14 09:37:52",
						"endTime": null,
						"certificateName": null,
						"certificateNum": null,
						"certificateAddress": null,
						"certificateTime": null,
						"certificatePhone": null,
						"certificateUser": null,
						"certificateCarNum": null,
						"createTime": "2020-08-14 09:37:52",
						"status": 2,
						"accountId": 55394,
						"accountName": null,
						"openId": "oiNqjwj-f4FlSkd2YfLbYye4Lb80",
						"scaleWeight": null,
						"feeCarType": null,
						"enterFee": null,
						"actualWeight": null,
						"orderItem": null,
						"enterLane": null,
						"outLane": null,
						"outFee": null,
						"enterOperUser": 138,
						"outOperUser": null,
						"source": null,
						"mobile": "18627101440",
						"subscribeNo": null,
						"outDoorNum": null,
						"enterOperName": "admin",
						"outOperName": null,
						"registProvince": null,
						"registCity": null,
						"registArea": null,
						"entryUserId": null,
						"enterCarUrl": null,
						"outCarUrl": null,
						"subscribeTimeStr": null
					},
					{
						"id": 5990,
						"subscribeTime": "2020-08-13 00:00:00",
						"tradeSector": "大农门",
						"enterDoorNum": "大农门进1",
						"itemVariety": null,
						"itemSource": null,
						"itemPlace": null,
						"itemNum": null,
						"carType": "5.2米平板车",
						"carNum": "鄂A12345",
						"itemImg": null,
						"checkImg": null,
						"type": 2,
						"stratTime": "2020-08-13 20:20:10",
						"endTime": null,
						"certificateName": null,
						"certificateNum": null,
						"certificateAddress": null,
						"certificateTime": null,
						"certificatePhone": null,
						"certificateUser": null,
						"certificateCarNum": null,
						"createTime": "2020-08-13 20:20:10",
						"status": 2,
						"accountId": 55394,
						"accountName": null,
						"openId": "oiNqjwj-f4FlSkd2YfLbYye4Lb80",
						"scaleWeight": null,
						"feeCarType": null,
						"enterFee": null,
						"actualWeight": null,
						"orderItem": null,
						"enterLane": null,
						"outLane": null,
						"outFee": null,
						"enterOperUser": 138,
						"outOperUser": null,
						"source": null,
						"mobile": "18627101440",
						"subscribeNo": null,
						"outDoorNum": null,
						"enterOperName": "admin",
						"outOperName": null,
						"registProvince": null,
						"registCity": null,
						"registArea": null,
						"entryUserId": null,
						"enterCarUrl": null,
						"outCarUrl": null,
						"subscribeTimeStr": null
					},
					{
						"id": 5988,
						"subscribeTime": "2020-08-13 00:00:00",
						"tradeSector": "周转一区1门",
						"enterDoorNum": "周转一区1进1",
						"itemVariety": null,
						"itemSource": null,
						"itemPlace": null,
						"itemNum": null,
						"carType": "4.2米高栏车",
						"carNum": "鄂A12345",
						"itemImg": null,
						"checkImg": null,
						"type": 2,
						"stratTime": "2020-08-13 20:19:35",
						"endTime": null,
						"certificateName": null,
						"certificateNum": null,
						"certificateAddress": null,
						"certificateTime": null,
						"certificatePhone": null,
						"certificateUser": null,
						"certificateCarNum": null,
						"createTime": "2020-08-13 20:19:35",
						"status": 2,
						"accountId": 55394,
						"accountName": null,
						"openId": "oiNqjwj-f4FlSkd2YfLbYye4Lb80",
						"scaleWeight": null,
						"feeCarType": null,
						"enterFee": null,
						"actualWeight": null,
						"orderItem": null,
						"enterLane": null,
						"outLane": null,
						"outFee": null,
						"enterOperUser": 138,
						"outOperUser": null,
						"source": null,
						"mobile": "18627101440",
						"subscribeNo": null,
						"outDoorNum": null,
						"enterOperName": "admin",
						"outOperName": null,
						"registProvince": null,
						"registCity": null,
						"registArea": null,
						"entryUserId": null,
						"enterCarUrl": null,
						"outCarUrl": null,
						"subscribeTimeStr": null
					},
					{
						"id": 5435,
						"subscribeTime": "2020-08-13 00:00:00",
						"tradeSector": "周转一区1门",
						"enterDoorNum": "周转一区1进1",
						"itemVariety": null,
						"itemSource": null,
						"itemPlace": null,
						"itemNum": null,
						"carType": "4.2米厢式货车",
						"carNum": "鄂A12345",
						"itemImg": null,
						"checkImg": null,
						"type": 2,
						"stratTime": "2020-08-13 10:46:35",
						"endTime": null,
						"certificateName": null,
						"certificateNum": null,
						"certificateAddress": null,
						"certificateTime": null,
						"certificatePhone": null,
						"certificateUser": null,
						"certificateCarNum": null,
						"createTime": "2020-08-13 10:46:35",
						"status": 2,
						"accountId": 55394,
						"accountName": null,
						"openId": "oiNqjwj-f4FlSkd2YfLbYye4Lb80",
						"scaleWeight": null,
						"feeCarType": null,
						"enterFee": null,
						"actualWeight": null,
						"orderItem": null,
						"enterLane": null,
						"outLane": null,
						"outFee": null,
						"enterOperUser": 138,
						"outOperUser": null,
						"source": null,
						"mobile": "18627101440",
						"subscribeNo": null,
						"outDoorNum": null,
						"enterOperName": "admin",
						"outOperName": null,
						"registProvince": null,
						"registCity": null,
						"registArea": null,
						"entryUserId": null,
						"enterCarUrl": null,
						"outCarUrl": null,
						"subscribeTimeStr": null
					},
					{
						"id": 5433,
						"subscribeTime": "2020-08-13 00:00:00",
						"tradeSector": "周转一区1门",
						"enterDoorNum": "周转一区1进1",
						"itemVariety": null,
						"itemSource": null,
						"itemPlace": null,
						"itemNum": null,
						"carType": "4.2米厢式货车",
						"carNum": "鄂A12345",
						"itemImg": null,
						"checkImg": null,
						"type": 2,
						"stratTime": "2020-08-13 10:44:10",
						"endTime": null,
						"certificateName": null,
						"certificateNum": null,
						"certificateAddress": null,
						"certificateTime": null,
						"certificatePhone": null,
						"certificateUser": null,
						"certificateCarNum": null,
						"createTime": "2020-08-13 10:44:10",
						"status": 2,
						"accountId": 55394,
						"accountName": null,
						"openId": "oiNqjwj-f4FlSkd2YfLbYye4Lb80",
						"scaleWeight": null,
						"feeCarType": null,
						"enterFee": null,
						"actualWeight": null,
						"orderItem": null,
						"enterLane": null,
						"outLane": null,
						"outFee": null,
						"enterOperUser": 138,
						"outOperUser": null,
						"source": null,
						"mobile": "18627101440",
						"subscribeNo": null,
						"outDoorNum": null,
						"enterOperName": "admin",
						"outOperName": null,
						"registProvince": null,
						"registCity": null,
						"registArea": null,
						"entryUserId": null,
						"enterCarUrl": null,
						"outCarUrl": null,
						"subscribeTimeStr": null
					},
					{
						"id": 4999,
						"subscribeTime": "2020-08-13 00:00:00",
						"tradeSector": "周转一区1门",
						"enterDoorNum": "周转一区1进1",
						"itemVariety": null,
						"itemSource": null,
						"itemPlace": null,
						"itemNum": null,
						"carType": "5.2米平板车",
						"carNum": "鄂A12345",
						"itemImg": null,
						"checkImg": null,
						"type": 2,
						"stratTime": "2020-08-13 01:36:59",
						"endTime": null,
						"certificateName": null,
						"certificateNum": null,
						"certificateAddress": null,
						"certificateTime": null,
						"certificatePhone": null,
						"certificateUser": null,
						"certificateCarNum": null,
						"createTime": "2020-08-13 01:36:59",
						"status": 2,
						"accountId": 55394,
						"accountName": null,
						"openId": "oiNqjwj-f4FlSkd2YfLbYye4Lb80",
						"scaleWeight": null,
						"feeCarType": null,
						"enterFee": null,
						"actualWeight": null,
						"orderItem": null,
						"enterLane": null,
						"outLane": null,
						"outFee": null,
						"enterOperUser": 138,
						"outOperUser": null,
						"source": null,
						"mobile": "18627101440",
						"subscribeNo": null,
						"outDoorNum": null,
						"enterOperName": "admin",
						"outOperName": null,
						"registProvince": null,
						"registCity": null,
						"registArea": null,
						"entryUserId": null,
						"enterCarUrl": null,
						"outCarUrl": null,
						"subscribeTimeStr": null
					},
					{
						"id": 4940,
						"subscribeTime": "2020-08-13 00:00:00",
						"tradeSector": "周转一区1门",
						"enterDoorNum": "周转一区1进1",
						"itemVariety": null,
						"itemSource": null,
						"itemPlace": null,
						"itemNum": null,
						"carType": "16米平板车",
						"carNum": "鄂A12345",
						"itemImg": null,
						"checkImg": null,
						"type": 2,
						"stratTime": "2020-08-13 00:04:33",
						"endTime": null,
						"certificateName": null,
						"certificateNum": null,
						"certificateAddress": null,
						"certificateTime": null,
						"certificatePhone": null,
						"certificateUser": null,
						"certificateCarNum": null,
						"createTime": "2020-08-13 00:04:33",
						"status": 2,
						"accountId": 55394,
						"accountName": null,
						"openId": "oiNqjwj-f4FlSkd2YfLbYye4Lb80",
						"scaleWeight": null,
						"feeCarType": null,
						"enterFee": null,
						"actualWeight": null,
						"orderItem": null,
						"enterLane": null,
						"outLane": null,
						"outFee": null,
						"enterOperUser": 138,
						"outOperUser": null,
						"source": null,
						"mobile": "18627101440",
						"subscribeNo": null,
						"outDoorNum": null,
						"enterOperName": "admin",
						"outOperName": null,
						"registProvince": null,
						"registCity": null,
						"registArea": null,
						"entryUserId": null,
						"enterCarUrl": null,
						"outCarUrl": null,
						"subscribeTimeStr": null
					},
					{
						"id": 4937,
						"subscribeTime": "2020-08-13 00:00:00",
						"tradeSector": "周转一区1门",
						"enterDoorNum": "周转一区1进1",
						"itemVariety": null,
						"itemSource": null,
						"itemPlace": null,
						"itemNum": null,
						"carType": "16米平板车",
						"carNum": "鄂A12345",
						"itemImg": null,
						"checkImg": null,
						"type": 2,
						"stratTime": "2020-08-13 00:01:33",
						"endTime": null,
						"certificateName": null,
						"certificateNum": null,
						"certificateAddress": null,
						"certificateTime": null,
						"certificatePhone": null,
						"certificateUser": null,
						"certificateCarNum": null,
						"createTime": "2020-08-13 00:01:33",
						"status": 2,
						"accountId": 55394,
						"accountName": null,
						"openId": "oiNqjwj-f4FlSkd2YfLbYye4Lb80",
						"scaleWeight": null,
						"feeCarType": null,
						"enterFee": null,
						"actualWeight": null,
						"orderItem": null,
						"enterLane": null,
						"outLane": null,
						"outFee": null,
						"enterOperUser": 138,
						"outOperUser": null,
						"source": null,
						"mobile": "18627101440",
						"subscribeNo": null,
						"outDoorNum": null,
						"enterOperName": "admin",
						"outOperName": null,
						"registProvince": null,
						"registCity": null,
						"registArea": null,
						"entryUserId": null,
						"enterCarUrl": null,
						"outCarUrl": null,
						"subscribeTimeStr": null
					},
					{
						"id": 4933,
						"subscribeTime": "2020-08-12 00:00:00",
						"tradeSector": "周转一区1门",
						"enterDoorNum": "周转一区1进1",
						"itemVariety": null,
						"itemSource": null,
						"itemPlace": null,
						"itemNum": null,
						"carType": "17.5米平板车",
						"carNum": "鄂A12345",
						"itemImg": null,
						"checkImg": null,
						"type": 2,
						"stratTime": "2020-08-12 23:58:15",
						"endTime": "2020-08-13 08:58:01",
						"certificateName": null,
						"certificateNum": null,
						"certificateAddress": null,
						"certificateTime": null,
						"certificatePhone": null,
						"certificateUser": null,
						"certificateCarNum": null,
						"createTime": "2020-08-12 23:58:15",
						"status": 4,
						"accountId": 55394,
						"accountName": null,
						"openId": "oiNqjwj-f4FlSkd2YfLbYye4Lb80",
						"scaleWeight": null,
						"feeCarType": null,
						"enterFee": null,
						"actualWeight": null,
						"orderItem": null,
						"enterLane": null,
						"outLane": "强农门出1",
						"outFee": null,
						"enterOperUser": 138,
						"outOperUser": 260,
						"source": null,
						"mobile": "18627101440",
						"subscribeNo": null,
						"outDoorNum": "强农门",
						"enterOperName": "admin",
						"outOperName": "强农门",
						"registProvince": null,
						"registCity": null,
						"registArea": null,
						"entryUserId": null,
						"enterCarUrl": null,
						"outCarUrl": null,
						"subscribeTimeStr": null
					},
					{
						"id": 4931,
						"subscribeTime": "2020-08-12 00:00:00",
						"tradeSector": "周转一区1门",
						"enterDoorNum": "周转一区1进1",
						"itemVariety": null,
						"itemSource": null,
						"itemPlace": null,
						"itemNum": null,
						"carType": "7.8米高栏车",
						"carNum": "鄂A12345",
						"itemImg": null,
						"checkImg": null,
						"type": 2,
						"stratTime": "2020-08-12 23:52:56",
						"endTime": null,
						"certificateName": null,
						"certificateNum": null,
						"certificateAddress": null,
						"certificateTime": null,
						"certificatePhone": null,
						"certificateUser": null,
						"certificateCarNum": null,
						"createTime": "2020-08-12 23:52:56",
						"status": 2,
						"accountId": 55394,
						"accountName": null,
						"openId": "oiNqjwj-f4FlSkd2YfLbYye4Lb80",
						"scaleWeight": null,
						"feeCarType": null,
						"enterFee": null,
						"actualWeight": null,
						"orderItem": null,
						"enterLane": null,
						"outLane": null,
						"outFee": null,
						"enterOperUser": 138,
						"outOperUser": null,
						"source": null,
						"mobile": "18627101440",
						"subscribeNo": null,
						"outDoorNum": null,
						"enterOperName": "admin",
						"outOperName": null,
						"registProvince": null,
						"registCity": null,
						"registArea": null,
						"entryUserId": null,
						"enterCarUrl": null,
						"outCarUrl": null,
						"subscribeTimeStr": null
					},
					{
						"id": 4930,
						"subscribeTime": "2020-08-12 00:00:00",
						"tradeSector": "富农门",
						"enterDoorNum": "富农门进1",
						"itemVariety": null,
						"itemSource": null,
						"itemPlace": null,
						"itemNum": null,
						"carType": "16米平板车",
						"carNum": "鄂A12345",
						"itemImg": null,
						"checkImg": null,
						"type": 2,
						"stratTime": "2020-08-12 23:52:23",
						"endTime": "2020-08-13 09:46:16",
						"certificateName": null,
						"certificateNum": null,
						"certificateAddress": null,
						"certificateTime": null,
						"certificatePhone": null,
						"certificateUser": null,
						"certificateCarNum": null,
						"createTime": "2020-08-12 23:52:23",
						"status": 4,
						"accountId": 55394,
						"accountName": null,
						"openId": "oiNqjwj-f4FlSkd2YfLbYye4Lb80",
						"scaleWeight": null,
						"feeCarType": null,
						"enterFee": null,
						"actualWeight": null,
						"orderItem": null,
						"enterLane": null,
						"outLane": "强农门出1",
						"outFee": null,
						"enterOperUser": 138,
						"outOperUser": 260,
						"source": null,
						"mobile": "18627101440",
						"subscribeNo": null,
						"outDoorNum": "强农门",
						"enterOperName": "admin",
						"outOperName": "强农门",
						"registProvince": null,
						"registCity": null,
						"registArea": null,
						"entryUserId": null,
						"enterCarUrl": null,
						"outCarUrl": null,
						"subscribeTimeStr": null
					},
					{
						"id": 4929,
						"subscribeTime": "2020-08-12 00:00:00",
						"tradeSector": "富农门",
						"enterDoorNum": "富农门进1",
						"itemVariety": null,
						"itemSource": null,
						"itemPlace": null,
						"itemNum": null,
						"carType": "4.2米高栏车",
						"carNum": "鄂A12345",
						"itemImg": null,
						"checkImg": null,
						"type": 2,
						"stratTime": "2020-08-12 23:51:55",
						"endTime": null,
						"certificateName": null,
						"certificateNum": null,
						"certificateAddress": null,
						"certificateTime": null,
						"certificatePhone": null,
						"certificateUser": null,
						"certificateCarNum": null,
						"createTime": "2020-08-12 23:51:55",
						"status": 2,
						"accountId": 55394,
						"accountName": null,
						"openId": "oiNqjwj-f4FlSkd2YfLbYye4Lb80",
						"scaleWeight": null,
						"feeCarType": null,
						"enterFee": null,
						"actualWeight": null,
						"orderItem": null,
						"enterLane": null,
						"outLane": null,
						"outFee": null,
						"enterOperUser": 138,
						"outOperUser": null,
						"source": null,
						"mobile": "18627101440",
						"subscribeNo": null,
						"outDoorNum": null,
						"enterOperName": "admin",
						"outOperName": null,
						"registProvince": null,
						"registCity": null,
						"registArea": null,
						"entryUserId": null,
						"enterCarUrl": null,
						"outCarUrl": null,
						"subscribeTimeStr": null
					}
				]
			}
		},
		created() {
			this.getData()
		},
		
		onReachBottom(){  //上拉触底函数
			  if(!this.isLoadMore){  //此处判断，上锁，防止重复请求
					this.isLoadMore=true
					this.offset+=10
					this.getData()
			  }
		},
		methods: {
			// 获取用户信息
			getUser() {
				
			},
			getData() {
				
				// 获取页面数据
				uni.request({
					url: 'http://192.168.100.215:18088/h5/carSubscribe/getList',
					method: 'GET',
					data: {
						offset: this.offset
					},
					success: (res) => {
						console.log('列表返回', res)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.all {
		min-height: 100vh;

		.title {
			display: flex;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #313131;
			justify-content: space-between;
			height: 80rpx;
			box-sizing: border-box;
			padding: 0 20rpx;

			>view {
				width: 20%;
				text-align: center;
				height: 80rpx;
				line-height: 80rpx;
			}
		}

		.shipment {
			padding-bottom: 46rpx;
			background-color: #fff;

			.sellGoods {
				font-size: 24rpx;
				display: flex;
				justify-content: space-between;
				height: 72rpx;
				box-sizing: border-box;
				padding: 0 20rpx;
				background-color: #fff;

				>view {
					width: 20%;
					text-align: center;
					height: 100%;
					line-height: 71rpx;
					box-sizing: border-box;
					border-bottom: 1rpx solid #ededed;
				}

				.status {
					display: flex;
					justify-content: space-around;

					.mode {
						height: 72rpx;
						line-height: 71rpx;
					}

					.icon {
						height: 72rpx;
						line-height: 71rpx;
					}
				}
			}

			.seleceted {
				color: #378EFF;
			}
		}

		.loadGoods {
			margin-top: 16rpx;
		}
	}
</style>
