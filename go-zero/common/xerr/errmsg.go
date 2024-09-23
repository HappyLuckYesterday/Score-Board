package xerr

var message map[uint32]string

func init() {
	message = make(map[uint32]string)
	message[OK] = "ok"
	message[ServerCommonError] = "server common error"
	message[RequestParamError] = "request param error"
	message[TokenExpireError] = "token expire error"
	message[TokenGenerateError] = "token generate error"
	message[DBError] = "db error"
	message[DBUpdateAffectedZeroError] = "db update affected zero error"
	message[UniqueIDGenerateError] = "unique id generate error"
	message[UserIDEmpty] = "user id empty"
	message[RecordNotExits] = "record not exits"
	message[NoDeliveryZone] = "no delivery zone"
	message[SignatureError] = "signature error"
	message[Unauthorized] = "unauthorized"
	message[InvalidDiscountCode] = "invalid discount code"
	message[RecordExits] = "record exits"
}

func MapErrMsg(errorCode uint32) string {
	if msg, ok := message[errorCode]; ok {
		return msg
	} else {
		return message[ServerCommonError]
	}
}

func IsCodeErr(errorCode uint32) bool {
	if _, ok := message[errorCode]; ok {
		return true
	} else {
		return false
	}
}
