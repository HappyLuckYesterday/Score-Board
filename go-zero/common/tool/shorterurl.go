package tool

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
)

// ShorterURL is a tool to shorten URL
type EncurtadorResp struct {
	UrlEncurtada string `json:"urlEncurtada"`
}

func ShorterUrl(longUrl string) (shorterUrl string, err error) {
	//req body
	reqBody := map[string]string{
		"url": longUrl,
	}
	reqJSON, err := json.Marshal(reqBody)
	if err != nil {
		return
	}
	///http client to https://api.encurtador.dev/encurtamentos
	req, err := http.NewRequest("POST", "https://api.encurtador.dev/encurtamentos", bytes.NewBuffer(reqJSON))
	if err != nil {
		return
	}
	req.Header.Add("Content-Type", "application/json")

	//send request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return
	}
	defer resp.Body.Close()
	body, _ := io.ReadAll(resp.Body)
	var encurtadorResp EncurtadorResp
	err = json.Unmarshal(body, &encurtadorResp)
	if err != nil {
		return
	}
	return encurtadorResp.UrlEncurtada, nil
}
