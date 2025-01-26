package main

import (
	"net/http"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"fmt"
	"github.com/go-chi/cors"
	"forum/database"
	_ "github.com/lib/pq"
)

func main() {
	fmt.Println("Running")
	r := chi.NewRouter()

	// Apply CORS middleware
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"}, // The Vite frontend URL
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders: []string{"Content-Type"},
	}))

	database.Connect()
	defer database.DatabaseConnect.Close()

	r.Use(middleware.Logger)

	r.Get("/user", database.GetUser)
	r.Post("/user", database.CreateUser)

	http.ListenAndServe(":5174", r)
}