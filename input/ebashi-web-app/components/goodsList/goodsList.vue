<style scoped lang="less">
// 多行多列布局
.grid(@count:4,@itemWidth:20,@itemHeight:auto){
	@rest:100 - @itemWidth * @count; // 剩余空间
	@space: @rest/(@count - 1) * 1%; // 边距
	display: flex;
	& > view {
		flex: 0 0 @itemWidth * 1%;
		height: @itemHeight;
		margin-right: @space;
		margin-top: @space;
		box-sizing: border-box;
		&:nth-child( @{count}n ){
			margin-right: 0;
		}
		&:nth-child( -n + @{count} ){
			margin-top: 0;
		}
		&:last-child{
			margin-right: auto;
		}
	}
}
 .good-list-card{
	 flex-wrap: wrap;
	 .grid(2,48);
	 .list-item{
		 background-color: white;
		 border-radius: 20rpx;
		 overflow: hidden;
	 }
	 .img-wrap{
		 width: 100%;
		 height: 345rpx;
		 border-radius:8rpx 4rpx 4rpx 4rpx;
	 }
	 .content{
		 padding: 22rpx 18rpx;
	 }
 }
 .top-31{
	 margin-top: 31rpx;
 }
 .top-22{
	 margin-top:22rpx;
 }
 .top-19{
	 margin-top:19rpx;
 }
 .left-6{
	 margin-left: 6rpx;
 }
 .overlay{
	 background-color: rgba(0,0,0,.6);
	 position: absolute;
	 left: 0;
	 top: 0;
	 right: 0;
	 bottom: 0;
	 .abs-left-top{
		 position: absolute;
		 left: 0;
		 top: 0;
	 }
 }
 .group-list{
	 // background-color: white;
	.group-img-wrap{
		width: 279rpx;
		height: 212rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}
	.group-item{
		margin-bottom: 20rpx;
		&:last-child{
			margin-bottom: 0;
		}
	}
	.group-badge{
		width: 140rpx;
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 0;
	}
	.group-title{
		height: 64rpx;
	}
 }
 .seckill-list{
 	 // background-color: white;
 	.seckill-img-wrap{
 		width: 279rpx;
 		height: 212rpx;
 		border-radius: 20rpx;
 		overflow: hidden;
 	}
 	.seckill-item{
 		margin-bottom: 32rpx;
 		&:last-child{
 			margin-bottom: 0;
 		}
 	}
 	.seckill-title{
 		height: 64rpx;
 	}
 }
 .progress-label{
	 position: absolute;
	 left: 110rpx;
	 top: 50%;
	 transform: translate(0,-50%);
 }
</style>
<template>
	<view class="wi" v-if="list">
		<!-- 普通商品或者积分商品 -->
		<view v-if="from == 'goods' || from == 'point'" class="good-list-card">
			<view @click="goDetail(item)" :class="['list-item lh-1']" v-for="(item,i) in list" :key="i">
				<!-- 商品下架蒙尘 -->
				<view class="img-wrap over-hide relative">
					<view class="overlay full" v-show="item.isShow == 0">
						<image src="../../static/images/goods-off.png" mode="widthFix" class="width-half abs-left-top"></image>
					</view>
					<image :src="item.image" class="full"></image>
				</view>
				<view class="content">
					<!-- 商品名 -->
					<view class="fs-26 color-text top-22 txt-medium width-full txt-ellipsis row-2" style="height: 64rpx;line-height: 32rpx;">{{item.storeName}}</view>
					<view v-if="from == 'goods'">
						<!-- 商品价格 -->
						<view class="flex-main-start top-31 fs-22">
							<text class="color-danger">¥</text>
							<text class="color-danger fs-32">{{item.price|toFixed}} </text>
							<text class="color-text-secondary del-line left-6">¥{{item.otPrice|toFixed}}</text>
						</view>
						<!-- 商户已售 -->
						<view class="fs-20 color-text-secondary top-19 flex-main-between">
							<text class="txt-bold">{{item.merName||item.shopName||'未设置店名'}}</text>
							<text class="txt-light">已售{{item.sales||0}}</text>
						</view>
					</view>
					<!-- 积分商品 -->
					<view v-else class="color-danger txt-heavy fs-28 top-22">
						{{item.price}}积分 
					</view>
				</view>
			</view>
		</view>
		<!-- 团购商品 -->
		<view v-else-if="from=='group'" class="group-list color-text lh-1">
			<view @click="goDetail(item)" class="group-item flex-main-start lh-1" v-for="(item,i) in list" :key="i">
				<view class="group-img-wrap flex-none flex-main-center">
					<image :src="item.image" class="width-full" mode="aspectFit"></image>
				</view>
				<view class="group-content left-20 flex-1">
					<view class="group-title fs-28 relative">
						<text class="group-badge badge badge-mini-extra badge-primary badge-radius txt-ellipsis">{{item.addressObj | formatJson}}</text>
						<text class="txt-medium txt-ellipsis row-2" style="line-height: 1.2;text-indent: 150rpx;">
							{{item.title}}
						</text>
					</view>
					<view class="color-gray fs-20 txt-baseline" style="margin-top: 26rpx;">
						<text class="txt-bold">{{item.merName||'未设置店名'}}</text>
						<text class="left-10 fs-26 txt-bold">{{item.people}}</text>
						<text class="txt-medium">购买数成团</text>
					</view>
					<view class="group-extra flex-main-between top-30">
						<view>
							<view class="fs-22 txt-heavy color-danger txt-baseline">
								<text>￥</text>
								<text class="fs-32">{{item.price|toFixed}}</text>
								<text class="txt-bold del-line color-gray" style="margin-left: 3rpx;">￥{{item.productPrice|toFixed}}</text>
							</view>
							<view class="color-gray fs-20 txt-medium top-15">已拼成 <text class="txt-heavy fs-24">{{item.sales||0}}</text> 件</view>
						</view>
						<button class="btn btn-linear-green btn-fix-width">拼团</button>
					</view>
					
				</view>
			</view>
		</view>
		<!-- 秒杀商品 -->
		<view v-else-if="from=='seckill'" class="seckill-list color-text lh-1">
			<view @click="goDetail(item)" class="seckill-item flex-main-start lh-1" v-for="(item,i) in list" :key="i">
				<view class="seckill-img-wrap flex-none">
					<image :src="item.image" class="full"></image>
				</view>
				<view class="seckill-content flex-1 left-20">
					<view class="seckill-title fs-28">
						<text class="txt-medium txt-ellipsis row-2" style="line-height: 1.2;">
							{{item.title}} 
						</text>
					</view>
					<view class="progress-box top-30 relative">
						<text class="progress-label color-white fs-16 txt-bold">仅剩{{item.stock}}件</text>
						<progress :percent="item.stock/(item.sales+item.stock)*100" active :stroke-width="toPx(24)" :border-radius="toPx(9)" backgroundColor="#E5E5E5" activeColor="#FF9322"/>
					</view>
					<view class="seckill-extra flex-main-between" style="margin-top: 23rpx;">
						<view>
							<view class="fs-22 txt-heavy color-danger txt-baseline">
								<text>秒杀价</text>
								<text class="left-5">￥</text>
								<text class="fs-32">{{item.price|toFixed}}</text>
							</view>
							<view class="color-gray fs-20 txt-medium top-15">{{item.merName||'未设置店名'}}</view>
						</view>
						<button :class="['btn btn-fix-width',item.status == 1 ? 'btn-linear-orange':'btn-gray']">{{item.status | formatStatus}}</button>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'GoodsList',
		props:{
			list:{  // 列表数据，普通商品和积分商品字段名称要求一致，秒杀和团购商品字段名称可以不一致
				type:[Array],
				default:[]
			},
			// 什么来源，普通商品，秒杀商品
			from:{
				type:[String],
				default:'goods'  // seckill 秒杀商品 goods 普通商品 point 积分商品 group 团购商品
			},
			keyMap:{
				type:[String],
				default:null
			}
		},
		filters:{
			toFixed(value, option=2){
				if(typeof value !== 'number'){
					return '非数字'
				}
				value = +value
				return value.toFixed(option)
			},
			// 秒杀按钮文字
			formatStatus(value){
				return {
					1:'马上抢',
					2:'即将开始',
					0:'已结束'
				}[value] || '马上抢'
			}
		},
		created(){
			
		},
		data() {
			return {
			};
		},
		methods:{
			goDetail(item){
				if(item.isShow==0){
					uni.showToast({
						icon:'none',
						title:'商品已下架'
					})
					return
				}
				if(item.stock && item.stock<1){
					uni.showToast({
						icon:'none',
						title:'商品已售磬'
					})
					return
				}
				if(this.from == 'seckill' && item.status!=1){   // 只允许抢购中的秒杀跳转
					return;
				} 
				if(this.from == 'seckill'){ //秒杀商品
					this.$yrouter.push({
					  path: "/pages/activity/SeckillDetails/index",
					  query: {
					    id:item.id,
					    time:item.stop || item.stopTime / 1000
					  }
					});
					return
				}
				if(this.from == 'group') { // 团购商品
					this.$yrouter.push({
					  path: "/pages/activity/GroupDetails/index",
					  query: { id:item.id }
					});
					return
				}
				// 普通商品
				this.$yrouter.push({
				  path: "/pages/shop/GoodsCon/index",
				  query: {
					  id: item.pid || item.id,
					  mode: this.from
				  }
				});
			}
		}
	}
</script>
