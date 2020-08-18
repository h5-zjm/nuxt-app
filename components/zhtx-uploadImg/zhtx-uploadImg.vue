<template>
	<view class="compress"">
		<view class=" zhtx-imgs">
		<view class="zhtx-single" v-for="(item, index) in list" :key="index">
			<image :src="item" :data-src="item" mode="scaleToFill" @tap="previewImg" />
			<view class="zhtx-del" @tap="deleteItem(index)">x</view>
		</view>
		<view v-if="limit>list.length" class="zhtx-single zhtx-addNew" @tap="chooseFile">
			<text class="zhtx-add">+</text>
		</view>
	</view>
	<!-- <view class="num">
			<text style="color: #007AFF;font-size: 14px;">{{list.length}}</text>

			/{{limit}}
		</view> -->

	<!-- <button type="default" @click="onSinngle">单张压缩</button>
	<image class="image" :src="single" mode="aspectFill"></image>

	<button type="default" @click="onMulti">多张压缩</button>
	<block v-for="(item, idx) in multi" :key="idx">
		<image class="image" :src="item" mode="aspectFill"></image>
	</block> -->
	
	<w-compress ref='wCompress' />
	</view>
</template>

<script>
	import WCompress from '@/components/w-compress/w-compress.vue'
	let toast = msg => {
		uni.showToast({
			title: msg,
			icon: 'none'
		});
	}

	export default {
		components: {
			WCompress
		},
		props: {
			uImgList: {
				type: Array, //附件列表
				default () {
					return {}
				}
			},
			uploadFileUrl: {
				type: String,
				dafault: '#' // 上传文件的服务器url
			},
			header: {
				type: Object, //上传图片到服务器时，HTTP 请求 Header
				default () {
					return {}
				}
			},
			limit: {
				type: Number, //限制可上传的图片数量
				default: 9 //这里有问题???
			},
			fileKeyName: {
				type: String,
				default: 'file' //用于在服务端通过自定义key值获取该文件数据
			},
			canUploadFile: { //是否更新
				type: Boolean,
				default: true
			}
		},
		computed: {
			list: {
				get() {
					return this.uImgList
				}
			}
		},
		data() {
			return {
				imageList: [],
				image: '',
				multi: [],
				single: ''
			};
		},
		methods: {
			//预览
			previewImg(e) {
				console.log(this.list, 'list')
				console.log(...this.list);
				uni.previewImage({
					current: e.target.dataset.src,
					loop: true,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: (data) => {
							//可以自定义分享操作
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					},
					urls: this.list //this.imageList,保持删除了的不在
				});
				console.log(this.list, '111')
				console.log(this.imageList, '222')
			},
			//删除
			deleteItem(index) {
				uni.showModal({
					title: '提示',
					content: '确定要删除此项吗？',
					success: res => {
						if (res.confirm) {
							this.imageList.splice(index, 1)
							this.list.splice(index, 1); //已经达到了数据更新的状态
							// this.$forceUpdate(); //强制更新
							this.$emit('update:uImgList', this.list); //类似双向数据绑定
							this.$emit('uploadSuccess', {
								res: res,
								name: this.fileKeyName
							});
						}
					}
				});
			},

			chooseFile() {
				//双重保证
				// console.log(this.list);
				if (this.list.length >= this.limit) {
					// toast('已达到最大上传数量')
					return;
				}

				let canUploadFile = this.canUploadFile;
				console.log(canUploadFile, 'canUploadFile')
				let tempFiles;
				if (canUploadFile) {

					uni.chooseImage({
						count: this.limit - this.list.length,
						sizeType: ['original', 'compressed'],
						sourceType: ['album', '	'],
						success: (res) => {
							console.log(res, 'res');
							tempFiles = res.tempFilePaths;

							this.imageList = this.imageList.concat(tempFiles)

							// if (res.tempFiles) {
							// 	if (res.tempFiles[0].size > 1000000) {
							// 		uni.showModal({
							// 			content: '图片太大,请重新选择图片上传',
							// 			showCancel: false,
							// 		});
							// 		return false;
							// 	}
							// }
							// this.urlTobase64(res.tempFilePaths[0]);
							this.$refs.wCompress.start(res.tempFilePaths[0], {
									pixels: 4000000, // 最大分辨率，默认二百万
									quality: 0.8, // 压缩质量，默认0.8
									type: 'jpg', // 图片类型，默认jpg
									base64: true, // 是否返回base64，默认false，非H5有效
								})
								.then(res => {
									console.log(res,'333')
									this.single = res
									uni.hideLoading()
									this.uploadImg(res)
								})
								.catch(e => {
									console.log(e)
									uni.hideLoading()
								})
							// this.upload();
							this.list.push(...tempFiles) //如果图片一次性就超过这个值怎么使他赋的值回退

							// #ifdef H5
							// if (this.list.length >= this.limit) {
							// 	this.list.splice(this.limit)
							// 	toast('已达到最大上传数量')
							// 	return; 
							// }
							// this.image = res.tempFilePaths[0];
							// this.image = this.compress()


							// #endif


							this.$emit('update:uImgList', this.list); //类似双向数据绑定,更新数据, 使用.sync修饰
							this.$forceUpdate();
							console.log(this.list);
						},
						fail: err => {
							console.log(err);
						}
					});

				}
			},
			urlTobase64(url) {
				uni.request({
					url: url,
					method: 'GET',
					responseType: 'arraybuffer',
					success: res => {
						let base64 = wx.arrayBufferToBase64(res.data); //把arraybuffer转成base64
						base64 = 'data:image/jpeg;base64,' + base64; //不加上这串字符，在页面无法显示
						this.uploadImg(base64)
					}
				});
			},
			uploadImg(base64) {
				console.log(base64, '我进来了')
				var formData = new FormData();
				formData.append("base64", base64);
				console.log(formData, 'formData')
				uni.request({
					url: this.uploadFileUrl,
					method: 'POST',
					data: {
						base64: base64
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						this.$emit('uploadSuccess', {
							res: res,
							name: this.fileKeyName
						});
					}
				})
			},
			onSinngle() {
				uni.chooseImage({
					count: 1,
					success: res => {
						uni.showLoading({
							title: '图片压缩中...',
							mask: true
						})
						this.$refs.wCompress.start(res.tempFilePaths[0], {
								pixels: 4000000, // 最大分辨率，默认二百万
								quality: 0.9, // 压缩质量，默认0.8
								type: 'png', // 图片类型，默认jpg
								base64: true, // 是否返回base64，默认false，非H5有效
							})
							.then(res => {
								console.log(res,'333')
								this.single = res
								uni.hideLoading()
							})
							.catch(e => {
								console.log(e)
								uni.hideLoading()
							})
					}
				})
			},

			onMulti() {
				uni.chooseImage({
					count: 9,
					success: res => {
						uni.showLoading({
							title: '图片压缩中...',
							mask: true
						})
						this.$refs.wCompress.start(res.tempFilePaths)
							.then(res => {
								console.log(res)
								this.multi = res
								uni.hideLoading()
							})
							.catch(e => {
								console.log(e)
								uni.hideLoading()
							})
					}
				})
			},
			upload(base64) {
				let files = [];
				uni.showLoading({
					title: '上传中...',
					mask: false
				});
				//这里改成异步上传会不会更好(对于跨端请求,只能重复调用api)
				console.log('我进来了')
				console.log(this.list.length, 'list')
				for (let i = 0; i < 1; i++) {
					let path = this.list[i]
					let index = i.toString()
					let files = {
						name: index,
						uri: path
					}
					// var formData = new FormData();
					// formData.append("base64",base64);
					uni.uploadFile({
						url: this.uploadFileUrl,
						// name: this.fileKeyName,
						filePath: path, // 使用files上传数组列表,上面两者都会失效
						// files:[ //使用files仅支持app与H5
						// 	{name:index,uri:path}
						// ],
						file: [ //使用files仅支持app与H5
							{
								base64: base64
							}
						],
						success: res => {
							uni.hideLoading()
							console.log(res);
							this.$emit('uploadSuccess', {
								res: res,
								name: this.fileKeyName
							});
							if (res.statusCode == 200) {
								//上传成功将原信息,直接删除,
								this.list.splice(i, 1)
								console.log(this.list);
								console.log(res);
								this.$forceUpdate();
							} else {
								uni.hideLoading()
								toast('上传失败,请稍后重试')
							}
						},
						fail: err => {
							uni.hideLoading()
							toast(err.errMsg)
							console.log(err);
						}
					})

				}

			},

		},
		onShow() {
			console.log(this.refreshAsync, 'this.refreshAsync')
		}
	};
</script>

<style>
	.zhtx-imgs {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
	}

	.zhtx-del {
		position: absolute;
		width: 35rpx;
		height: 35rpx;
		background: #f56c6c;
		color: #fff;
		top: 0;
		text-align: center;
		right: 0;
		line-height: 28rpx;
		font-size: 30rpx;
		z-index: 100;
	}

	.zhtx-single {
		position: relative;
		width: 180rpx;
		height: 180rpx;
		border: 1px solid #ccc;
		margin: 10rpx;
	}

	.zhtx-addNew {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	text {
		font-size: 50rpx;
		color: #999;
	}

	image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.num {
		float: right;
		color: #ccc;
		font-size: 12px;
	}

	.num::after {
		clear: both;
	}
</style>
