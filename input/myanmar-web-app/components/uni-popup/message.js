export default {
	created() {
		if (this.type === 'message') {
			// မျက်နှာဖုံးမရှိပါ
			this.maskShow = false 
			// subcomponent အရာဝတ္ထုကိုရယူပါ
			this.childrenMsg = null
		}
	},
	methods: {
		customOpen() {
			if (this.childrenMsg) {
				this.childrenMsg.open()
			}
		},
		customClose() {
			if (this.childrenMsg) {
				this.childrenMsg.close()
			}
		}
	}
}
