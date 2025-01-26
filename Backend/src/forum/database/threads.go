package database
import (
	"net/http"
	"encoding/json"
	"time"
	"strconv"
	_ "github.com/lib/pq"
)

type Thread struct {
	Author string `json:"author"`
	ThreadID int `json:"threadID"`
    Created time.Time
    Title string `json:"title"`
    Content string `json:"content"`
    Likes int
    ImageData []byte `json:"imageData"`
    ThreadTopic int `json:"threadTopic"`
}

func GetThread(w http.ResponseWriter, r *http.Request){
	var threadID string
	var thread Thread
	threadID = r.URL.Query().Get("threadID")
	id, requestError := strconv.Atoi(threadID)
	requestError = DatabaseConnect.QueryRow("SELECT * FROM Threads WHERE threadID = $1", id).Scan(&thread.ThreadID, &thread.Author, &thread.Created, &thread.Title, &thread.Content, &thread.Likes, &thread.ImageData, &thread.ThreadTopic)
	
	if requestError != nil {
		http.Error(w, "Error: ", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(thread)
}

func CreateThread(w http.ResponseWriter, r *http.Request){
	var thread Thread
	requestError := json.NewDecoder(r.Body).Decode(&thread)
	if requestError != nil {
		//decode error
		http.Error(w, "Error decoding JSON", http.StatusBadRequest)
		return
	}	
	
	_, requestError  = DatabaseConnect.Exec("INSERT INTO Threads (author, title, content, imageData, threadTopic) VALUES ($1, $2, $3, $4, $5)", thread.Author, thread.Title, thread.Content, thread.ImageData, thread.ThreadTopic)

	if requestError != nil {
		http.Error(w, "Error during updating thread", http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("success")
}

func EditThread(w http.ResponseWriter, r *http.Request){
	var thread Thread
	requestError := json.NewDecoder(r.Body).Decode(&thread)
	if requestError != nil {
		//decode error
		http.Error(w, "Error decoding JSON", http.StatusBadRequest)
		return
	}	

	_, requestError  = DatabaseConnect.Exec("UPDATE Threads SET content = ($1) WHERE threadID = ($2)", 
											thread.Content, thread.ThreadID)

	if requestError != nil {
		http.Error(w, "Error during updating thread", http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("success")
}

func DeleteThread(w http.ResponseWriter, r *http.Request){
	var threadID string
	threadID = r.URL.Query().Get("threadID")
	id, requestError := strconv.Atoi(threadID)

	var deleteFeedback string
	deleteFeedback = "This thread has been deleted"
	_, requestError = DatabaseConnect.Exec("UPDATE Threads SET content = ($1) WHERE threadID = ($2)", 
											deleteFeedback, id)

	if requestError != nil {
		http.Error(w, "Error during deleting thread", http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("success")
}