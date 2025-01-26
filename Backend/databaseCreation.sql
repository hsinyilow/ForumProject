--user table
CREATE TABLE Users (
    userID SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL
);

--thread table
CREATE TABLE Threads (
    threadID SERIAL PRIMARY KEY,
    author VARCHAR(255) NOT NULL,
    created TIMESTAMP DEFAULT current_timestamp,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    likes INT DEFAULT 0,
    imageData BYTEA,
    threadTopic INT NOT NULL
);

--topic table (for threads topic)
CREATE TABLE Topics (
    topicID SERIAL PRIMARY KEY,
    topicName VARCHAR(255) UNIQUE NOT NULL
);

--user replies
CREATE TABLE Replies (
    authorID INT NOT NULL,
    created TIMESTAMP DEFAULT current_timestamp,
    threadID INT NOT NULL,
    content TEXT NOT NULL,
    PRIMARY KEY(authorID, threadID, created)
);

--likes table
CREATE TABLE Likes (
    userID INT NOT NULL,
    threadID INT NOT NULL,
    PRIMARY KEY(userID, threadID)
);