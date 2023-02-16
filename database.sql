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
    "photo" VARCHAR, 
    "type" VARCHAR,
    "copies_required" BOOLEAN DEFAULT FALSE,
    "number_of_copies" INT, 
    "copies_sent" BOOLEAN DEFAULT FALSE,
    "photo_uploaded" BOOLEAN DEFAULT FALSE,
    "fact_check_required" BOOLEAN DEFAULT TRUE, 
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
    "publication_date" DATE, 
    "socials_required" boolean DEFAULT FALSE, 
    "socials_completed" boolean DEFAULT FALSE, 
    "underwriter_required" boolean DEFAULT FALSE, 
    "underwriter_completed" boolean DEFAULT FALSE,
    "photo_submitted" boolean,  
    "photo_comments" VARCHAR, 
    "copies_destination" VARCHAR
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
Special sections: Healing, Holiday', '12/01/2023'), 
('', '', '01/01/2014'), ('', '', '02/01/2014'), ('', '', '03/01/2014'),
('', '', '04/01/2014'), ('', '', '05/01/2014'), ('', '', '06/01/2014'),
('', '', '07/01/2014'), ('', '', '08/01/2014'), ('', '', '09/01/2014'),
('', '', '10/01/2014'), ('', '', '11/01/2014'), ('', '', '12/01/2014'),
('', '', '01/01/2015'), ('', '', '02/01/2015'), ('', '', '03/01/2015'),
('', '', '04/01/2015'), ('', '', '05/01/2015'), ('', '', '06/01/2015'),
('', '', '07/01/2015'), ('', '', '08/01/2015'), ('', '', '09/01/2015'),
('', '', '10/01/2015'), ('', '', '11/01/2015'), ('', '', '12/01/2015'),
('', '', '01/01/2016'), ('', '', '02/01/2016'), ('', '', '03/01/2016'),
('', '', '04/01/2016'), ('', '', '05/01/2016'), ('', '', '06/01/2016'),
('', '', '07/01/2016'), ('', '', '08/01/2016'), ('', '', '09/01/2016'),
('', '', '10/01/2016'), ('', '', '11/01/2016'), ('', '', '12/01/2016'),
('', '', '01/01/2017'), ('', '', '02/01/2017'), ('', '', '03/01/2017'),
('', '', '04/01/2017'), ('', '', '05/01/2017'), ('', '', '06/01/2017'),
('', '', '07/01/2017'), ('', '', '08/01/2017'), ('', '', '09/01/2017'),
('', '', '10/01/2017'), ('', '', '11/01/2017'), ('', '', '12/01/2017'),
('', '', '01/01/2018'), ('', '', '02/01/2018'), ('', '', '03/01/2018'),
('', '', '04/01/2018'), ('', '', '05/01/2018'), ('', '', '06/01/2018'),
('', '', '07/01/2018'), ('', '', '08/01/2018'), ('', '', '09/01/2018'),
('', '', '10/01/2018'), ('', '', '11/01/2018'), ('', '', '12/01/2018'),
('', '', '01/01/2019'), ('', '', '02/01/2019'), ('', '', '03/01/2019'),
('', '', '04/01/2019'), ('', '', '05/01/2019'), ('', '', '06/01/2019'),
('', '', '07/01/2019'), ('', '', '08/01/2019'), ('', '', '09/01/2019'),
('', '', '10/01/2019'), ('', '', '11/01/2019'), ('', '', '12/01/2019'),
('', '', '01/01/2020'), ('', '', '02/01/2020'), ('', '', '03/01/2020'),
('', '', '04/01/2020'), ('', '', '05/01/2020'), ('', '', '06/01/2020'),
('', '', '07/01/2020'), ('', '', '08/01/2020'), ('', '', '09/01/2020'),
('', '', '10/01/2020'), ('', '', '11/01/2020'), ('', '', '12/01/2020'),
('', '', '01/01/2021'), ('', '', '02/01/2021'), ('', '', '03/01/2021'),
('', '', '04/01/2021'), ('', '', '05/01/2021'), ('', '', '06/01/2021'),
('', '', '07/01/2021'), ('', '', '08/01/2021'), ('', '', '09/01/2021'),
('', '', '10/01/2021'), ('', '', '11/01/2021'), ('', '', '12/01/2021'),
('', '', '01/01/2022'), ('', '', '02/01/2022'), ('', '', '03/01/2022'),
('', '', '04/01/2022'), ('', '', '05/01/2022'), ('', '', '06/01/2022'),
('', '', '07/01/2022'), ('', '', '08/01/2022'), ('', '', '09/01/2022'),
('', '', '10/01/2022'), ('', '', '11/01/2022'), ('', '', '12/01/2022'),
('', '', '01/01/2024'), ('', '', '02/01/2024'), ('', '', '03/01/2024'),
('', '', '04/01/2024'), ('', '', '05/01/2024'), ('', '', '06/01/2024'),
('', '', '07/01/2024'), ('', '', '08/01/2024'), ('', '', '09/01/2024'),
('', '', '10/01/2024'), ('', '', '11/01/2024'), ('', '', '12/01/2024'),
('', '', '01/01/2025'), ('', '', '02/01/2025'), ('', '', '03/01/2025'),
('', '', '04/01/2025'), ('', '', '05/01/2025'), ('', '', '06/01/2025'),
('', '', '07/01/2025'), ('', '', '08/01/2025'), ('', '', '09/01/2025'),
('', '', '10/01/2025'), ('', '', '11/01/2025'), ('', '', '12/01/2025'),
('', '', '01/01/2026'), ('', '', '02/01/2026'), ('', '', '03/01/2026'),
('', '', '04/01/2026'), ('', '', '05/01/2026'), ('', '', '06/01/2026'),
('', '', '07/01/2026'), ('', '', '08/01/2026'), ('', '', '09/01/2026'),
('', '', '10/01/2026'), ('', '', '11/01/2026'), ('', '', '12/01/2026'),
('', '', '01/01/2027'), ('', '', '02/01/2027'), ('', '', '03/01/2027'),
('', '', '04/01/2027'), ('', '', '05/01/2027'), ('', '', '06/01/2027'),
('', '', '07/01/2027'), ('', '', '08/01/2027'), ('', '', '09/01/2027'),
('', '', '10/01/2027'), ('', '', '11/01/2027'), ('', '', '12/01/2027'),
('', '', '01/01/2028'), ('', '', '02/01/2028'), ('', '', '03/01/2028'),
('', '', '04/01/2028'), ('', '', '05/01/2028'), ('', '', '06/01/2028'),
('', '', '07/01/2028'), ('', '', '08/01/2028'), ('', '', '09/01/2028'),
('', '', '10/01/2028'), ('', '', '11/01/2028'), ('', '', '12/01/2028'),
('', '', '01/01/2029'), ('', '', '02/01/2029'), ('', '', '03/01/2029'),
('', '', '04/01/2029'), ('', '', '05/01/2029'), ('', '', '06/01/2029'),
('', '', '07/01/2029'), ('', '', '08/01/2029'), ('', '', '09/01/2029'),
('', '', '10/01/2029'), ('', '', '11/01/2029'), ('', '', '12/01/2029'),
('', '', '01/01/2030'), ('', '', '02/01/2030'), ('', '', '03/01/2030'),
('', '', '04/01/2030'), ('', '', '05/01/2030'), ('', '', '06/01/2030'),
('', '', '07/01/2030'), ('', '', '08/01/2030'), ('', '', '09/01/2030'),
('', '', '10/01/2030'), ('', '', '11/01/2030'), ('', '', '12/01/2030'),
('', '', '01/01/2031'), ('', '', '02/01/2031'), ('', '', '03/01/2031'),
('', '', '04/01/2031'), ('', '', '05/01/2031'), ('', '', '06/01/2031'),
('', '', '07/01/2031'), ('', '', '08/01/2031'), ('', '', '09/01/2031'),
('', '', '10/01/2031'), ('', '', '11/01/2031'), ('', '', '12/01/2031'),
('', '', '01/01/2032'), ('', '', '02/01/2032'), ('', '', '03/01/2032'),
('', '', '04/01/2032'), ('', '', '05/01/2032'), ('', '', '06/01/2032'),
('', '', '07/01/2032'), ('', '', '08/01/2032'), ('', '', '09/01/2032'),
('', '', '10/01/2032'), ('', '', '11/01/2032'), ('', '', '12/01/2032'),
('', '', '01/01/2033'), ('', '', '02/01/2033'), ('', '', '03/01/2033'),
('', '', '04/01/2033'), ('', '', '05/01/2033'), ('', '', '06/01/2033'),
('', '', '07/01/2033'), ('', '', '08/01/2033'), ('', '', '09/01/2033'),
('', '', '10/01/2033'), ('', '', '11/01/2033'), ('', '', '12/01/2033'),
('', '', '01/01/2034'), ('', '', '02/01/2034'), ('', '', '03/01/2034'),
('', '', '04/01/2034'), ('', '', '05/01/2034'), ('', '', '06/01/2034'),
('', '', '07/01/2034'), ('', '', '08/01/2034'), ('', '', '09/01/2034'),
('', '', '10/01/2034'), ('', '', '11/01/2034'), ('', '', '12/01/2034'),
('', '', '01/01/2035'), ('', '', '02/01/2035'), ('', '', '03/01/2035'),
('', '', '04/01/2035'), ('', '', '05/01/2035'), ('', '', '06/01/2035'),
('', '', '07/01/2035'), ('', '', '08/01/2035'), ('', '', '09/01/2035'),
('', '', '10/01/2035'), ('', '', '11/01/2035'), ('', '', '12/01/2035'),
('', '', '01/01/2036'), ('', '', '02/01/2036'), ('', '', '03/01/2036'),
('', '', '04/01/2036'), ('', '', '05/01/2036'), ('', '', '06/01/2036'),
('', '', '07/01/2036'), ('', '', '08/01/2036'), ('', '', '09/01/2036'),
('', '', '10/01/2036'), ('', '', '11/01/2036'), ('', '', '12/01/2036'),
('', '', '01/01/2037'), ('', '', '02/01/2037'), ('', '', '03/01/2037'),
('', '', '04/01/2037'), ('', '', '05/01/2037'), ('', '', '06/01/2037'),
('', '', '07/01/2037'), ('', '', '08/01/2037'), ('', '', '09/01/2037'),
('', '', '10/01/2037'), ('', '', '11/01/2037'), ('', '', '12/01/2037'),
('', '', '01/01/2038'), ('', '', '02/01/2038'), ('', '', '03/01/2038'),
('', '', '04/01/2038'), ('', '', '05/01/2038'), ('', '', '06/01/2038'),
('', '', '07/01/2038'), ('', '', '08/01/2038'), ('', '', '09/01/2038'),
('', '', '10/01/2038'), ('', '', '11/01/2038'), ('', '', '12/01/2038'),
('', '', '01/01/2039'), ('', '', '02/01/2039'), ('', '', '03/01/2039'),
('', '', '04/01/2039'), ('', '', '05/01/2039'), ('', '', '06/01/2039'),
('', '', '07/01/2039'), ('', '', '08/01/2039'), ('', '', '09/01/2039'),
('', '', '10/01/2039'), ('', '', '11/01/2039'), ('', '', '12/01/2039');


/*Stories */

INSERT INTO "public"."story"("title","subtitle","article_text","article_link","notes","photo","type","copies_required","number_of_copies","copies_destination","copies_sent","fact_check_required","photo_uploaded","fact_check_completed","payment_required","payment_completed","external_link","word_count","date_added","rough_draft_deadline","final_draft_deadline","publication_date","socials_required","socials_completed","underwriter_required","photo_submitted","photo_comments","underwriter_completed","graphic_image_completed","graphic_image_required")
VALUES
('Working from Home',E'',E'',E'',E'',E'',E'',TRUE,5,E'5454 Mullburry Court ',FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,E'',150,E'2023-02-11',E'2023-08-05',E'2023-08-19',E'2023-08-27',TRUE,FALSE,TRUE,FALSE,E'',FALSE,FALSE,NULL),
('Digital Work and Mental Health ',E'',E'',E'',E'',E'',E'',FALSE,NULL,NULL,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,E'',0,E'2023-02-11',E'2023-02-11',E'2023-02-11',E'2023-08-27',FALSE,FALSE,FALSE,TRUE,E'',FALSE,FALSE,NULL),
('Maternity Leave ',E'How it is changing, and what we can be excited about',E'',E'',E'',E'',E'',FALSE,NULL,NULL,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,E'',0,E'2023-02-11',E'2023-02-11',E'2023-02-11',E'2023-07-30',FALSE,FALSE,FALSE,TRUE,E'',FALSE,FALSE,NULL),
('Queer History comes to Life',E'',E'',E'',E'',E'',E'',FALSE,NULL,NULL,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,E'',0,E'2023-02-11',E'2023-02-11',E'2023-02-11',E'2023-05-31',FALSE,FALSE,FALSE,TRUE,E'',FALSE,FALSE,NULL),
('Let Black Women Say Ase ',E'',E'',E'',E'',E'',E'',FALSE,NULL,NULL,FALSE,TRUE,TRUE,TRUE,FALSE,FALSE,E'',0,E'2023-02-11',E'2023-02-11',E'2023-02-11',E'2023-01-01',FALSE,FALSE,FALSE,TRUE,E'',FALSE,FALSE,NULL),
('Discussion on the Homeless Youth Act ',E'',E'',E'',E'',E'',E'',FALSE,NULL,NULL,FALSE,TRUE,TRUE,TRUE,FALSE,FALSE,E'',0,E'2023-02-11',E'2023-02-11',E'2023-02-11',E'2023-01-01',FALSE,FALSE,FALSE,TRUE,E'',FALSE,FALSE,NULL),
('From Soil to Stars: A Conversation with Erin Sharkey ',E'',E'',E'',E'',E'',E'',FALSE,NULL,NULL,FALSE,TRUE,TRUE,TRUE,FALSE,FALSE,E'',0,E'2023-02-11',E'2023-02-11',E'2023-02-11',E'2023-02-01',FALSE,FALSE,FALSE,TRUE,E'',FALSE,FALSE,NULL),
('Poem: The Body ',E'',E'',E'',E'',E'',E'',FALSE,NULL,NULL,FALSE,TRUE,TRUE,TRUE,FALSE,FALSE,E'',0,E'2023-02-11',E'2023-02-11',E'2023-02-11',E'2023-02-01',FALSE,FALSE,FALSE,TRUE,E'',FALSE,FALSE,NULL),
('Out of the Sierra',E'',E'',E'',E'',E'',E'',FALSE,NULL,NULL,FALSE,TRUE,TRUE,TRUE,FALSE,FALSE,E'',0,E'2023-02-11',E'2023-02-11',E'2023-02-11',E'2023-02-01',FALSE,FALSE,FALSE,TRUE,E'',FALSE,FALSE,NULL),
('Commentary: How do we move forward? ',E'',E'',E'',E'',E'',E'',FALSE,NULL,NULL,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,E'',0,E'2023-02-11',E'2023-02-11',E'2023-02-11',E'2023-02-11',FALSE,FALSE,FALSE,TRUE,E'',FALSE,FALSE,NULL),
('Abortion Legislation Update ',E'',E'',E'',E'',E'',E'',FALSE,NULL,NULL,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,E'',0,E'2023-02-11',E'2023-02-11',E'2023-02-11',E'2023-06-17',FALSE,FALSE,FALSE,TRUE,E'',FALSE,FALSE,NULL),
('Policy Makers discuss Criminal Justice Reform',E'',E'',E'',E'',E'',E'',FALSE,NULL,NULL,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,E'',0,E'2023-02-11',E'2023-02-11',E'2023-02-11',E'2023-06-25',FALSE,FALSE,FALSE,TRUE,E'',FALSE,FALSE,NULL),
('Welcoming Ukranian Families ',E'',E'',E'',E'',E'',E'',FALSE,NULL,NULL,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,E'',0,E'2023-02-11',E'2023-02-11',E'2023-02-11',E'2023-02-11',FALSE,FALSE,FALSE,TRUE,E'',FALSE,FALSE,NULL),
('Feedback with Love ',E'',E'',E'',E'',E'',E'',FALSE,NULL,NULL,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,E'',0,E'2023-02-11',E'2023-02-11',E'2023-02-11',E'2023-02-11',FALSE,FALSE,FALSE,TRUE,E'',FALSE,FALSE,NULL),
('Foxtail Farms - where are they now',E'',E'',E'',E'',E'',E'',FALSE,NULL,NULL,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,E'',0,E'2023-02-11',E'2023-02-11',E'2023-02-11',E'2023-03-31',FALSE,FALSE,FALSE,TRUE,E'',FALSE,FALSE,NULL),
('What is healthy eating? ',E'',E'',E'',E'',E'',E'',FALSE,NULL,NULL,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,E'',0,E'2023-02-11',E'2023-02-11',E'2023-02-11',E'2023-02-11',FALSE,FALSE,FALSE,TRUE,E'',FALSE,FALSE,NULL),
('What does being 30 mean? ',E'',E'',E'',E'',E'',E'',FALSE,NULL,NULL,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,E'',0,E'2023-02-11',E'2023-02-11',E'2023-02-11',E'2023-02-11',FALSE,FALSE,FALSE,TRUE,E'',FALSE,FALSE,NULL),
('Healthy Horses Farm ',E'',E'',E'',E'therapy horses ',E'',E'',FALSE,NULL,NULL,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,E'',0,E'2023-02-11',E'2023-02-11',E'2023-02-11',E'2023-02-11',FALSE,FALSE,FALSE,TRUE,E'',FALSE,FALSE,NULL),
('How to Evolve Together? ',E'',E'',E'',E'',E'',E'',FALSE,NULL,NULL,FALSE,TRUE,TRUE,NULL,FALSE,FALSE,E'',0,E'2023-02-11',E'2023-02-11',E'2023-02-11',E'2023-04-09',FALSE,FALSE,FALSE,TRUE,E'',FALSE,FALSE,NULL),
('Honoring a Senator',E'',E'',E'',E'',E'',E'',FALSE,NULL,NULL,FALSE,TRUE,TRUE,TRUE,FALSE,FALSE,E'',0,E'2023-02-11',E'2023-02-11',E'2023-02-11',E'2023-01-01',FALSE,FALSE,FALSE,TRUE,E'',FALSE,FALSE,NULL),
('Life on the Water ',E'',E'',E'',E'',E'',E'',FALSE,NULL,NULL,FALSE,TRUE,TRUE,TRUE,FALSE,FALSE,E'',0,E'2023-02-11',E'2023-02-11',E'2023-02-11',E'2023-06-30',FALSE,FALSE,FALSE,TRUE,E'',FALSE,FALSE,NULL);


INSERT INTO "public"."theme_story"("story_id","theme_id")
VALUES
(54,9),
(58,1),
(59,1),
(60,2),
(62,1),
(57,5),
(68,1),
(72,3),
(65,6),
(64,6),
(55,9),
(56,9),
(70,4),
(74,8);

/*Contacts*/ 

INSERT INTO "contact" 
("name", "email", "pronouns", "phone", "bio", "linkedIn") 
VALUES 
('Mikki Morrissette', 'editor@womenspress.com', 'she/her/hers',9999999999, 'Owner and editor of Minnesota Womens Press, the oldest continuously produced feminist monthly publication in the U.S. We have shared the voice and vision of Minnesota women since 1985. The mission: Amplify and inspire, with personal stories and action steps, the leadership of powerful, everyday women. The vision: We are all parts of a greater whole. Our stronger future will be built from the collective energy of women who shift narratives to effect change.','https://www.linkedin.com/in/mikkimorrissette/'  ),
('Sarah Whiting', 'sarah@womenspress.com','she/her/hers', 9999999999,'Experienced Photographer with a demonstrated history of working in journalism and the education management industry. Skilled in Environmental Portrait Photography, Photography, Photoshop, Lightroom, InDesign, Commercial Photography, and Darkroom. Strong education professional with a MFA focused in Photography from Savannah College of Art and Design. ', 'https://www.linkedin.com/in/sarahwhiting/' ),
('Lydia Moran', 'Lydia@womenspress.com','she/her/hers', 9999999999,'My interest lies in how journalism and personal storytelling can be powerful tools for social change. Available for freelance editing and writing assignments.', 'https://www.linkedin.com/in/lydia-moran/' );



INSERT INTO "public"."contact"("name","pronouns","expertise","photo","email","phone","billing_address","mailing_address","bio","note","linkedIn","twitter","instagram","facebook","date_added")
VALUES
('Hannah Hines',E'',E'',NULL,E'',E'',E'',E'',E'',E'',NULL,E'',E'',E'',E'2023-02-11'),
('Catherine Jones',E'she/her',E'',NULL,E'c.jones@email.com',E'478-8888',E'',E'',E'“Catherine is a fact checker at Checking Facts Inc. with 22 years of experience helping publications with editing needs. Specializing in first person narrative, Catherine uses that experience to help her clients print the best stories.. ',E'Started using 2012',NULL,E'',E'',E'',E'2023-02-11'),
('Paula Carter',E'she/her',E'Women\'s Health ',NULL,E'carter.p.j@email.com',E'000-999-8765',E'',E'',E'Paula has 10 years of experience working as a medical practitioner in both an emergency room and general practice. She now works as an advocate of women\'s health, focusing on promoting breast cancer screenings. ',E'',NULL,E'',E'',E'',E'2023-02-11'),
('Shelia Crussy ',E'she/her',E'Sports and Athletics ',NULL,E'crussy.s.j@email.com',E'000-999-9999',E'',E'',E'As an ex-pro athlete, Shelia is a great resource for reporting sports based pieces. ',E'',NULL,E'',E'',E'',E'2023-02-11'),
('Sally Passet',E'she/her',E'',NULL,E'sallypasset@email.com',E'',E'',E'',E'',E'',NULL,E'',E'',E'',E'2023-02-11'),
('Lillian Lawson ',E'she/her',E'',NULL,E'',E'',E'',E'',E'',E'',NULL,E'',E'',E'',E'2023-02-11'),
('Vi Garrison ',E'she/her ',E'',NULL,E'',E'',E'',E'',E'',E'',NULL,E'',E'',E'',E'2023-02-11'),
('Mikki Morrissette',E'she/her/hers',NULL,NULL,E'editor@womenspress.com',E'-999',NULL,NULL,E'Owner and editor of Minnesota Womens Press, the oldest continuously produced feminist monthly publication in the U.S. We have shared the voice and vision of Minnesota women since 1985. The mission: Amplify and inspire, with personal stories and action steps, the leadership of powerful, everyday women. The vision: We are all parts of a greater whole. Our stronger future will be built from the collective energy of women who shift narratives to effect change.',NULL,E'https://www.linkedin.com/in/mikkimorrissette/',NULL,NULL,NULL,E'2023-02-06'),
('Sarah Whiting',E'she/her/hers',E'',NULL,E'sarah@womenspress.com',E'999-999-9999',E'',E'',E'Experienced Photographer with a demonstrated history of working in journalism and the education management industry. Skilled in Environmental Portrait Photography, Photography, Photoshop, Lightroom, InDesign, Commercial Photography, and Darkroom. Strong education professional with a MFA focused in Photography from Savannah College of Art and Design. ',E'test',NULL,E'',E'',E'',E'2023-02-06'),
('Lydia Moran',E'she/her/hers',NULL,NULL,E'Lydia@womenspress.com',E'9999999999',NULL,NULL,E'My interest lies in how journalism and personal storytelling can be powerful tools for social change. Available for freelance editing and writing assignments.',NULL,E'https://www.linkedin.com/in/lydia-moran/',NULL,NULL,NULL,E'2023-02-11'),
('Valerie Harrison',E'they/them',E'Legal Representation ',NULL,E'v.harrison@email.com',E'',E'',E'',E'Varerie is a great legal mind, specializing in political discourse, freedom of speech, and HIPPA. ',E'',NULL,E'',E'',E'',E'2023-02-11'),
('Kay Hines ',E'they/them',E'',NULL,E'',E'',E'',E'',E'',E'',NULL,E'',E'',E'',E'2023-02-11');





INSERT INTO "public"."story_contact"("story_id","contact_id","story_association","invoice_paid","invoice_amount")
VALUES
(72,2,E'author',NULL,NULL),
(58,6,NULL,NULL,NULL),
(67,7,E'author',NULL,NULL),
(55,9,E'author',NULL,NULL),
(59,10,NULL,NULL,NULL),
(68,10,E'author',NULL,NULL),
(56,10,E'author',NULL,NULL),
(71,11,NULL,NULL,NULL),
(73,11,E'author',NULL,NULL),
(55,11,E'source',NULL,NULL),
(74,11,E'author',NULL,NULL),
(60,12,NULL,NULL,NULL),
(62,13,NULL,NULL,0),
(66,13,E'author',NULL,NULL),
(54,14,E'author',NULL,100);

/* Tags */ 

INSERT INTO "public"."tag"("name","description")
VALUES
(E'Education',E'All things learning and teaching in MN'),
(E'Healthcare',E'Everything from the system, to experiences with it.'),
(E'Homelessness',E'Possible future publication idea'),
(E'Art',E'All the contacts/ experts related to art'),
(E'Editing',E'All editing contacts'),
(E'Art',E'All the contacts/ experts related to art'),
(E'Editing',E'All editing contacts'),
(E'Healthy habits',E'Habits to test tag '),
(E'Writing ',E'For the writiers'),
(E'Breast Cancer',E'Awareness'),
(E'Law',E'Legal Background'),
(E'work',E''),
(E'LGBTQA+',E'');

INSERT INTO "public"."story_tag"("story_id","tag_id")
VALUES
(54,26),
(62,1),
(63,13),
(57,9),
(57,27),
(68,13),
(65,25);


INSERT INTO "public"."tag_contact"("tag_id","contact_id")
VALUES
(5,1),
(9,2),
(2,7),
(24,7),
(25,9);

/*Role*/ 
INSERT INTO "role"
("id", "name")
VALUES
(1,'Photographer'),
(2,'Illustrator'),
(3,'Editor'),
(4,'Expert'),
(5,'Fact Checker'),
(6,'Printers'),
(7,'Author'),
(8,'Underwriter'),
(9,'Source'),
(10,'Subject');

INSERT INTO "public"."contact_role"("contact_id","role_id")
VALUES
(1,3),
(2,1),
(2,3),
(6,5),
(7,9),
(8,7),
(10,1),
(12,3),
(13,6);
