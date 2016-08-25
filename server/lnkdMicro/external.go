package main

import (
    "fmt"
    "net/http"
    "encoding/json"
    "io/ioutil"
    "bytes"
)

type LinkedInCall struct {
  Comment string
  Content map[string]string
  Visibility map[string]string
}

func RequestLinkedIn(m *Message) []byte {
  cont := map[string]string{
    "title": "Hack Reactor and You",
    "description": "pillows",
    "submitted-url": m.MessageURL,
    "submitted-image-url": "https://golang.org/doc/gopher/frontpage.png",
  }

  vis := map[string]string{
    "code": "anyone",
  }

  bod := LinkedInCall{
    "Pillow Talk",
    cont,
    vis,
  }

  b := new(bytes.Buffer)
  json.NewEncoder(b).Encode(bod)

  url := `https://api.linkedin.com/v1/people/~/shares?oauth2_access_token=`+m.Token+`&format=json`
  req, err := http.NewRequest("POST", url, b)
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("x-li-format", "json")

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    fmt.Println(err.Error())
  }
  defer resp.Body.Close()

  fmt.Println("response Status: ", resp.Status)
  fmt.Println("response Headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("response Body:", string(body))
  return body;
}
