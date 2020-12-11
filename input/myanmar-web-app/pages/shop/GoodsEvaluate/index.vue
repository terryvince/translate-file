<template>
	<view class="evaluate-con">
		<view class="goodsStyle acea-row row-between" v-if="orderCon.productInfo">
			<view class="pictrue">
				<image :src="orderCon.productInfo.image" class="image" />
			</view>
			<view class="text acea-row row-between">
				<view class="name line2">{{ orderCon.productInfo.storeName }}</view>
				<view class="money">
					<view>￥{{ orderCon.productInfo.price }}</view>
					<view class="num">x{{ orderCon.cartNum }}</view>
				</view>
			</view>
		</view>
		<view class="score">
			<view class="item acea-row row-middle" v-for="(item, scoreListIndexw) in scoreList" :key="scoreListIndexw">
				<view>{{ item.name }}</view>
				<view class="starsList">
					<text @click="stars(starsIndexn, scoreListIndexw)" v-for="(itemn, starsIndexn) in item.stars" :key="starsIndexn"
					 class="iconfont" :class="item.index >= starsIndexn ? 'icon-shitixing font-color-red': 'icon-kongxinxing'"></text>
				</view>
				<text class="evaluate">{{item.index === -1 ? "" : item.index + 1 + "မိနစ်"}}</text>
			</view>
			<view class="textarea">
				<textarea placeholder="ထုတ်ကုန်သည်သင်၏မျှော်လင့်ချက်များနှင့်ကိုက်ညီပါသလား။？မင်းရဲ့အကြံဥာဏ်တွေကိုပြောပြပါ，၀ ယ်ချင်သောသူတို့အားမျှဝေပါ~" v-model="expect"></textarea>
				<view class="list acea-row row-middle">
					<view class="pictrue" v-for="(item, uploadPicturesIndex) in uploadPictures" :key="uploadPicturesIndex">
						<image :src="item" />
						<text class="iconfont icon-guanbi1 font-color-red" @click="uploadPictures.splice(uploadPicturesIndex, 1)"></text>
					</view>
					<view class="pictrue uploadBnt acea-row row-center-wrapper row-column" @tap="chooseImage">
						<text class="iconfont icon-icon25201"></text>
						<view>ပုံတင်ရန်</view>
					</view>
				</view>
			</view>
			<view class="evaluateBnt bg-color-red" @click="submit">ယခုအဆင့်သတ်မှတ်ပါ</view>
		</view>
	</view>
</template>
<style scoped lang="less">
	.evaluate-con .score .textarea .list .pictrue.uploadBnt {
		border: 1px solid #ddd;
	}
</style>
<script>
	import {
		postOrderProduct,
		postOrderComment
	} from "@/api/store";
	import {
		trim,
		chooseImage
	} from "@/utils";
	import {
		VUE_APP_API_URL
	} from "@/config";
	import {
		required
	} from "@/utils/validate";
	import {
		validatorDefaultCatch
	} from "@/utils/dialog";

	const NAME = "GoodsEvaluate";

	export default {
		name: NAME,
		components: {
			// VueCoreImageUpload
		},
		props: {},
		data: function() {
			return {
				orderCon: {
					cartProduct: {
						productInfo: {}
					}
				},
				scoreList: [{
						name: "ကုန်ပစ္စည်းအရည်အသွေး",
						stars: ["", "", "", "", ""],
						index: -1
					},
					{
						name: "ဝန်ဆောင်မှုသဘောထား",
						stars: ["", "", "", "", ""],
						index: -1
					}
				],
				uploadPictures: [],
				expect: "",
				unique: ""
			};
		},
		mounted: function() {
			this.unique = this.$yroute.query.id;
			this.getOrderProduct();
		},
		watch: {
			$yroute(n) {
				if (n.name === NAME && this.unique !== n.params.id) {
					this.unique = n.params.id;
					this.$set(this.scoreList[0], "index", -1);
					this.$set(this.scoreList[1], "index", -1);
					this.expect = "";
					this.uploadPictures = [];
					this.getOrderProduct();
				}
			}
		},
		methods: {
			getOrderProduct: function() {
				let that = this,
					unique = that.unique;
				postOrderProduct(unique).then(res => {
					that.orderCon = res.data;
				});
			},
			stars: function(indexn, indexw) {
				this.scoreList[indexw].index = indexn;
			},
			chooseImage() {
				chooseImage(img => {
					this.uploadPictures.push(img);
				});
			},
			async submit() {
				console.log(this.scoreList)
				console.log(this.expect);
				const expect = trim(this.expect),
					product_score =
					this.scoreList[0].index + 1 === 0 ? "" : this.scoreList[0].index + 1,
					service_score =
					this.scoreList[1].index + 1 === 0 ? "" : this.scoreList[1].index + 1;
				try {
					await this.$validator({
						product_score: [
							required("ကျေးဇူးပြု၍ ထုတ်ကုန်အရည်အသွေးရမှတ်ကိုရွေးချယ်ပါ", {
								type: "number"
							})
						],
						service_score: [
							required("ကျေးဇူးပြုပြီးဝန်ဆောင်မှုသဘောထားရမှတ်ကိုရွေးချယ်ပါ", {
								type: "number"
							})
						]
					}).validate({
						product_score,
						service_score
					});
				} catch (e) {
					return validatorDefaultCatch(e);
				}
				var param = {
					productScore: product_score,
					serviceScore: service_score,
					unique: this.unique,
					pics: this.uploadPictures.join(","),
					comment: expect
				};
				postOrderComment(param)
					.then(() => {
						uni.showToast({
							title: "အောင်မြင်သောအကဲဖြတ်",
							icon: "success",
							duration: 2000
						});

						// ? ပြီးခဲ့သည့်စာမျက်နှာသို့ပြန်သွားပါ
						this.$yrouter.back();

						// ? ပုံမှန်အားဖြင့်အသေးစိတ်စာမျက်နှာသို့သွားပါ
						// this.$yrouter.push({
						// 	path: "/pages/order/OrderDetails/index",
						// 	query: {
						// 		id: this.orderCon.orderId
						// 	}
						// });

						// ? အသေးစိတ်စာမျက်နှာသို့ optional ကို redirect，ဤအချိန်တွင်ဘယ်ဘက်အပေါ်ထောင့်ရှိပင်မစာမျက်နှာသို့အိုင်ကွန်တစ်ခုပြန်လာလိမ့်မည်
						// this.$yrouter.reLaunch({
						// 	path: "/pages/home/index",
						// });
					})
					.catch(err => {
						uni.showToast({
							title: err.msg || err.response.data.msg || err.response.data.message,
							icon: "none",
							duration: 2000
						});
					});
			}
		}
	};
</script>
