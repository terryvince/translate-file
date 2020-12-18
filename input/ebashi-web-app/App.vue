<script>
	export default {
		onLaunch: function(options) {
			uni.loadFontFace({
				family: 'HanSans',
				  source: 'url("https://res.sdebs.com/HanSans.ttf")',
				  success() {
				      console.log('加载字体成功！')
				  },
				  fail(err) {
				  	console.error(err)
				  }
			})
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {

			console.log('App Hide')
		}
	}
</script>


<style lang="less">
	/*每个页面公共css */
	@import "animate.css";
	@import "./assets/iconfont/iconfont.css";
	@import "./assets/iconfont/iconfont1.css";
	@import "./assets/css/base.less";
	@import "./assets/css/reset.less";
	@import "./assets/css/style.less";
	@import "./assets/css/common.less";
	@import "./assets/css/flex.less";
	@import "./assets/css/public.less";
</style>
