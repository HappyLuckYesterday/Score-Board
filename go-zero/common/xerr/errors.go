package xerr

import "fmt"

type CodeError struct {
	errCode uint32
	errMsg  string
}

func (e *CodeError) GetErrorCode() uint32 {
	return e.errCode
}

func (e *CodeError) GetErrorMsg() string {
	return e.errMsg
}

func (e *CodeError) Error() string {
	return fmt.Sprintf("ErrCode: %d, ErrMsg: %s", e.errCode, e.errMsg)
}

func NewErrCodeMsg(errCode uint32, errMsg string) *CodeError {
	return &CodeError{errCode: errCode, errMsg: errMsg}
}

func NewErrCode(errCode uint32) *CodeError {
	return &CodeError{errCode: errCode, errMsg: MapErrMsg(errCode)}
}

func NewErrMsg(errMsg string) *CodeError {
	return &CodeError{errCode: ServerCommonError, errMsg: errMsg}
}
