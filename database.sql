
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- database: 'mn_women_press_app'


CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "access" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255) NOT NULL,
    "pronouns" VARCHAR (50),
    "expertise" VARCHAR (255),
    "photo" VARCHAR (500),
    "email" VARCHAR (255),
    "phone" VARCHAR (15),
    "billing_address" VARCHAR (255),
    "mailing_address" VARCHAR (255),
    "bio" VARCHAR (1000),
    "note" VARCHAR (1000),
    "linkedIn" VARCHAR (255),
    "twitter" VARCHAR (50),
    "instagram" VARCHAR (50),
    "facebook" VARCHAR (255),
    "date_added" DATE
);

CREATE TABLE "" (
    "id" SERIAL PRIMARY KEY,
);

CREATE TABLE "" (
    "id" SERIAL PRIMARY KEY,
);

CREATE TABLE "" (
    "id" SERIAL PRIMARY KEY,
);

CREATE TABLE "" (
    "id" SERIAL PRIMARY KEY,
);

CREATE TABLE "" (
    "id" SERIAL PRIMARY KEY,
);

CREATE TABLE "" (
    "id" SERIAL PRIMARY KEY,
);