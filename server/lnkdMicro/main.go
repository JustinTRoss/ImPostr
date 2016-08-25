package main

import (
    "log"
    "net/http"
)

func main() {
    router()
    log.Fatal(http.ListenAndServe(":8081", nil))
}
