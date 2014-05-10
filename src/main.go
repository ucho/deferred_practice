package main

import (
	"net/http"

	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
)

func main() {
	m := martini.Classic()

	m.Use(func(res http.ResponseWriter, req *http.Request) {
		res.Header().Set("Access-Control-Allow-Origin", "*")
	})

	m.Use(render.Renderer())

	count := 0
	m.Get("/", func(r render.Render) {
		if count < 5 {
			r.JSON(200, map[string]interface{}{"status":"processing"})
		} else {
			r.JSON(200, map[string]interface{}{"status":"completed", "num":7})
		}
		count++
	})

	m.Run()
}
