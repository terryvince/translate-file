<template>
	<view class="pos-order-list" ref="container">
		<view class="nav acea-row row-around row-middle">
			<view class="item" :class="where.status == 0 ? 'on' : ''" @click="changeStatus(0)">ငွေပေးချေမှုကိုဆိုင်းငံ့ထား</view>
			<view class="item" :class="where.status == 1 ? 'on' : ''" @click="changeStatus(1)">ကယ်နှုတ်ခံရဖို့</view>
			<view class="item" :class="where.status == 2 ? 'on' : ''" @click="changeStatus(2)">လက်ခံရရှိရန်</view>
			<view class="item" :class="where.status == 3 ? 'on' : ''" @click="changeStatus(3)">မှတ်ချက်</view>
			<view class="item" :class="where.status == 4 ? 'on' : ''" @click="changeStatus(4)">ပြီးစီးခဲ့သည်</view>
			<view class="item" :class="where.status == -3 ? 'on' : ''" @click="changeStatus(-3)">ပြန်အမ်းငွေ</view>
		</view>
		<view class="list">
			<view class="item" v-for="(item, listIndex) in list" :key="listIndex">
				<view class="order-num acea-row row-middle" @click="toDetail(item)">
					<text>အမှာစာနံပါတ်：{{ item.orderId }}</text>
					<text class="time">
						<text>မှာယူမည့်အချိန်：</text>
						<data-format :date="item.addTime"></data-format>
					</text>
				</view>
				<view class="pos-order-goods" v-for="(val, key) in item.cartInfo" :key="key">
					<view class="goods acea-row row-between-wrapper" @click="toDetail(item)">
						<view class="picTxt acea-row row-between-wrapper">
							<view class="pictrue">
								<image :src="val.productInfo.image" />
							</view>
							<view class="text acea-row row-between row-column">
								<view class="info line2">{{ val.productInfo.storeName }}</view>
								<view class="attr" v-if="val.productInfo.sku">{{ val.productInfo.sku }}</view>
							</view>
						</view>
						<view class="money">
							<view class="x-money">￥{{ val.productInfo.price }}</view>
							<view class="num">x{{ val.cartNum }}</view>
							<view class="y-money">￥{{ val.productInfo.otPrice }}</view>
						</view>
					</view>
				</view>
				<view class="public-total">
					စုစုပေါင်း{{ item.totalNum }}ပစ္စည်းများ，ပေးဆောင်
					<text class="money">￥{{ item.payPrice }}</text>
					( စာပို့ခ ¥{{
          item.totalPostage
          }}
					)
				</view>
				<view class="operation acea-row row-between-wrapper">
					<view class="more">
						<!--            <view class="iconfont icon-gengduo" @click="more(index)"></view>-->
						<!--            <view class="order" v-show="current === index">-->
						<!--              <view class="items">-->
						<!--                {{ where.status > 0 ? "ဖျက်ပါ" : "ပယ်ဖျက်" }}အမှာစာ-->
						<!--              </view>-->
						<!--              <view class="arrow"></view>-->
						<!--            </view>-->
					</view>
					<view class="acea-row row-middle">
						<view class="bnt" @click="modify(item, 0)" v-if="where.status == 0">တစ်ချက်နှိပ်လျှင်စျေးနှုန်းပြောင်းလဲခြင်း</view>
						<view class="bnt" @click="modify(item, 0)" v-if="where.status == -3 && item.refundStatus === 1">ယခုပြန်အမ်းငွေ</view>
						<view class="bnt cancel" v-if="item.pay_type === 'offline' && item.paid === 0" @click="offlinePay(item)">ငွေပေးချေမှုကိုအတည်ပြုပါ</view>
						<view class="bnt" v-if="where.status == 1" @click="goGoodsDeliver(item)">တင်ပို့ရန်</view>
					</view>
				</view>
			</view>
		</view>
		<Loading :loaded="loaded" :loading="loading"></Loading>
		<PriceChange :change="change" :orderInfo="orderInfo" v-on:closechange="changeclose($event)" v-on:savePrice="savePrice"
		 :status="status"></PriceChange>
	</view>
</template>
<script>
	import PriceChange from "@/components/PriceChange";
	import Loading from "@/components/Loading";
	import DataFormat from "@/components/DataFormat";
	import {
		getAdminOrderList,
		setAdminOrderPrice,
		setAdminOrderRemark,
		setOfflinePay,
		setOrderRefund
	} from "@/api/admin";
	import {
		required,
		num
	} from "@/utils/validate";
	import {
		validatorDefaultCatch
	} from "@/utils/dialog";
	export default {
		name: "AdminOrderList",
		components: {
			PriceChange,
			Loading,
			DataFormat
		},
		props: {},
		data: function() {
			return {
				current: "",
				change: false,
				types: 0,
				where: {
					page: 1,
					limit: 5,
					status: 0
				},
				list: [],
				loaded: false,
				loading: false,
				orderInfo: {},
				status: ""
			};
		},
		watch: {
			"$yroute.query.types": function(newVal) {
				let that = this;
				if (newVal != undefined) {
					that.where.status = newVal;
					that.init();
				}
			},
			types: function() {
				this.getIndex();
			}
		},
		mounted: function() {
			let that = this;
			that.where.status = that.$yroute.query.types;
			that.current = "";
			that.getIndex();
		},
		onReachBottom() {
			!this.loading && this.getIndex();
		},
		methods: {
			goGoodsDeliver(item) {
				this.$yrouter.push({
					path: "/pages/orderAdmin/GoodsDeliver/index",
					query: {
						oid: item.orderId
					}
				});
			},
			more: function(index) {
				if (this.current === index) this.current = "";
				else this.current = index;
			},
			modify: function(item, status) {
				this.change = true;
				this.orderInfo = item;
				this.status = status;
			},
			changeclose: function(msg) {
				this.change = msg;
			},
			async savePrice(opt) {
				let that = this,
					data = {},
					price = opt.price.toString(),
					refund_price = opt.refund_price.toString(),
					refund_status = that.orderInfo.refundStatus,
					remark = opt.remark;
				data.orderId = that.orderInfo.orderId;
				if (that.status == 0 && refund_status === 0) {
					try {
						await this.$validator({
							price: [
								required(required.message("ပမာဏ")),
								num(num.message("ပမာဏ"))
							]
						}).validate({
							price
						});
					} catch (e) {
						return validatorDefaultCatch(e);
					}
					data.price = price;
					setAdminOrderPrice(data).then(
						function() {
							that.change = false;
							uni.showToast({
								title: "စျေးနှုန်းကိုအောင်မြင်စွာပြောင်းလဲလိုက်ပြီ",
								icon: "success",
								duration: 2000
							});
							that.init();
						},
						function() {
							that.change = false;
							uni.showToast({
								title: "စျေးနှုန်းပြောင်းလဲမှုမအောင်မြင်ပါ",
								icon: "none",
								duration: 2000
							});
						}
					);
				} else if (that.status == 0 && refund_status === 1) {
					try {
						await this.$validator({
							refund_price: [
								required(required.message("ပမာဏ")),
								num(num.message("ပမာဏ"))
							]
						}).validate({
							refund_price
						});
					} catch (e) {
						return validatorDefaultCatch(e);
					}
					data.price = refund_price;
					data.type = opt.type;
					setOrderRefund(data).then(
						res => {
							that.change = false;
							uni.showToast({
								title: res.msg,
								icon: "none",
								duration: 2000
							});
							that.init();
						},
						err => {
							that.change = false;
							uni.showToast({
								title: res.msg,
								icon: "none",
								duration: 2000
							});
						}
					);
				} else {
					try {
						await this.$validator({
							remark: [required(required.message("မှတ်ချက်"))]
						}).validate({
							remark
						});
					} catch (e) {
						return validatorDefaultCatch(e);
					}
					data.remark = remark;
					setAdminOrderRemark(data).then(
						res => {
							that.change = false;
							uni.showToast({
								title: res.msg,
								icon: "none",
								duration: 2000
							});
							that.init();
						},
						err => {
							that.change = false;
							uni.showToast({
								title: res.msg,
								icon: "none",
								duration: 2000
							});
						}
					);
				}
			},
			init: function() {
				this.list = [];
				this.where.page = 1;
				this.loaded = false;
				this.loading = false;
				this.getIndex();
				this.current = "";
			},
			getIndex: function() {
				let that = this;
				if (that.loading || that.loaded) return;
				that.loading = true;
				getAdminOrderList(that.where).then(
					res => {
						that.loading = false;
						that.loaded = res.data.length < that.where.limit;
						that.list.push.apply(that.list, res.data);
						that.where.page = that.where.page + 1;
					},
					err => {
						uni.showToast({
							title: res.msg,
							icon: "none",
							duration: 2000
						});
					}
				);
			},
			changeStatus: function(val) {
				if (this.where.status != val) {
					this.where.status = val;
					this.init();
				}
			},
			toDetail: function(item) {
				this.$yrouter.push({
					path: "/pages/orderAdmin/AdminOrder/index",
					query: {
						oid: item.orderId
					}
				});
			},
			offlinePay: function(item) {
				setOfflinePay({
					order_id: item.order_id
				}).then(
					res => {
						uni.showToast({
							title: res.msg,
							icon: "none",
							duration: 2000
						});
						this.init();
					},
					error => {
						uni.showToast({
							title: error.msg,
							icon: 'none',
							duration: 2000
						});
					}
				);
			}
		}
	};
</script>

<style lang="less">
</style>
