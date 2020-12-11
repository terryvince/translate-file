// import {
//   Confirm as confirm,
//   Alert as alert,
//   Toast as toast,
//   Notify as notify,
//   Loading as loading
// } from "vue-ydui/dist/lib.rem/dialog";

// import Dialog from "../../static/vant-weapp/dialog/dialog";
// import notify from "../../static/vant-weapp/notify/notify";

const dialog = {
	confirm: (options) => {
		uni.showModal({
			title: 'ချက်ချင်း',
			content: options.mes,
			success(res) {
				if (res.confirm) {
					options.opts()
				} else if (res.cancel) {}
			}
		})
	},
	alert: null,
	// alert: Dialog.alert,
	notify: null,
	// notify,
	loading: {
		open: () => {
			// uni.showLoading({
			// 	title: 'တင်နေသည်'
			// })
		},
		close: () => {
			uni.hideLoading()
		}
	}
};

// const icons = { error: "စစ်ဆင်ရေးမအောင်မြင်ပါ", success: "အောင်မြင်သောစစ်ဆင်ရေး" };
// Object.keys(icons).reduce((dialog, key) => {
//   dialog[key] = (mes, obj = {}) => {
//     return new Promise(function (resolve) {
//       toast({
//         mes: mes || icons[key],
//         timeout: 1000,
//         icon: key,
//         callback: () => {
//           resolve();
//         },
//         ...obj
//       });
//     });
//   };
//   return dialog;
// }, dialog);

dialog.message = (mes = "စစ်ဆင်ရေးမအောင်မြင်ပါ", obj = {}) => {
	return new Promise(function(resolve) {
		uni.showToast({
			title: mes,
			icon: "none",
			duration: 2000,
			complete: () => {
				resolve();
			}
		});
	});
};

dialog.toast = (options) => {
	uni.showToast({
		title: options.mes,
		icon: "none",
		duration: 2000,
		complete: () => {
			options.callback ? options.callback() : null
		}
	});
};

dialog.error = (mes) => {
	uni.showToast({
		title: mes,
		icon: "none",
		duration: 2000
	});
};

dialog.validateError = (...args) => {
	validatorDefaultCatch(...args);
};

export function validatorDefaultCatch(err, type = "message") {
	uni.showToast({
		title: err.errors[0].message,
		icon: 'none',
		duration: 2000
	})
	return false
}

export default dialog;
