import React from 'react';
import ThemeCalendar from '../../components/ThemeCalendar/ThemeCalendar';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export default function ThemesPage(){

    const ThemeArrayDB = useSelector(store => store.allThemes);

    let contact = {
        id: 1,
        name: 'Folasade Adesanya',
        pronouns: 'she/her',
        expertise: 'da bomb',
        photo: 'https://xsgames.co/randomusers/assets/images/favicon.png',
        email: 'email@email.com',
        phone: '(999) 999-9999',
        billing_address: '1234 Main St, Minneapolis, MN 55403',
        mailing_address: '1234 Main St, Minneapolis, MN 55403',
        location: 'Minneapolis, MN',
        bio: `Folasade Adesanya is a queer agender writer and scholar living in Minneapolis. Their writing consists of historical fiction, creative nonfiction, essays, and poetry (you can find writing samples here). Folasade is additionally the founder of The Black Syllabus, an organization that promotes literacy and alternative education in the Black community, and is working toward a PhD in Media Studies.`,
        note: '',
        linkedin: '',
        twitter: '',
        instagram: '',
        facebook: '',
        date_added: '',
        stories: [
            {
            id: 1,
            title: 'From Soil to Stars: A Conversation with Erin Sharkey',
            subtitle: 'I wanted to stretch the boundaries of what nature writing was.',
            article_text: '',
            article_link: 'https://www.womenspress.com/from-soil-to-stars-a-conversation-with-erin-sharkey/',
            notes: `Every time I get the chance to chat with writer and cultural worker Erin Sharkey, I find more ways that our interests and perspectives intersect, including those related to land stewardship, ancestry and collective memory, and the value of archives.
                Sharkey edited the forthcoming collection of essays A Darker Wilderness: Black Nature Writing from Soil to Stars, which offers intimate and varied reflections on nature by contemporary Black writers and poets.
                Every piece in the collection uses an object from the writers’ personal archives or the larger historical archive — a grandfather’s fishing box, a property deed, a newspaper photograph — to reflect on how nature has influenced the lives of Black folks throughout time.
                Our conversation was edited for length and clarity.`,
            photo: '',
            type: '',
            copies_required: 0,
            copies_sent: false,
            photo_required: true,
            photo_uploaded: false,
            fact_check_required: true,
            fact_check_completed: true,
            graphic_image_required: false,
            graphic_image_completed: false,
            payment_completed: true,
            external_link: '',
            word_count: 0,
            date_added: '',
            rough_draft_deadline: '',
            final_draft_deadline: new Date('1/1/2023').toISOString(),
            publication_date: new Date('1/25/2023').toISOString(),
            archived: false,
            },
            {
            id: 2,
            title: 'From Soil to Stars: A Conversation with Erin Sharkey',
            subtitle: 'I wanted to stretch the boundaries of what nature writing was.',
            article_text: '',
            article_link: 'https://www.womenspress.com/from-soil-to-stars-a-conversation-with-erin-sharkey/',
            notes: `Every time I get the chance to chat with writer and cultural worker Erin Sharkey, I find more ways that our interests and perspectives intersect, including those related to land stewardship, ancestry and collective memory, and the value of archives.
                Sharkey edited the forthcoming collection of essays A Darker Wilderness: Black Nature Writing from Soil to Stars, which offers intimate and varied reflections on nature by contemporary Black writers and poets.
                Every piece in the collection uses an object from the writers’ personal archives or the larger historical archive — a grandfather’s fishing box, a property deed, a newspaper photograph — to reflect on how nature has influenced the lives of Black folks throughout time.
                Our conversation was edited for length and clarity.`,
            photo: '',
            type: '',
            copies_required: 10,
            copies_sent: false,
            photo_required: true,
            photo_uploaded: false,
            fact_check_required: true,
            fact_check_completed: true,
            graphic_image_required: false,
            graphic_image_completed: false,
            payment_completed: true,
            external_link: '',
            word_count: 0,
            date_added: '',
            rough_draft_deadline: '',
            final_draft_deadline: new Date('1/1/2023').toISOString(),
            publication_date: new Date('1/25/2023').toISOString(),
            archived: false,
            }
        ],
        themes: [
            {
        
            }
        ],
        tags: [
            {
        
            }
        ],
        roles: [{ id: 1, name: 'author' }, { id: 2, name: 'photographer' }]
        }

    let story = {
        id: '1',
        title: 'The best story ever',
        subtitle: 'Subtitle to the best story ever',
        article_text: 'article text to the best story ever',
        article_link: 'http://www.google.com',
        notes: 'Notes notes notes notes',
        photo: '',
        type: '',
        copies_required: 0,
        copies_sent: false,
        photo_required: true,
        photo_uploaded: false,
        fact_check_required: true,
        fact_check_completed: true,
        graphic_image_required: false,
        graphic_image_completed: false,
        payment_required: false,
        payment_completed: true,
        external_link: '',
        word_count: 0,
        date_added: '',
        rough_draft_deadline: '',
        final_draft_deadline: '',
        publication_date: '',
        contacts: [{...contact, ...{
            id: '',
            title: '',
            subtitle: '',
            article_text: '',
            article_link: '',
            notes: '',
            photo: '',
            type: '',
            copies_required: 0,
            copies_sent: false,
            photo_required: true,
            photo_uploaded: false,
            fact_check_required: true,
            fact_check_completed: true,
            graphic_image_required: false,
            graphic_image_completed: false,
            payment_required: false,
            payment_completed: true,
            external_link: '',
            word_count: 0,
            date_added: '',
            rough_draft_deadline: '',
            final_draft_deadline: '',
            publication_date: '',
        }, story_association: 1, invoice_amount: 2000, invoice_paid: false},{}],
        theme: [{},{}],
        tags: [{},{}]      
    }


    let themeArray = ThemeArrayDB || [
        {
            // Example
            id: 0,
            name: "cucumbers1", 
            description: "theme description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            month: "January",
            year: 2023,
            stories: [
                story, story
            ],
            contacts: [
                contact, contact
            ]
        },
    ]


    return(
        <div>
            <Typography variant="h3" component="h1">
                Themes
            </Typography>
            <div>
                <ThemeCalendar themeArray={themeArray}/>
            </div>
        </div>
    )
}