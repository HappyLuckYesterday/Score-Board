package tool

import (
	"crypto/hmac"
	"crypto/md5"
	"crypto/sha256"
	"encoding/hex"
	"errors"
)

const secret = "ssc.com"

func Md5ByBytes(data []byte) (result string) {
	h := md5.New()
	h.Write([]byte(secret))
	h.Write([]byte(data))
	return hex.EncodeToString(h.Sum(nil))
}

func SignatureCompare(data []byte, signature string) bool {
	h := md5.New()
	h.Write([]byte("asiafarmz.com"))
	h.Write([]byte(data))
	s := hex.EncodeToString(h.Sum(nil))
	return s == signature
}

func GenerateHMAC(message, secretKey string) string {
	if secretKey == "" {
		secretKey = secret
	}
	h := hmac.New(sha256.New, []byte(secretKey))
	h.Write([]byte(message))
	return hex.EncodeToString(h.Sum(nil))
}

func DecodeHMAC(message, secretKey, receivedHMAC string) (bool, error) {
	if secretKey == "" {
		secretKey = secret
	}

	h := hmac.New(sha256.New, []byte(secretKey))
	h.Write([]byte(message))
	expectedHMAC := hex.EncodeToString(h.Sum(nil))

	if expectedHMAC != receivedHMAC {
		return false, errors.New("HMAC verification failed")
	}
	return true, nil
}
