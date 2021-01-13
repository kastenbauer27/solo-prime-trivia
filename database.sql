
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR (80),
    "image_url" VARCHAR (200)
);

CREATE TABLE "trivia_game" (
	"id" SERIAL PRIMARY KEY,
	"score" INT NOT NULL,
	"user_id" INT REFERENCES "user"
);

CREATE TABLE "trivia_questions" (
	"id" SERIAL PRIMARY KEY,
	"question" VARCHAR(2000) NOT NULL,
	"game_id" INT REFERENCES trivia_game
);

CREATE TABLE "trivia_answers" (
	"id" SERIAL PRIMARY KEY,
	"answer" VARCHAR(200) NOT NULL,
	"is_correct" BOOLEAN NOT NULL,
	"question_id" INT REFERENCES trivia_questions
);

-- tables can be dropped in this order without issues
DROP TABLE "trivia_answers";
DROP TABLE "trivia_questions";
DROP TABLE "trivia_game";
DROP TABLE "user";