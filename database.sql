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
    "date_added" DATE DEFAULT CURRENT_DATE /*Can we have this populate?*/
);


CREATE TABLE "role" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (50)
);
CREATE TABLE "contact_role" (
    "id" SERIAL PRIMARY KEY,
    "contact_id" INT REFERENCES "contact"(id) ON DELETE CASCADE,
    "role_id" INT REFERENCES "role"(id)ON DELETE CASCADE
);

CREATE TABLE "tag" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255),
    "description" VARCHAR (255)
);

CREATE TABLE "tag_contact" (
    "id" SERIAL PRIMARY KEY,
    "tag_id" INT REFERENCES "tag"(id) ON DELETE CASCADE,
    "contact_id" INT REFERENCES "contact"(id) ON DELETE CASCADE
);

CREATE TABLE "story" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR (255) NOT NULL,
    "subtitle" VARCHAR (255),
    "article_text" VARCHAR,
    "article_link" VARCHAR (350),
    "notes" VARCHAR,
    "photo" VARCHAR, /*Do we have any idea what we are doing for this process?*/
    "type" VARCHAR,
    "copies_required" BOOLEAN DEFAULT FALSE,
    "number_of_copies" INT, 
    "copies_sent" BOOLEAN DEFAULT FALSE,
    "photo_required" BOOLEAN DEFAULT FALSE , 
    "photo_uploaded" BOOLEAN DEFAULT FALSE,
    "fact_check_required" BOOLEAN DEFAULT FALSE, 
    "fact_check_completed" BOOLEAN DEFAULT FALSE,
    "graphic_image_required" BOOLEAN DEFAULT FALSE,
    "graphic_image_completed" BOOLEAN DEFAULT FALSE,
    "payment_required" BOOLEAN DEFAULT FALSE, 
    "payment_completed" BOOLEAN DEFAULT FALSE, 
    "external_link" VARCHAR (350),
    "word_count" INT,
    "date_added" DATE DEFAULT CURRENT_DATE,
    "rough_draft_deadline" DATE,
    "final_draft_deadline" DATE,
    "publication_date" DATE
);


CREATE TABLE "story_tag" (
    "id" SERIAL PRIMARY KEY,
    "story_id" INT REFERENCES "story"(id) ON DELETE CASCADE,
    "tag_id" INT REFERENCES "tag"(id) ON DELETE CASCADE
);

CREATE TABLE "theme" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "month_year" DATE
);

CREATE TABLE "theme_story" (
    "id" SERIAL PRIMARY KEY,
    "story_id" INT REFERENCES "story"(id) ON DELETE CASCADE,
    "theme_id" INT REFERENCES "theme"(id) ON DELETE CASCADE
);

CREATE TABLE "story_contact" (
	"id" SERIAL PRIMARY KEY,
    "story_id" INT REFERENCES "story"(id) ON DELETE CASCADE,
    "contact_id" INT REFERENCES "contact"(id) ON DELETE CASCADE,
    "story_association" VARCHAR (255),
    "invoice_paid" BOOLEAN DEFAULT FALSE,
    "invoice_amount" DECIMAL (12,2) 
);

/* Dummy Data for project */ 

/*Themes*/ 
INSERT INTO "theme"
("name", "description", "month_year")  
VALUES 
('Mentors', '	
An exploration of intergenerational relationships between people who support one another in work and life. Featuring the voices of those in farming, politics, education, and more. Special sections: Pets, Camp & Kids', '01/01/2023'), 
('Books', '	
Excerpts and conversations with new and established Minnesota authors. Special sections: Money & Business, Education & Learning', '02/01/2023'), 
('Defusing Toxic Masculinity', '	
How to improve public safety — from dismantling rape culture to fighting sex trafficking and intimate partner violence. Based on a series of Changemakers Alliance conversations and community-submitted stories. Special sections: Elder, Camp & Kids', '03/01/2023'), 
('Under 30', '	
People under 30 share their joys and concerns, and lead this special issue. Special sections: Healing, Home & Garden', '04/01/2023'),
('Values & Vision', '	
Urban and rural people in conversation about their passions, especially as creative artists. Special sections: Travel & Adventure, Camp & Kids, Readers Recommend', '05/01/2023'),
('Reproductive Justice', '	
One year after the fall of Roe, how is Minnesota performing as a “safe haven” for abortion care? What steps remain to ensure access to reproductive care for all? Special sections: Elder, Home & Garden', '06/01/2023'),
('Main Street', '	
How BIPOC entrepreneurs are revitalizing Minnesota communities, based on a series of CALL conversations and submitted stories. Special sections: Buy Local, Pets', '07/01/2023'),
('River Stories', '	
This breezy issue will share stories from along the banks of the Mighty Mississippi.
Special sections: Healing, Education & Learning', '08/01/2023'),
('Work', '	
The ways our work lives are shifting — including the role of labor unions, anti-racist movements in the workplace, and changing family leave practices.
Special sections: Directory, Elder, Travel & Adventure', '09/01/2023'),
('The Land Remembers', '	
How are sites of atrocities in Minnesota becoming sites of reconciliation and healing? Stories about those who are working to ensure that history is not erased. Special sections: Money & Business, Nonprofit', '10/01/2023'), 
('Child Welfare', '	
From American Indian boarding schools to the modern day foster care system, “child welfare” has a tangled history. We trace roots and learn what is being done in Minnesota to better support kids.
Special sections: Holiday, Pets', '11/01/2023'),
('Changemakers', '	
Our annual issue focused on 10 people and organizations who made change in 2023 around equity, justice, and self-determination for women and children.
Special sections: Healing, Holiday', '12/01/2023');

DECLARE @count INT 
DECLARE @monthdate DATE 
SET @count = 0
SET @monthdate = '01/01/2024'
WHILE (@count <= 12)
BEGIN
INSERT INTO "theme"
("date")
VALUES 
(DATEADD(month, @count, @monthdate))
END; 

/*Stories */
INSERT INTO "story"
("title","notes", "date_added", "copies_required", "photo_required", "fact_check_required", "payment_required")  
VALUES 
('Why Books saved my life', 'Personal story, sent in by reader', '02/02/2023', false, true, false, true),
('Publishing and how it is changing', 'How the advent of online publishing has changed company mindsets', '01/30/2023', true, false, true, false),
('Book arts', 'Minneapolis Center for Book Arts and publishing story', '01/01/2023', false, false, true, true), 
('The future of Healthcare', 'How healthcare is changing', '01/20/2023', true, true, false, false), 
('Why 30 is the new 20', 'A conversation about what age means and what we expect from turning 30', '01/15/2023', true, true, true, true), 
('Why does the Mississippi look different?', 'Climate change and how it effects us right here in MN', '09/30/2022', false, false, false, false);

INSERT INTO "theme_story"
("story_id", "theme_id")
VALUES 
(1,2), 
(3,2), 
(2,1); 

/*Contacts*/ 

INSERT INTO "contact" 
("name", "email", "pronouns", "phone", "bio", "linkedIn") 
VALUES 
('Mikki Morrissette', 'editor@womenspress.com', 'she/her/hers',999-999-999, 'Owner and editor of Minnesota Womens Press, the oldest continuously produced feminist monthly publication in the U.S. We have shared the voice and vision of Minnesota women since 1985. The mission: Amplify and inspire, with personal stories and action steps, the leadership of powerful, everyday women. The vision: We are all parts of a greater whole. Our stronger future will be built from the collective energy of women who shift narratives to effect change.','https://www.linkedin.com/in/mikkimorrissette/'  ),
('Sarah Whiting', 'sarah@womenspress.com','she/her/hers', 999-999-999,'Experienced Photographer with a demonstrated history of working in journalism and the education management industry. Skilled in Environmental Portrait Photography, Photography, Photoshop, Lightroom, InDesign, Commercial Photography, and Darkroom. Strong education professional with a MFA focused in Photography from Savannah College of Art and Design. ', 'https://www.linkedin.com/in/sarahwhiting/' ),
('Lydia Moran', 'Lydia@womenspress.com','she/her/hers', 999-999-999,'My interest lies in how journalism and personal storytelling can be powerful tools for social change. Available for freelance editing and writing assignments.', 'https://www.linkedin.com/in/lydia-moran/' );

INSERT INTO "story_contact" 
("story_id", "contact_id", "story_association", "invoice_amount") 
VALUES 
(1, 1, 'editor', 20.00), 
(1,2, 'photographer', 100.00), 
(2,3, 'author', 50.00);

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
(2,1), 
(1, 3); 

ALTER TABLE story
ADD COLUMN copies_destination VARCHAR
; 

ALTER TABLE "story"
ADD socials_required boolean, 
ADD socials_completed boolean, 
ADD underwriter_required boolean, 
ADD underwriter_completed boolean,
ADD photo_submitted boolean, 
ADD photo_comments VARCHAR; 

ALTER TABLE "story"
DROP COLUMN "photo_required"
DROP COLUMN "graphic_image_completed",
DROP COLUMN "graphic_image_required";

ALTER TABLE "story"
DROP COLUMN "fact_check_required", 
ADD "fact_check_required" BOOLEAN DEFAULT TRUE; 