<template>
	<web-view :src="url"></web-view>
</template>

<script>
	export default {
		created(option){
			this.url = option.href||''
		},
		data() {
			return {
				url:''
			};
		}
	}
</script>