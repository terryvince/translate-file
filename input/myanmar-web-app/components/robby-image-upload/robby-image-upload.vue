<template>
	<view class="imageUploadContainer">
		<view class="imageUploadList">
			<view class="imageItem" v-bind:key="index" v-for="(path,index) in imageListData">
				<image :src="path" :class="{'dragging':isDragging(index)}" draggable="true" @tap="previewImage" :data-index="index"  @touchstart="start" @touchmove.stop.prevent="move" @touchend="stop"></image>
				<view v-if="isShowDel" class="imageDel" @tap="deleteImage" :data-index="index">x</view>
			</view>
			<view v-if="isShowAdd" class="imageUpload" @tap="selectImage">+</view>
		</view>
		<image v-if="showMoveImage" class="moveImage" :style="{left:posMoveImageLeft, top:posMoveImageTop}" :src="moveImagePath"></image>
	</view>
</template>

<script>
	export default {
		name:'robby-image-upload',
		props: ['value','enableDel','enableAdd','enableDrag','serverUrl','formData','header', 'limit','fileKeyName','showUploadProgress','serverUrlDeleteImage'],
		data() {
			return {
				imageBasePos:{
					x0: -1,
					y0: -1,
					w:-1,
					h:-1,
				},
				showMoveImage: false,
				moveImagePath: '',
				moveLeft: 0,
				moveTop: 0,
				deltaLeft: 0,
				deltaTop: 0,
				dragIndex: null,
				targetImageIndex: null,
				imageList: [],
				isDestroyed: false
			}
		}, 
		mounted: function(){
			this.imageList = this.value
			
			if(this.showUploadProgress === false){
				this.showUploadProgress = false
			}else{
				this.showUploadProgress = true
			}
		},
		destroyed: function(){
			this.isDestroyed = true
		},
		computed:{
			imageListData: function(){
				if(this.value){
					return this.value
				}
			},
			posMoveImageLeft: function(){ 
				return this.moveLeft + 'px'
			},
			posMoveImageTop: function(){
				return this.moveTop + 'px'
			},
			isShowDel: function(){
				if(this.enableDel === false){
					return false
				}else{
					return true
				}
			},
			isShowAdd: function(){
				if(this.enableAdd === false){
					return false
				}
				
				if(this.limit && this.imageList.length >= this.limit){
					return false
				}
				
				return true
			},
			isDragable: function(){
				if(this.enableDrag === false){
					return false
				}else{
					return true
				}
			}
		},
		methods:{
			selectImage: function(){
				var _self = this
				if(!_self.imageList){
					_self.imageList = []
				} 
				
				uni.chooseImage({
					count: _self.limit ? (_self.limit - _self.imageList.length) : 999,
					success: function(e){
						var imagePathArr = e.tempFilePaths
						
						//သတ်မှတ်လျှင်limitကန့်သတ်，inwebအပေါ်countမမှန်ကန်သောငြင်းခုံမှု，ဤနေရာတွင်ထိန်းချုပ်မှုရွေးချယ်စရာအရေအတွက်သည်လိုအပ်ချက်များနှင့်ကိုက်ညီမှုရှိမရှိဆုံးဖြတ်ရန်
						//WeChat မဟုတ်သောပရိုဂရမ်များတွင်，သင်တစ် ဦး ထက်ပိုရွေးချယ်နိုင်သည်ပေမယ့်，သို့သော်ရွေးချယ်ထားသည့်ရလဒ်ကိုဖြတ်တောက်ပစ်လိမ့်မည်
						//inappin，ရွေးချယ်မှုအရေအတွက်ကိုအလိုအလျှောက်ကန့်သတ်လိမ့်မည်
						if(_self.limit){
							var availableImageNumber = _self.limit - _self.imageList.length
							if(availableImageNumber < imagePathArr.length){
								uni.showToast({
									title: 'ပုံ၏စုစုပေါင်းအရေအတွက်ကန့်သတ်ထားသည်'+_self.limit+'Zhang က，သင်လည်းရွေးချယ်နိုင်သည်'+availableImageNumber+'Zhang က',
									icon:'none',
									mask: false,
									duration: 2000
								});
								return
							}
						}
						
						//ဆာဗာလိပ်စာသတ်မှတ်ထားရှိမရှိစစ်ဆေးပါ，ချိန်ညှိခြင်းဆိုသည်မှာရုပ်ပုံအားဆာဗာသို့တင်မည်ဖြစ်သည်
						if(_self.serverUrl){
							uni.showToast({
								title: 'တင်ယူမှုတိုးတက်မှု：0/' + imagePathArr.length,
								icon: 'none',
								mask: false
							});
							
							var remoteIndexStart = _self.imageList.length - imagePathArr.length
							var promiseWorkList = []
							var keyname = (_self.fileKeyName ? _self.fileKeyName : 'file')
							var completeImages = 0
							
							for(let i=0; i<imagePathArr.length;i++){
								promiseWorkList.push(new Promise((resolve, reject)=>{
									let remoteUrlIndex = remoteIndexStart + i
									uni.uploadFile({
										url:_self.serverUrl,
										fileType: 'image',
										header: _self.header,
										formData:_self.formData,
										filePath: imagePathArr[i], 
										name: keyname,
										success: function(res){
											if(res.statusCode >= 200 && res.statusCode <= 204){
												if(_self.isDestroyed){
													return
												}
												
												completeImages ++
												
												if(_self.showUploadProgress){
													uni.showToast({
														title: 'တင်ယူမှုတိုးတက်မှု：' + completeImages + '/' + imagePathArr.length,
														icon: 'none',
														mask: false,
														duration: 500
													});
												}
												console.log('success to upload image: ' + res.data)
												resolve(JSON.parse(res.data).link)
											}else{
												console.log('fail to upload image:'+res.data)
												reject('fail to upload image:' + remoteUrlIndex)
											}
										},
										fail: function(res){
											console.log('fail to upload image:'+res)
											reject('fail to upload image:' + remoteUrlIndex)
										}
									})
								}))
							}
							Promise.all(promiseWorkList).then((result)=>{
								if(_self.isDestroyed){
									return
								}
								
								for(let i=0; i<result.length;i++){
									_self.imageList.push(result[i])
								}
								
								_self.$emit('add', {
									currentImages: imagePathArr,
									allImages: _self.imageList
								})
								_self.$emit('input', _self.imageList)
							})
						}else{
							for(let i=0; i<imagePathArr.length;i++){
								_self.imageList.push(imagePathArr[i])
							}
							
							_self.$emit('add', {
								currentImages: imagePathArr,
								allImages: _self.imageList
							})
							_self.$emit('input', _self.imageList)
						}
					}
				})
			},
			deleteImage: function(e){
				var imageIndex = e.currentTarget.dataset.index
				var deletedImagePath = this.imageList[imageIndex]
				this.imageList.splice(imageIndex, 1) 
				
				//ဖျက်ထားသောရုပ်ပုံ၏ဆာဗာလိပ်စာဟုတ်မဟုတ်စစ်ဆေးပါ，သတ်မှတ်ထားပါကခေါ်ပါAPI，ဆာဗာဘက်ရှိရုပ်ပုံကိုဖျက်ပါ
				if(this.serverUrlDeleteImage){
					uni.request({
						url: this.serverUrlDeleteImage,
						method: 'GET',
						data: {
							imagePath: deletedImagePath
						},
						success: res => {
							console.log(res.data)
						}
					});
				}
				
				this.$emit('delete',{
					currentImage: deletedImagePath,
					allImages: this.imageList
				})
				this.$emit('input', this.imageList)
			},
			previewImage: function(e){
				var imageIndex = e.currentTarget.dataset.index
				uni.previewImage({
					current: this.imageList[imageIndex],
					indicator: "number",
					loop: "true",
					urls:this.imageList
				})
			},
			initImageBasePos: function(){
				let paddingRate = 0.024
				var _self = this
				//ပုံ၏ရည်ညွှန်းအနေအထားကိုတွက်ချက်ပါ
				uni.getSystemInfo({
					success: function(obj) {
						let screenWidth = obj.screenWidth
						let leftPadding = Math.ceil(paddingRate * screenWidth)
						let imageWidth = Math.ceil((screenWidth - 2*leftPadding)/4)
						
						_self.imageBasePos.x0 = leftPadding
						_self.imageBasePos.w = imageWidth
						_self.imageBasePos.h = imageWidth
					}
				})
			},
			findOverlapImage: function(posX, posY){
				let rows = Math.floor((posX-this.imageBasePos.x0)/this.imageBasePos.w)
				let cols = Math.floor((posY-this.imageBasePos.y0)/this.imageBasePos.h)
				let indx = cols*4 + rows
				return indx
			},
			isDragging: function(indx){
				return this.dragIndex === indx
			},
			start: function(e){
				console.log(this.isDragable)
				if(!this.isDragable){
					return
				}
				this.dragIndex = e.currentTarget.dataset.index
				this.moveImagePath = this.imageList[this.dragIndex]
				this.showMoveImage = true
				
				//ဒေါင်လိုက်ပုံရိပ်၏ရည်ညွှန်းအနေအထားတွက်ချက်
				if(this.imageBasePos.y0 === -1){
					this.initImageBasePos()
					
					let basePosY = Math.floor(this.dragIndex / 4) * this.imageBasePos.h
					let currentImageOffsetTop = e.currentTarget.offsetTop
					this.imageBasePos.y0 = currentImageOffsetTop - basePosY
				}
				
				//ရွေးချယ်ထားသည့်ရုပ်ပုံ၏ဘယ်ဘက်အပေါ်ထောင့်၏သြဒီနိတ်များကိုသတ်မှတ်ပါ
				this.moveLeft = e.target.offsetLeft
				this.moveTop = e.target.offsetTop
			},
			move: function(e){
				if(!this.isDragable){
					return
				}
				const touch = e.touches[0]
				this.targetImageIndex = this.findOverlapImage(touch.clientX, touch.clientY)
				
				//ကန ဦးdeltaLeft/deltaTop
				if(this.deltaLeft === 0){
					this.deltaLeft = touch.clientX - this.moveLeft
					this.deltaTop = touch.clientY - this.moveTop 
				}
				
				//မိုဘိုင်းရုပ်ပုံတည်နေရာကိုသတ်မှတ်ပါ
				this.moveLeft = touch.clientX - this.deltaLeft
				this.moveTop = touch.clientY - this.deltaTop
			},
			stop: function(e){
				if(!this.isDragable){
					return
				}
				if(this.dragIndex !== null && this.targetImageIndex !== null){
					if(this.targetImageIndex<0){
						this.targetImageIndex = 0
					}
				
					if(this.targetImageIndex>=this.imageList.length){
						this.targetImageIndex = this.imageList.length-1
					}
					//ရုပ်ပုံများဖလှယ်ပါ
					if(this.dragIndex !== this.targetImageIndex){
						this.imageList[this.dragIndex] = this.imageList[this.targetImageIndex]
						this.imageList[this.targetImageIndex] = this.moveImagePath
					}
				}
				
				this.dragIndex = null
				this.targetImageIndex = null
				this.deltaLeft = 0
				this.deltaTop = 0
				this.showMoveImage = false
				
				this.$emit('input', this.imageList)
			}
		}
	}
</script>

<style>
	.imageUploadContainer{
		padding: 10upx 5upx;
		margin: 10upx 5upx;
	}
	
	.dragging{
		transform: scale(1.2)
	}
	
	.imageUploadList{
		display: flex;
		flex-wrap: wrap;
	}
	
	.imageItem, .imageUpload{
		width: 160upx;
		height: 160upx;
		margin: 10upx;
	}
	
	.imageDel{
		position: relative;
		left: 120upx;
		bottom: 165upx;
		background-color: rgba(0,0,0,0.5);
		width: 36upx;
		text-align: center;
		line-height: 35upx;
		border-radius: 17upx;
		color: white;
		font-size: 30upx;
		padding-bottom: 2upx;
	}
	
	.imageItem image, .moveImage{
		width: 160upx;
		height: 160upx;
		border-radius: 8upx;
	}
	
	.imageUpload{
		line-height: 130upx;
		text-align: center;
		font-size: 150upx;
		color: #D9D9D9;
		border: 1px solid #D9D9D9;
		border-radius: 8upx;
	}
	
	.moveImage{
		position: absolute;
	}
</style>