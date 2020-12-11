<style lang="less">
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
</style>
<template>
	<view class="shoppingCart">
		<view v-if="$store.getters.token||userInfo.uid">
			<view class="labelNav acea-row row-around row-middle">
				<view class="item">
					<text class="iconfont icon-xuanzhong"></text>100%စစ်မှန်သောအာမခံချက်
				</view>
				<view class="item">
					<text class="iconfont icon-xuanzhong"></text>ထုတ်ကုန်အားလုံးဂရုတစိုက်ရွေးချယ်ထားကြသည်
				</view>
				<view class="item">
					<text class="iconfont icon-xuanzhong"></text>စိုးရိမ်စရာ - အခမဲ့ပြီးနောက် - ရောင်းအား
				</view>
			</view>
			<view class="nav acea-row row-between-wrapper">
				<view>
					<text>ဝယ်ယူမှုအရေအတွက်</text>
					<text class="num font-color-red" style="margin-left: 10rpx;">{{ count }}</text>
				</view>
				<view v-if="cartList.valid.length > 0" :class="['administrate acea-row row-center-wrapper',footerswitch ? 'active': '']"
				 @click="manage">{{ footerswitch ? 'ပယ်ဖျက်' : 'စီမံခန့်ခွဲမှု' }}</view>
			</view>


			<view v-if="validList.length > 0 || cartList.invalid.length > 0">
				<view class="list">
					<view class="item acea-row row-between-wrapper" v-for="(item, cartListValidIndex) in validList" :key="cartListValidIndex">
						<view class="select-btn">
							<view class="checkbox-wrapper">
								<checkbox-group @change="switchSelect(cartListValidIndex)">
									<label class="well-check">
										<checkbox color="#0572B7" value :checked="item.checked"></checkbox>
									</label>
								</checkbox-group>
							</view>
						</view>
						<view class="picTxt acea-row row-between-wrapper">
							<view class="pictrue relative" @click="goGoodsCon(item)">
								<view class="overlay full" v-show="item.productInfo.isShow == 0">
									<image src="../../../static/images/goods-off.png" mode="widthFix" class="width-half abs-left-top"></image>
								</view>
								<image :src="item.productInfo.attrInfo.image" v-if="item.productInfo.attrInfo" />
								<image :src="item.productInfo.image" v-else />
							</view>
							<view class="text">
								<view class="line1">{{ item.productInfo.storeName }}</view>
								<view class="infor line1" v-if="item.productInfo.attrInfo">ဂုဏ်ရည်：{{ item.productInfo.attrInfo.sku }}</view>
								<view class="money color-danger">￥{{ item.truePrice }}</view>
							</view>
							<view class="carnum acea-row row-center-wrapper">
								<view class="reduce" :class="validList[cartListValidIndex].cartNum <= 1 ? 'on' : ''" @click.prevent="reduce(cartListValidIndex)">-</view>
								<view class="num">{{ item.cartNum }}</view>
								<view class="plus" v-if="validList[cartListValidIndex].attrInfo" :class="validList[cartListValidIndex].cartNum >= validList[cartListValidIndex].attrInfo.stock ? 'on' : ''"
								 @click.prevent="plus(cartListValidIndex)">+</view>
								<view class="plus" v-else :class="validList[cartListValidIndex].cartNum >= validList[cartListValidIndex].stock ? 'on' : ''"
								 @click.prevent="plus(cartListValidIndex)">+</view>
							</view>
						</view>
					</view>
				</view>
				<view class="invalidGoods" v-if="cartList.invalid.length > 0">
					<view class="goodsNav acea-row row-between-wrapper">
						<view @click="goodsOpen">
							<text class="iconfont" :class="goodsHidden === true ? 'icon-xiangyou' : 'icon-xiangxia'"></text>ကုန်ဆုံးကုန်ပစ္စည်းများ
						</view>
						<view class="del" @click="delInvalidGoods">
							<text class="iconfont icon-shanchu1"></text>ဗလာ
						</view>
					</view>
					<view class="goodsList" :hidden="goodsHidden">
						<view v-for="(item, cartListinvalidIndex) in cartList.invalid" :key="cartListinvalidIndex">
							<view @click="goGoodsCon(item)" class="item acea-row row-between-wrapper" v-if="item.productInfo">
								<view class="invalid acea-row row-center-wrapper">မမှန်ကန်ပါ</view>
								<view class="pictrue">
									<image :src="item.productInfo.attrInfo.image" v-if="item.productInfo.attrInfo" />
									<image :src="item.productInfo.image" v-else />
								</view>
								<view class="text acea-row row-column-between">
									<view class="line1">{{ item.productInfo.storeName }}</view>
									<view class="infor line1" v-if="item.productInfo.attrInfo">ဂုဏ်ရည်：{{ item.productInfo.attrInfo.sku }}</view>
									<view class="acea-row row-between-wrapper">
										<view class="end">ဒီထုတ်ကုန်အားဖယ်ရှားလိုက်ပြီ</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!--စျေးဝယ်လှည်းတွင်ပစ္စည်းမရှိပါ-->
			<view class="noCart" v-if="cartList.valid.length === 0 && cartList.invalid.length === 0">
				<view class="pictrue">
					<image src="@/static/images/noCart.png" />
				</view>
				<Recommend></Recommend>
			</view>
			<view style="height:210rpx"></view>
			<view :class="['footer acea-row row-between-wrapper']" v-if="cartList.valid.length > 0">
				<view>
					<view class="select-btn">
						<view class="checkbox-wrapper">
							<!-- <label class="well-check">
              <input
                type="checkbox"
                name
                value
                :checked="isAllSelect && cartCount > 0"
                @click="allChecked"
              />
              <i class="icon"></i>
              <text class="checkAll">အားလုံးကိုရွေးပါ ({{ cartCount }})</text>
              </label>-->

							<checkbox-group @change="allChecked">
								<label class="well-check">
									<checkbox color="#0572B7" value="allSelect" :checked="isAllSelect && cartCount > 0"></checkbox>
									<text class="checkAll">အားလုံးကိုရွေးပါ ({{ cartCount }})</text>
								</label>
							</checkbox-group>
						</view>
					</view>
				</view>
				<view class="money acea-row row-middle" v-if="footerswitch === false">
					<text class="font-color-red">￥{{ countmoney }}</text>
					<view class="placeOrder btn-linear-blue" @click="placeOrder">ယခုမှာယူပါ</view>
				</view>
				<view class="button acea-row row-middle" v-else>
					<view class="bnt btn-linear-blue" @click="collectAll">အကြိုက်ဆုံးသို့ရွှေ့ပါ</view>
					<view class="bnt btn-linear-blue" @click="delgoods">ဖျက်ပါ</view>
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
				shopList: [{
					name: "",

				}],
				cartList: {
					invalid: [],
					valid: []
				},
				validList: [],
				isAllSelect: false,
				cartCount: 0,
				countmoney: 0,
				goodsHidden: true,
				footerswitch: false,
				count: 0,
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
		//         this.goodsHidden = true;
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
			goGoodsCon(item) {
				// ဖယ်ရှားပစ်လိုက်သောကုန်ပစ္စည်းများသည်အသေးစိတ်အချက်အလက်များကိုကျော်။ မရပါ
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
			getCartList: function() {
				let that = this;
				getCartList().then(res => {
					that.cartList = res.data;
					let checkedIds = cookie.get(CHECKED_IDS) || [];
					if (!Array.isArray(checkedIds)) checkedIds = [];
					this.cartList.valid.forEach(cart => {
						if (checkedIds.indexOf(cart.id) !== -1) cart.checked = true;
					});
					that.cartList.invalid = that.cartList.valid;
					if (checkedIds.length) {
						that.checkedIds = checkedIds;
						that.isAllSelect = checkedIds.length === this.cartList.valid.length;
						that.carnum();
						that.countMoney();
					}
					this.loaded = true;
				});
			},
			//ထုတ်ကုန်ဖျက်ပါ；
			delgoods: function() {
				let that = this,
					id = [],
					valid = [],
					list = that.cartList.valid;
				list.forEach(function(val) {
					if (val.checked === true) {
						id.push(val.id);
					}
				});
				if (id.length === 0) {
					uni.showToast({
						title: "ကျေးဇူးပြုပြီးထုတ်ကုန်ရွေးပါ",
						icon: "none",
						duration: 2000
					});
					return;
				}
				postCartDel(id).then(function() {
					list.forEach(function(val, i) {
						if (val.checked === false || val.checked === undefined)
							valid.push(list[i]);
					});
					that.$set(that.cartList, "valid", valid);
					that.carnum();
					that.countMoney();
					that.gainCount();
					that.getCartList();
				});
			},
			// //ဝယ်ယူထားသောအရေအတွက်
			gainCount: function() {
				let that = this;
				getCartCount().then(res => {
					that.count = res.data.count;
				});
			},
			//မမှန်ကန်သောထုတ်ကုန်များကိုဖယ်ရှားပါ；
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
			//အသုတ်စုဆောင်းမှု;
			collectAll: function() {
				let that = this;
				let data = [];
				let list = that.cartList.valid;
				list.forEach(function(val) {
					if (val.checked === true) {
						data.push({
							id: val.productId,
							category: val.type
						})
					}
				});
				if (data.length === 0) {
					uni.showToast({
						title: "ကျေးဇူးပြုပြီးထုတ်ကုန်ရွေးပါ",
						icon: "none",
						duration: 2000
					});
					return;
				}
				var cont = 0;
				data.forEach(function(item) {
					console.log(item)
					postCollectAll(item).then(function() {
						cont++;
						if (cont === data.length) {
							uni.showToast({
								title: "စုဆောင်းမှုအောင်မြင်!",
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
				});
			},
			//ယခုမှာယူပါ；
			placeOrder: function() {
				let that = this,
					list = that.cartList.valid,
					id = [];
				list.forEach(function(val) {
					if (val.checked === true) {
						id.push(val.id);
					}
				});
				if (id.length === 0) {
					uni.showToast({
						title: "ကျေးဇူးပြုပြီးထုတ်ကုန်ရွေးပါ",
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
				that.goodsHidden = !that.goodsHidden;
			},
			//ပေါင်း
			plus: function(index) {
				let that = this;
				let list = that.cartList.valid[index];
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
			//နည်းသော
			reduce: function(index) {
				let that = this;
				let list = that.cartList.valid[index];
				if (list.cartNum <= 1) {
					uni.showToast({
						title: "အောက်ခြေလိုင်းရှိပြီးသား!",
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
			//ရွေးချယ်မှုတစ်ခု
			switchSelect: function(index) {
				let that = this,
					cart = that.cartList.valid[index],
					i = this.checkedIds.indexOf(cart.id);
				cart.checked = !cart.checked;

				if (i !== -1) this.checkedIds.splice(i, 1);
				if (cart.checked) {
					this.checkedIds.push(cart.id);
				}
				let len = that.cartList.valid.length;
				let selectnum = [];
				for (let i = 0; i < len; i++) {
					if (that.cartList.valid[i].checked === true) {
						selectnum.push(true);
					}
				}
				that.isAllSelect = selectnum.length === len;
				that.$set(that, "cartList", that.cartList);
				that.$set(that, "isAllSelect", that.isAllSelect);
				cookie.set(CHECKED_IDS, that.checkedIds);
				that.carnum();
				that.gainCount();
				that.countMoney();
			},
			//အားလုံးကိုရွေးပါ
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
					if (selectAllStatus) {
						checkedIds.push(cart.id);
					}
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
			//အရေအတွက်
			carnum: function() {
				let that = this;
				var carnum = 0;
				var array = that.cartList.valid;
				for (let i = 0; i < array.length; i++) {
					if (array[i].checked === true) {
						carnum += parseInt(array[i].cartNum);
					}
				}
				that.$set(that, "cartCount", carnum);
			},
			//စုစုပေါင်းစျေးနှုန်း；
			countMoney: function() {
				let that = this;
				let carmoney = 0;
				let array = that.cartList.valid;
				for (let i = 0; i < array.length; i++) {
					if (array[i].checked === true) {
						carmoney = add(carmoney, mul(array[i].cartNum, array[i].truePrice));
					}
				}
				that.countmoney = carmoney;
			}
		}
	};
</script>
