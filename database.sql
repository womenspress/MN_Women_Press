
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

CREATE TABLE "story_tag" (
    "id" SERIAL PRIMARY KEY,
    "story_id" INT REFERENCES "story",
    "tag_id" INT REFERENCES "tag"
);

CREATE TABLE "theme" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "month" VARCHAR(10),
    "year" INT
);

CREATE TABLE "theme_story" (
    "id" SERIAL PRIMARY KEY,
    "story_id" INT REFERENCES "story",
    "theme_id" INT REFERENCES "theme"
);

CREATE TABLE "story_contact" (
	"id" SERIAL PRIMARY KEY,
    "story_id" INT REFERENCES "story",
    "contact_id" INT REFERENCES "contact",
    "project_association" VARCHAR (255),
    "invoice_paid" BOOLEAN DEFAULT FALSE,
    "invoice_total" DECIMAL (12,2)
);

ALTER TABLE "story"
DROP COLUMN "archived";

ALTER TABLE "story"
ADD "photo_required" BOOLEAN DEFAULT FALSE,
ADD "fact_check_required" BOOLEAN DEFAULT FALSE,
ADD "graphic_image_completed" BOOLEAN DEFAULT FALSE;

--story_contact--
----story_contact_story_id_fkey
ALTER TABLE story_contact
DROP CONSTRAINT story_contact_story_id_fkey;

ALTER TABLE story_contact
ADD CONSTRAINT story_contact_story_id_fkey
FOREIGN KEY (story_id)
REFERENCES story(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

----story_contact_contact_id_fkey
ALTER TABLE story_contact
DROP CONSTRAINT story_contact_contact_id_fkey;

ALTER TABLE story_contact
ADD CONSTRAINT story_contact_contact_id_fkey
FOREIGN KEY (contact_id)
REFERENCES contact(id)
ON DELETE CASCADE ON UPDATE NO ACTION;
--

--contact_role--
----contact_role_contact_id_fkey
ALTER TABLE contact_role
DROP CONSTRAINT contact_role_contact_id_fkey;

ALTER TABLE contact_role
ADD CONSTRAINT contact_role_contact_id_fkey
FOREIGN KEY (contact_id)
REFERENCES contact(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

----contact_role_role_id_fkey
ALTER TABLE contact_role
DROP CONSTRAINT contact_role_role_id_fkey;

ALTER TABLE contact_role
ADD CONSTRAINT contact_role_role_id_fkey
FOREIGN KEY (role_id)
REFERENCES "role"(id)
ON DELETE CASCADE ON UPDATE NO ACTION;
--


--story_tag--
----story_tag_tag_id_fkey
ALTER TABLE story_tag
DROP CONSTRAINT story_tag_tag_id_fkey;

ALTER TABLE story_tag
ADD CONSTRAINT story_tag_tag_id_fkey
FOREIGN KEY (tag_id)
REFERENCES tag(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

----story_tag_story_id_fkey
ALTER TABLE story_tag
DROP CONSTRAINT story_tag_story_id_fkey;

ALTER TABLE story_tag
ADD CONSTRAINT story_tag_story_id_fkey
FOREIGN KEY (story_id)
REFERENCES story(id)
ON DELETE CASCADE ON UPDATE NO ACTION;
--

--tag_contact--
----tag_contact_tag_id_fkey
ALTER TABLE tag_contact
DROP CONSTRAINT tag_contact_tag_id_fkey;

ALTER TABLE tag_contact
ADD CONSTRAINT tag_contact_tag_id_fkey
FOREIGN KEY (tag_id)
REFERENCES tag(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

----story_tag_story_id_fkey
ALTER TABLE tag_contact
DROP CONSTRAINT tag_contact_contact_id_fkey;

ALTER TABLE tag_contact
ADD CONSTRAINT tag_contact_contact_id_fkey
FOREIGN KEY (contact_id)
REFERENCES contact(id)
ON DELETE CASCADE ON UPDATE NO ACTION;
--

--theme_story--
----theme_story_theme_id_fkey
ALTER TABLE theme_story
DROP CONSTRAINT theme_story_theme_id_fkey;

ALTER TABLE theme_story
ADD CONSTRAINT theme_story_theme_id_fkey
FOREIGN KEY (theme_id)
REFERENCES theme(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

----theme_story_story_id_fkey
ALTER TABLE theme_story
DROP CONSTRAINT theme_story_story_id_fkey;

ALTER TABLE theme_story
ADD CONSTRAINT theme_story_story_id_fkey
FOREIGN KEY (story_id)
REFERENCES story(id)
ON DELETE CASCADE ON UPDATE NO ACTION;
--

ALTER TABLE contact
ADD CONSTRAINT date_added_dt_def
DEFAULT GETDATE() FOR date_added;

ALTER TABLE contact
ADD COLUMN date_added DATE
;