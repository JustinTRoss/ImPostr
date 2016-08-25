package main

import (
  "net/http"
)

func router() {
  http.HandleFunc("/linkedin", ImmediateLNKDRequest)
}
