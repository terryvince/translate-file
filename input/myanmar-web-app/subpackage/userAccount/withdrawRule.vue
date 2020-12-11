<style>
	.content{
		width: 100%;
		height: 100%;
		/* background-color: #0000FF; */
	}
</style>


<template>
	<view class="content">
		<rich-text :nodes="content"></rich-text>
	</view>
</template>

<script>
	import {
		getRuleWitTypeApi
	} from "@/api/user";
	export default {
		data() {
			return {
				content: ""
			}
		},
		
		onShow() {
			console.log("getRuleWitTypeApi");
			getRuleWitTypeApi("1")
				.then((result) => {
					this.content = result.data.cashOut;
				}).catch(() => {});
		},
		methods: {

		},
	}
</script>
