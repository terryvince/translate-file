<style scoped lang="less">
	page {
		background-color: #F0F0F0 !important;
	}

	.overlay {
		background-color: rgba(0, 0, 0, .6);
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;

		.abs-left-top {
			position: absolute;
			left: 0;
			top: 0;
		}
	}

	.shoppingCart .list .item .picTxt {
		width: 590rpx;
	}

	.shoppingCart .list .item .picTxt .text {
		width: 420rpx;
	}

	.shoppingCart .list {
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: 10rpx;
		background-color: white !important;
		padding: 0 20rpx !important;
		.item {
			padding: 25rpx 0rpx;
		}
	}

	.shopListClass {
		margin-top: 84rpx;
		padding-top: 15rpx;
		padding-bottom: 15rpx;
		background-color: #F0F0F0;
	}

	.shopClass {
		// margin-left: 20rpx;
		// margin-right: 20rpx;
		border-radius: 15rpx;
		margin-top: 6rpx;
		background-color: #FFFFFF;

		.item {
			background-color: transparent !important;
			border-top: 1px solid #f5f5f5;
		}
	}

	.shoppingCart .nav .administrate.active {
		background: #71D676;
		border-color: #71D676;
	}

	.btn-linear-blue {
		color: white !important;
		background: linear-gradient(90deg, #71D676, #71D676) !important;
	}

	.placeOrder {
		width: 206rpx;
		height: 60rpx;
	}

	.select-btn {
		// width: 50rpx;
		height: 50rpx;
	}

	.invalidGoods {
		margin-left: 20rpx !important;
		margin-right: 20rpx !important;
	}
</style>
<template>
	<view class="shoppingCart">
		<view v-if="$store.getters.token||userInfo.uid">
			<view class="nav acea-row row-between-wrapper" style="top: 2rpx !important;">
				<view>
					<text>购物数量</text>
					<text class="num font-color-red" style="margin-left: 10rpx;">{{ count }}</text>
				</view>
				<view v-if="cartList.valid.length > 0" :class="['administrate acea-row row-center-wrapper',footerswitch ? 'active': '']"
				 @click="manage">{{ footerswitch ? '取消' : '管理' }}</view>
			</view>
			<view style="top: 0rpx; height: 2rpx; width: 100%; background-color: #F0F0F0; z-index: 3; position: fixed;"></view>
			<view class="shopListClass" v-if="cartList.valid.length > 0 || cartList.invalid.length > 0">
			    <view v-if="cartList.valid.length > 0">
					<view class="list" v-for="(shopItem, shopIndex) in cartList.valid" :key="shopIndex">
						<view class="shopClass">
							<view class="item acea-row row-between-wrapper" style="height: 30rpx;">
								<view class="select-btn flex-main-start" style="border-radius: 15rpx;">
									<view class="checkbox-wrapper">
										<checkbox-group @change="shopAllChecked(shopItem)">
											<label class="well-check">
												<checkbox style="transform:scale(0.9)" color="#71D676" value :checked="shopItem.checked"></checkbox>
											</label>
										</checkbox-group>
									</view>
									<text style="font-size: 28rpx;">{{shopItem.shopName}}</text>
								</view>
								<text style="font-size: 28rpx;">共{{shopItem.storeCartQueryVoList.length}}件商品</text>
							</view>
							<view class="line-top"></view>
							<view class="item acea-row row-between-wrapper" v-for="(item, cartListValidIndex) in shopItem.storeCartQueryVoList"
							 :key="cartListValidIndex">
								<label class="select-btn">
									<view class="checkbox-wrapper">
										<checkbox-group @change="switchSelect(item)">
											<label class="well-check">
												<checkbox style="transform:scale(0.9)" color="#71D676" value :checked="item.checked"></checkbox>
											</label>
										</checkbox-group>
									</view>
								</label>
								<view class="picTxt acea-row row-between-wrapper" style="margin-top: 10rpx;">
									<view class="pictrue relative" @click="goGoodsCon(item)">
										<view class="overlay full" v-show="item.productInfo.isShow == 0">
											<image src="../../../static/images/goods-off.png" mode="widthFix" class="width-half abs-left-top"></image>
										</view>
										<image :src="item.productInfo.attrInfo.image" v-if="item.productInfo.attrInfo" />
										<image :src="item.productInfo.image" v-else />
									</view>
									<view class="text">
										<view class="line1">{{ item.productInfo.storeName }}</view>
										<view class="infor line1" v-if="item.productInfo.attrInfo">属性：{{ item.productInfo.attrInfo.sku }}</view>
										<view class="money color-danger">￥{{ item.truePrice }}</view>
									</view>
									<view class="carnum acea-row row-center-wrapper">
										<view class="reduce" :class="item.cartNum <= 1 ? 'on' : ''" @click.prevent="reduce(item)">-</view>
										<view class="num">{{ item.cartNum }}</view>
										<view class="plus" v-if="item.attrInfo" :class="item.cartNum >= item.attrInfo.stock ? 'on' : ''"
										 @click.prevent="plus(item)">+</view>
										<view class="plus" v-else :class="item.cartNum >= item.stock ? 'on' : ''" @click.prevent="plus(item)">+</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="invalidGoods" v-if="cartList.invalid.length > 0">
					<view class="goodsNav acea-row row-between-wrapper">
						<view @click="goodsOpen">
							<text class="iconfont" :class="invalidGoodsHidden === true ? 'icon-xiangyou' : 'icon-xiangxia'"></text>失效商品
						</view>
						<view class="del" @click="delInvalidGoods">
							<text class="iconfont icon-shanchu1"></text>清空
						</view>
					</view>
					<view class="goodsList" :hidden="invalidGoodsHidden">
						<view v-for="(item, cartListinvalidIndex) in cartList.invalid" :key="cartListinvalidIndex">
							<view @click="goGoodsCon(item)" class="item acea-row row-between-wrapper" v-if="item.productInfo">
								<view class="invalid acea-row row-center-wrapper">失效</view>
								<view class="pictrue">
									<image :src="item.productInfo.attrInfo.image" v-if="item.productInfo.attrInfo" />
									<image :src="item.productInfo.image" v-else />
								</view>
								<view class="text acea-row row-column-between">
									<view class="line1">{{ item.productInfo.storeName }}</view>
									<view class="infor line1" v-if="item.productInfo.attrInfo">属性：{{ item.productInfo.attrInfo.sku }}</view>
									<view class="acea-row row-between-wrapper">
										<view class="end">该商品已下架</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!--购物车暂无商品-->
			<view class="noCart" v-if="cartList.valid.length === 0 && cartList.invalid.length === 0">
				<view class="pictrue">
					<image src="@/static/images/noCart.png" />
				</view>
				<Recommend></Recommend>
			</view>
			<view style="height:90rpx"></view>
			<view :class="['footer acea-row row-between-wrapper']" v-if="cartList.valid.length > 0">
				<view>
					<view class="select-btn">
						<view class="checkbox-wrapper">
							<checkbox-group @change="allChecked">
								<label class="well-check">
									<checkbox color="#71D676" value="allSelect" :checked="isAllSelect && cartCount > 0"></checkbox>
									<text class="checkAll">全选 ({{ cartCount }})</text>
								</label>
							</checkbox-group>
						</view>
					</view>
				</view>
				<view class="money acea-row row-middle" v-if="footerswitch === false">
					<text class="font-color-red">￥{{ countmoney }}</text>
					<view class="placeOrder btn-linear-blue" @click="placeOrder">立即下单</view>
				</view>
				<view class="button acea-row row-middle" v-else>
					<view class="bnt btn-linear-blue" @click="collectAll">移入收藏夹</view>
					<view class="bnt btn-linear-blue" @click="delgoods">删除</view>
				</view>
			</view>
		</view>
		<Authorization v-if="!$store.getters.token" />
	</view>
</template>
<script>
	import Recommend from "@/components/Recommend";
	import Authorization from "@/pages/authorization/index";
	import {
		mapGetters
	} from "vuex";

	import {
		getCartList,
		postCartDel,
		changeCartNum,
		getCartCount
	} from "@/api/store";
	import {
		postCollectAll
	} from "@/api/user";
	import {
		mul,
		add
	} from "@/utils/bc";
	import cookie from "@/utils/store/cookie";

	const CHECKED_IDS = "cart_checked";

	export default {
		name: "ShoppingCart",
		components: {
			Recommend,
			Authorization
		},
		props: {},
		data: function() {
			return {
				cartList: {
					valid: [
						// 	{
						// 	shopId: 0,
						// 	shopName: "店铺",
						// 	storeCartQueryVoList: [],
						// },
					],
					invalid: [],
				},
				validList: [],
				isAllSelect: false, //全选购物车
				isAllSelectByShop: false, //全选商户
				cartCount: 0, //unused
				count: 0, //购物车数量
				invalidCount: 0, //可下单的数量
				countmoney: 0,
				invalidGoodsHidden: false,
				footerswitch: false,
				checkedIds: [],
				loaded: false
			};
		},
		computed: mapGetters(["userInfo", "token"]),
		//   watch: {
		//     $yroute(n) {
		//       if (n.name === "ShoppingCart") {
		//         this.carnum();
		//         this.countMoney();
		//         this.getCartList();
		//         this.gainCount();
		//         this.invalidGoodsHidden = true;
		//         this.footerswitch = false;
		//       }
		//     },
		//     cartList(list) {
		//       this.validList = list.valid;
		//     }
		//   },
		watch: {
			userInfo(user) {
				if (user.uid) {
					this.carnum();
					this.countMoney();
					this.getCartList();
					this.gainCount();
				}
			},
			token(token) {
				if (this.userInfo.uid) {
					this.carnum();
					this.countMoney();
					this.getCartList();
					this.gainCount();
				}
			},
			cartList(list) {
				this.validList = list.valid;
			}
		},
		onShow: function() {
			if (this.userInfo.uid) {
				this.carnum();
				this.countMoney();
				this.getCartList();
				this.gainCount();
			}
		},
		methods: {
			shopAllChecked(shop) {
				console.log(shop)
				let that = this;
				shop.checked = !shop.checked;
				shop.storeCartQueryVoList.forEach(function(item) {
					item.checked = !shop.checked;
					that.sigleSelect(item);
				})
			},
			goGoodsCon(item) {
				// 已下架的商品不允许跳详情
				if (item.productInfo.isShow == 0) {
					return;
				}
				this.$yrouter.push({
					path: "/pages/shop/GoodsCon/index",
					query: {
						id: item.productId
					}
				});
			},
			//获取购物车列表
			getCartList: function() {
				let that = this;
				getCartList().then(res => {
					that.cartList = res.data;
					let checkedIds = cookie.get(CHECKED_IDS) || [];
					if (!Array.isArray(checkedIds)) checkedIds = [];
					that.invalidCount = 0;
					this.cartList.valid.forEach(cart => {
						cart.storeCartQueryVoList.forEach(item => {
							that.invalidCount++;
							if (checkedIds.indexOf(item.id) !== -1) item.checked = true;
						});
					});
					//test
					// this.cartList.invalid = this.cartList.valid[0].storeCartQueryVoList;
					if (checkedIds.length) {
						that.checkedIds = checkedIds;
						that.isAllSelect = checkedIds.length === that.invalidCount; //this.cartList.valid.length;
						that.isAllSelectByShop = that.isAllSelect;
						that.carnum();
						that.countMoney();
					}

					that.calculateShopSleect();

					that.loaded = true;
				});
			},

			//计算出商户的购物车数量
			calculateShopSleect: function() {
				this.cartList.valid.forEach(shop => {
					let num = 0;
					shop.storeCartQueryVoList.forEach(item => {
						if (item.checked === true) {
							num++;
						}
					});
					if (num === shop.storeCartQueryVoList.length) {
						shop.checked = true;
					} else {
						shop.checked = false;
					}
				});
			},
			//删除选中商品；
			delgoods: function() {
				let that = this,
					id = [],
					valid = [],
					list = that.cartList.valid;
				list.forEach(function(val) {
					val.storeCartQueryVoList.forEach(function(item) {
						if (item.checked === true) {
							id.push(item.id);
						}
					})
				});
				if (id.length === 0) {
					uni.showToast({
						title: "请选择产品",
						icon: "none",
						duration: 2000
					});
					return;
				}
				postCartDel(id).then(function() {
					// list.forEach(function(val, i) {
					// 	val.storeCartQueryVoList.forEach(function(item) {
					// 		if (item.checked === false || item.checked === undefined)
					// 			valid.push(item);
					// 	})
					// });
					// that.$set(that.cartList, "valid", valid);
					that.carnum();
					that.countMoney();
					that.gainCount();
					that.getCartList();
				});
			},
			//获取数量
			gainCount: function() {
				let that = this;
				getCartCount().then(res => {
					that.count = res.data.count;
				});
			},
			//清除失效产品；
			delInvalidGoods: function() {
				let that = this,
					id = [],
					list = that.cartList.invalid;
				list.forEach(function(val) {
					id.push(val.id);
				});
				postCartDel(id).then(function() {
					list.splice(0, list.length);
					that.gainCount();
					that.getCartList();
				});
			},
			//批量收藏;
			collectAll: function() {
				let that = this;
				let data = [];
				let list = that.cartList.valid;
				list.forEach(function(val) {
					val.storeCartQueryVoList.forEach(function(item) {
						if (item.checked === true) {
							data.push(postCollectAll.bind(this,{
								id: item.productId,
								category: item.type
							}))
						}
					})

				});
				if (data.length === 0) {
					uni.showToast({
						title: "请选择产品",
						icon: "none",
						duration: 2000
					});
					return;
				}
				
				async function control(arr,limit){   // 控制并发
					if(arr.length==0){
						return 'ok'
					}
					const requestPart = arr.splice(0,limit)
					try{
						const res = await Promise.all(requestPart.map(fn=>fn()))
					} catch(err){
						if(err.data.status != 5101){
							throw new Error(err.msg)
						}
					}
					return control(arr,limit)
				}
				
				control(data,1).then(function(res) {
						if(res=='ok'){
							uni.showToast({
								title: "收藏成功!",
								icon: "none",
								duration: 2000
							});
						}
					}).catch(function(error) {
						uni.showToast({
							title: error.msg || "",
							icon: "none",
							duration: 2000
						});
					});
			},
			//立即下单；
			placeOrder: function() {
				let that = this,
					list = that.cartList.valid,
					id = [];
				list.forEach(function(val) {
					val.storeCartQueryVoList.forEach(function(item) {
						if (item.checked === true) {
							id.push(item.id);
						}
					})
				});
				if (id.length === 0) {
					uni.showToast({
						title: "请选择产品",
						icon: "none",
						duration: 2000
					});
					return;
				}
				this.$yrouter.push({
					path: "/pages/order/OrderSubmission/index",
					query: {
						id: id.join(",")
					}
				});
			},
			manage: function() {
				let that = this;
				that.footerswitch = !that.footerswitch;
			},
			goodsOpen: function() {
				let that = this;
				that.invalidGoodsHidden = !that.invalidGoodsHidden;
			},
			//加
			plus: function(item) {
				let that = this;
				let list = item;
				list.cartNum++;
				if (list.attrInfo) {
					if (list.cartNum >= list.attrInfo.stock) {
						that.$set(list, "cart_num", list.attrInfo.stock);
					}
				} else {
					if (list.cartNum >= list.stock) {
						that.$set(list, "cart_num", list.stock);
					}
				}
				that.carnum();
				that.countMoney();
				that.syncCartNum(list);
			},
			//减
			reduce: function(item) {
				let that = this;
				let list = item;
				if (list.cartNum <= 1) {
					uni.showToast({
						title: "已经是底线啦!",
						icon: "none",
						duration: 2000
					});
					return;
				}
				list.cartNum--;
				if (list.cartNum < 1) {
					that.$set(list, "cart_num", 1);
				}
				that.carnum();
				that.countMoney();
				that.syncCartNum(list);
			},
			syncCartNum(cart) {
				if (!cart.sync) {
					changeCartNum(cart.id, Math.max(cart.cartNum, 1) || 1)
						.then(res => {
							this.getCartList();
							this.gainCount();
						})
						.catch(error => {
							this.gainCount();
							uni.showToast({
								title: error.msg,
								icon: "none",
								duration: 2000
							});
						});
				}
			},
			//单选
			switchSelect: function(item) {
				this.sigleSelect(item);
				this.calculateShopSleect();
			},
			//单选
			sigleSelect: function(item) {
				let that = this,
					cart = item,
					i = this.checkedIds.indexOf(cart.id);
				cart.checked = !cart.checked;

				if (i !== -1) this.checkedIds.splice(i, 1);
				if (cart.checked) {
					this.checkedIds.push(cart.id);
				}
				let len = that.cartList.valid.length;
				let selectnum = [];
				for (let i = 0; i < len; i++) {
					for (let j = 0; j < that.cartList.valid[i].storeCartQueryVoList.length; j++) {
						let obj = that.cartList.valid[i].storeCartQueryVoList[j];
						if (obj.checked === true) {
							selectnum.push(true);
						}
					}
				}
				that.isAllSelect = selectnum.length === that.invalidCount;
				that.$set(that, "cartList", that.cartList);
				that.$set(that, "isAllSelect", that.isAllSelect);
				cookie.set(CHECKED_IDS, that.checkedIds);
				that.carnum();
				that.gainCount();
				that.countMoney();
			},
			//全选
			allChecked: function(e) {
				console.log(e);
				let that = this;
				let selectAllStatus = e.mp.detail.value[0] == "allSelect" ? true : false;
				console.log(selectAllStatus);
				// let selectAllStatus = that.isAllSelect;
				let checkedIds = [];
				// for (let i = 0; i < array.length; i++) {
				//   array[i].checked = selectAllStatus;
				//   checked.push()
				// }
				that.cartList.valid.forEach(cart => {
					cart.checked = selectAllStatus;
					cart.storeCartQueryVoList.forEach(function(item) {
						item.checked = selectAllStatus;
						if (selectAllStatus) {
							checkedIds.push(item.id);
						}
					})
				});
				let cartList = {
					...that.cartList
				};
				that.cartList = [];
				that.cartList = cartList;
				console.log(this.cartList);
				this.$set(this, "cartList", this.cartList);
				this.$set(this, "isAllSelect", selectAllStatus);
				this.checkedIds = checkedIds;
				cookie.set(CHECKED_IDS, checkedIds);
				that.carnum();
				that.countMoney();
				this.$forceUpdate();
			},
			//数量
			carnum: function() {
				let that = this;
				var carnum = 0;
				var array = that.cartList.valid;
				for (let i = 0; i < array.length; i++) {
					for (let j = 0; j < array[i].storeCartQueryVoList.length; j++) {
						let item = array[i].storeCartQueryVoList[j];
						if (item.checked === true) {
							carnum += parseInt(item.cartNum);
						}
					}
				}
				that.$set(that, "cartCount", carnum);
				that.$set(that, "count", carnum);
			},
			//总共价钱；
			countMoney: function() {
				let that = this;
				let carmoney = 0;
				let array = that.cartList.valid;
				for (let i = 0; i < array.length; i++) {
					for (let j = 0; j < array[i].storeCartQueryVoList.length; j++) {
						let item = array[i].storeCartQueryVoList[j];
						if (item.checked === true) {
							carmoney = add(carmoney, mul(item.cartNum, item.truePrice));
						}
					}
					that.countmoney = carmoney;
				}
			}
		}
	};
</script>
