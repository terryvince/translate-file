/*
 * 订单确认
 * */
import request from "@/utils/request";

/**
 * @param {Object} data
 */
export function postReceiptConfirm(data) {
	return request.post("/yxStoreReceipt/create", data);
}

export function getReceiptDetail(orderId) {
	return request.get("/yxStoreReceipt/getDetail",{
		orderId:orderId,
		login: true
	});
}

export function getSendEmail(orderId,email) {
	return request.get("/yxStoreReceipt/sendEmail",{
		orderId:orderId,
		email:email,
		login: true
	});
}