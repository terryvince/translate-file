<template>
	<view class="recommend" ref="container">
		<view class="title acea-row row-center-wrapper">
			<text class="iconfont icon-zhuangshixian"></text>
			<text class="name">သင့်ကိုအကြံပြုပါသည်</text>
			<text class="iconfont icon-zhuangshixian lefticon"></text>
		</view>
		<view class="recommendList acea-row row-between-wrapper">
			<view
				@click="routerGo(item)"
				class="item"
				v-for="(item, recommendIndex) in hostProduct"
				:key="recommendIndex"
			>
				<view class="pictrue"><image :src="item.image" class="image" /></view>
				<view class="name line1">{{ item.storeName }}</view>
				<view class="money font-color-red">
					￥
					<text class="num">{{ item.price }}</text>
				</view>
			</view>
		</view>
		<Loading :loaded="loadend" :loading="loading"></Loading>
	</view>
</template>
<script>
import { getHostProducts } from '@/api/store';
import Loading from '@/components/Loading';
export default {
	name: 'Recommend',
	props: {},
	components: {
		Loading
	},
	data: function() {
		return {
			hostProduct: [],
			page: 1,
			limit: 20,
			loadTitle: '',
			loading: false,
			loadend: false
		};
	},
	mounted: function() {
		this.hostProducts();
	},
	methods: {
		routerGo(item) {
			this.$yrouter.push({ path: '/pages/shop/GoodsCon/index', query: { id: item.id } });
		},
		hostProducts: function() {
			let that = this;
			if (that.loading) return; //လာမည့်တောင်းဆိုမှုကိုပိတ်ပါ（falseတောင်းဆိုမှုတစ်ခုလုပ်နိုင်ပါတယ်）；
			if (that.loadend) return; //လက်ရှိတောင်းဆိုမှုကိုအဆုံးသတ်ခြင်းကိုတားဆီးပါ（falseတောင်းဆိုမှုတစ်ခုလုပ်နိုင်ပါတယ်）；
			that.loading = true;
			getHostProducts(that.page, that.limit).then(res => {
				that.loading = false;
				//apply();jsarray တစ်ခုကိုအခြား array ထဲသို့ထည့်ပါ;
				that.hostProduct.push.apply(that.hostProduct, res.data);
				that.loadend = res.data.length < that.limit; //ဒေတာအားလုံး loaded ရှိမရှိဆုံးဖြတ်ပါ；
				that.page = that.page + 1;
			});
		}
	},
	onReachBottom() {
		!this.loading && this.hostProducts();
	}
};
</script>
