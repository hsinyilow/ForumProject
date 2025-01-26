package database

import (
	"database/sql"
	"fmt"
	"log"
	_ "github.com/lib/pq"
)

var DatabaseConnect *sql.DB

func Connect() {
	dsn := "user=postgres password=main dbname=Forum sslmode=disable"
	
	var err error
	DatabaseConnect, err = sql.Open("postgres", dsn)
	
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to database")
}

