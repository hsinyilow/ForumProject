package database

import (
	"database/sql"
	"net/http"
	"encoding/json"
	_ "github.com/lib/pq"
)

type User struct {
	Username string `json:"username"`
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	var currentUser User
	requestError := json.NewDecoder(r.Body).Decode(&currentUser)
	if requestError != nil {
		//decode error
		http.Error(w, "Error decoding JSON", http.StatusBadRequest)
		return
	}

	requestError = DatabaseConnect.QueryRow("SELECT * FROM Users WHERE username = $1", currentUser.Username).Scan()
	
	if(requestError == nil) {
		//user exists
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode("user exists")
	}

	_, requestError  = DatabaseConnect.Exec("INSERT INTO Users (username) VALUES ($1)", currentUser.Username)

	if requestError != nil {
		http.Error(w, "Error during database insertion", http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("success")
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	var username string
	var userID int
	username = r.URL.Query().Get("username")
	requestError := DatabaseConnect.QueryRow("SELECT userID FROM Users WHERE username = $1", username).Scan(&userID)
	if requestError != nil {
		//no user found
		if requestError == sql.ErrNoRows {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(map[string]int{"userID": -1})
		} else {
			http.Error(w, "Error: ", http.StatusInternalServerError)
		}
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]int{"userID": userID})
}