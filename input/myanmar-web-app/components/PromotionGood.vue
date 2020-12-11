<template>
	<view class="promotionGood" v-if="benefit.length > 0">
		<view class="item acea-row row-between-wrapper" v-for="(item, promotionGoodIndex) in benefit" :key="promotionGoodIndex" @click="routerGo(item)">
			<view class="pictrue"><image :src="item.image" class="image" /></view>
			<view class="text">
				<view class="name line1">{{ item.storeName }}</view>
				<view class="sp-money acea-row">
					<view class="moneyCon">
						ရောင်းဈေး: ￥
						<text class="num">{{ item.price }}</text>
					</view>
				</view>
				<view class="acea-row row-between-wrapper">
					<view class="money">နေ့စဉ်စျေးနှုန်း：￥{{ item.otPrice }}</view>
					<view>left သာ：{{ item.stock }}{{ item.unitName }}</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	name: 'PromotionGood',
	props: ['benefit'],
	data: function() {
		return {};
	},
	methods: {
		routerGo(item) {
			this.$yrouter.push({ path: '/pages/shop/GoodsCon/index', query: { id: item.id } });
		}
	},
	mounted() {
	}
};
</script>
