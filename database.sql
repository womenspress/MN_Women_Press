
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


/* Dummy Data for project */ 

/*Themes*/ 
INSERT INTO "theme"
("name", "description", "month", "year")  
VALUES 
('Mentors', '	
An exploration of intergenerational relationships between people who support one another in work and life. Featuring the voices of those in farming, politics, education, and more. Special sections: Pets, Camp & Kids', 'January', 2023), 
('Books', '	
Excerpts and conversations with new and established Minnesota authors. Special sections: Money & Business, Education & Learning', 'February', 2023), 
('Defusing Toxic Masculinity', '	
How to improve public safety — from dismantling rape culture to fighting sex trafficking and intimate partner violence. Based on a series of Changemakers Alliance conversations and community-submitted stories. Special sections: Elder, Camp & Kids', 'March', 2023), 
('Under 30', '	
People under 30 share their joys and concerns, and lead this special issue. Special sections: Healing, Home & Garden', 'April', 2023),
('Values & Vision', '	
Urban and rural people in conversation about their passions, especially as creative artists. Special sections: Travel & Adventure, Camp & Kids, Readers Recommend', 'May', 2023),
('Reproductive Justice', '	
One year after the fall of Roe, how is Minnesota performing as a “safe haven” for abortion care? What steps remain to ensure access to reproductive care for all? Special sections: Elder, Home & Garden', 'June', 2023),
('Main Street', '	
How BIPOC entrepreneurs are revitalizing Minnesota communities, based on a series of CALL conversations and submitted stories. Special sections: Buy Local, Pets', 'July', 2023),
('River Stories', '	
This breezy issue will share stories from along the banks of the Mighty Mississippi.
Special sections: Healing, Education & Learning', 'August', 2023),
('Work', '	
The ways our work lives are shifting — including the role of labor unions, anti-racist movements in the workplace, and changing family leave practices.
Special sections: Directory, Elder, Travel & Adventure', 'September', 2023),
('The Land Remembers', '	
How are sites of atrocities in Minnesota becoming sites of reconciliation and healing? Stories about those who are working to ensure that history is not erased. Special sections: Money & Business, Nonprofit', 'October', 2023), 
('Child Welfare', '	
From American Indian boarding schools to the modern day foster care system, “child welfare” has a tangled history. We trace roots and learn what is being done in Minnesota to better support kids.
Special sections: Holiday, Pets', 'November', 2023),
('Changemakers', '	
Our annual issue focused on 10 people and organizations who made change in 2023 around equity, justice, and self-determination for women and children.
Special sections: Healing, Holiday', 'December', 2023);



/*Stories */
INSERT INTO "story"
("title","notes", "date_added")  
VALUES 
('Why Books saved my life', 'Personal story, sent in by reader', '02/02/2023'),
('Publishing and how it is changing', 'How the advent of online publishing has changed company mindsets', '01/30/2023'),
('Book arts', 'Minneapolis Center for Book Arts and publishing story', '01/01/2023'), 
('The future of Healthcare', 'How healthcare is changing', '01/20/2023'), 
('Why 30 is the new 20', 'A conversation about what age means and what we expect from turning 30', '01/15/2023'), 
('Why does the Mississippi look different?', 'Climate change and how it effects us right here in MN', '09/30/2022');

INSERT INTO "theme_story"
("story_id", "theme_id")
VALUES 
(1,2), 
(3,2), 
(2,1); 

/*Contacts*/ 

INSERT INTO "contact" 
("name", "email") 
VALUES 
('Mikki Morrissette', 'editor@womenspress.com'),
('Sarah Whiting', 'sarah@womenspress.com'),
('Lydia Moran', 'Lydia@womenspress.com');

INSERT INTO "story_contact" 
("story_id", "contact_id") 
VALUES 
(1, 1), 
(1,2), 
(2,3);

/* Tags */ 

INSERT INTO "tag" 
("name", "description") 
VALUES 
('Education', 'All things learning and teaching in MN'),
('Healthcare', 'Everything from the system, to experiences with it.'), 
('Homelessness', 'Possible future publication idea'), 
('Art', 'All the contacts/ experts related to art'), 
('Editing', 'All editing contacts'); 

INSERT INTO "story_tag"
("story_id", "tag_id")
VALUES 
(1,2),
(4,2);


INSERT INTO "tag_contact"
("contact_id", "tag_id")
VALUES 
(1,5), 
(2,4);

/*Role*/ 
INSERT INTO "role"
(name)
VALUES 
('Photographer'), 
('Illustrator'), 
('Editor'), 
('Expert'), 
('Fact Checker'), 
('Printers'); 

INSERT INTO "contact_role"
("contact_id","role_id")
VALUES
(2,1) 
(1, 3); 