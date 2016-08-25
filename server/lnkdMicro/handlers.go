package main

import (
    "fmt"
    "net/http"
    "encoding/json"
)

type Message struct {
  MessageURL string
  Token string
}

func ImmediateLNKDRequest(w http.ResponseWriter, r *http.Request) {
    var msg Message
    err := json.NewDecoder(r.Body).Decode(&msg)
    // create new decoder from input stream (in this case, r.body)
    // decode and store the error (if applicable)
    // notice that we pass &msg because this will convert the msg value
    buf, _ := json.Marshal(r.FormValue("secret"))
    // secret from form
    // json.Marshal returns JSON'd values as a slice of bytes
    // second return value would have been err from marshaling

    if r.FormValue("secret") != "mattdubiesucks123" {
      http.Error(w, `wrong secret!`, http.StatusBadRequest)
    } else if err != nil {
      http.Error(w, err.Error(), 400)
    } else {
      fmt.Println(msg)
      lnkdres := RequestLinkedIn(&msg)
      // resp := RequestLinkedIn(&msg)
      // json.NewEncoder(w).Encode(resp)
      fmt.Println(string(buf))
      w.Write(lnkdres); // Write accepts a slice of bytes
    }
}
