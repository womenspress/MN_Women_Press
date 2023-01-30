
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

CREATE TABLE "contact" (
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

CREATE TABLE "contact_role" (
    "id" SERIAL PRIMARY KEY,
    "contact_id" INT REFERENCES "contact",
    "role_id" INT REFERENCES "role"
);

CREATE TABLE "role" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (50)
);

CREATE TABLE "tag" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255),
    "description" VARCHAR (255)
);

CREATE TABLE "tag_contact" (
    "id" SERIAL PRIMARY KEY,
    "tag_id" INT REFERENCES "tag",
    "contact_id" INT REFERENCES "contact"
);

CREATE TABLE "story" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR (255) NOT NULL,
    "subtitle" VARCHAR (255),
    "article_text" VARCHAR,
    "article_link" VARCHAR (350),
    "notes" VARCHAR,
    "type" VARCHAR,
    "copies_sent" BOOLEAN DEFAULT FALSE,
    "photo_uploaded" BOOLEAN DEFAULT FALSE,
    "fact_checked" BOOLEAN DEFAULT FALSE,
    "graphic_image_required" BOOLEAN DEFAULT FALSE,
    "external_link" VARCHAR (350),
    "word_count" INT,
    "date_added" DATE,
    "rough_draft_deadline" DATE,
    "final_draft_deadline" DATE,
    "publication_date" DATE,
    "archived" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "" (
    "id" SERIAL PRIMARY KEY,
);