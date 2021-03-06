CREATE DATABASE letmebeyourfriend;

CREATE TABLE users (
 id serial PRIMARY KEY,
 name VARCHAR(100),
 email VARCHAR(100) UNIQUE,
 password VARCHAR(100),
 googleId VARCHAR(100),
 image VARCHAR(300)
 );

CREATE TABLE profiles (
 id serial PRIMARY KEY,
 user_id int REFERENCES users(id),
 name VARCHAR(100),
 status VARCHAR(100),
 avatar VARCHAR(200),
 email VARCHAR(100)
 );

CREATE TABLE social (
 id serial PRIMARY KEY,
 user_id int REFERENCES users(id),
 following int REFERENCES users(id)
 );

CREATE TABLE posts (
 id serial PRIMARY KEY,
 user_id int REFERENCES users(id),
 text VARCHAR(100),
 image VARCHAR(200),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

CREATE TABLE comments (
 id serial PRIMARY KEY,
 user_id int REFERENCES users(id),
 post_id int REFERENCES posts(id),
 comment VARCHAR(200),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
CREATE INDEX "IDX_session_expire" ON "session" ("expire");

