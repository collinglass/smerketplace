package main

import (
	//"encoding/json"
	"fmt"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"io"
	"log"
	"net/http"
	"os"
	"path"
)

func ListHandler(w http.ResponseWriter, r *http.Request) {
	// open input file

	w.Header().Set("Content-Type", "application/json")
	dir, file := path.Split(r.URL.String())
	fmt.Printf("Path: %v File: %v\n", dir, file)

	filepath := "./api/v0.1/" + file + "/" + file + ".json"

	fmt.Printf(filepath)

	fi, err := os.Open(filepath)
	if err != nil {
		panic(err)
	}
	// close fi on exit and check for its returned error
	defer func() {
		if err := fi.Close(); err != nil {
			panic(err)
		}
	}()

	// make a buffer to keep chunks that are read
	buf := make([]byte, 1024)
	for {
		// read a chunk
		n, err := fi.Read(buf)
		if err != nil && err != io.EOF {
			panic(err)
		}
		if n == 0 {
			break
		}

		// write a chunk
		if _, err := w.Write([]byte(buf[:n])); err != nil {
			panic(err)
		}
	}
}

func main() {
	log.Println("Starting Server")

	r := mux.NewRouter()
	r.HandleFunc("/api/items", ListHandler).Methods("GET")
	r.HandleFunc("/api/users", ListHandler).Methods("GET")
	r.HandleFunc("/api/shops", ListHandler).Methods("GET")
	r.HandleFunc("/api/addresses", ListHandler).Methods("GET")
	r.HandleFunc("/api/creditcards", ListHandler).Methods("GET")

	http.Handle("/api/", r)
	http.Handle("/", logHandler(http.FileServer(http.Dir("../app/"))))

	log.Println("Listening...")
	panic(http.ListenAndServe(":8080", nil))
}

func logHandler(h http.Handler) http.Handler {
	return handlers.LoggingHandler(os.Stdout, h)
}
